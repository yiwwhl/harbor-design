import { Ref, isRef, isReactive, watch, toRaw } from "vue";
import {
  AnyObject,
  Schema,
  ProxyedSchema,
  AnyFunction,
  ObjectParserRoot,
} from "../types";
import { Preset, RuntimeCore } from ".";
import { IS, deepClone } from "../utils";
import Effect from "./Effect";

/**
 * 基本描述
 * 对于函数的命名，如果是动词相关，代表对过程的处理，如果是名词，代表一个处理器
 */
export default class Processor {
  runtimeCore!: RuntimeCore;
  processedSchemas: Ref<AnyObject[]>;
  processedModel: Ref<AnyObject>;
  getRuntimeMeta: AnyFunction;
  stableSchemas: ProxyedSchema[] = [];
  stableModel: AnyObject = {};
  schemaPreset: AnyObject = Preset.schemaPreset;
  componentPropsPreset = Preset.componentPropsPreset;
  stableUpdaterProcessProgress!: boolean[];
  stableUpdaterTimes = 0;
  schemaEffect = new Effect();
  defaultValueEffect = new Effect();
  defaultValueInprogressMap = new Map();
  baseDefaultValueFunctionsLength!: number;

  constructor(runtimeCore: RuntimeCore) {
    this.runtimeCore = runtimeCore;
    this.processedSchemas = runtimeCore.schemas;
    this.processedModel = runtimeCore.model;
    this.getRuntimeMeta = runtimeCore.getRuntimeMeta.bind(runtimeCore);

    watch(
      () => this.processedModel.value,
      () => {
        this.schemaEffect.triggerEffects();
      },
      {
        deep: true,
      }
    );
  }

  // 核心处理过程，接收一个初始的代理数据结构,由其衍生的有 parseSchema
  parse<T extends object = any>(data: T[], parentMeta?: AnyObject) {
    data.forEach((item, index) => {
      this.parseItem(item, index, parentMeta);
    });
  }

  // 初始化空数据结构，避免后续复杂的 if else
  initSchemas(schemas: AnyObject[]) {
    return schemas.map((item) => {
      const newItem: AnyObject = {};
      if (item.children) {
        newItem.children = this.initSchemas(item.children);
      }
      return newItem;
    });
  }

  countFunctionDefaultValues(input: AnyObject) {
    let count = 0;
    let visited = new Set();

    function traverse(current: any) {
      if (visited.has(current)) {
        return;
      }

      if (
        Array.isArray(current) ||
        (current !== null && typeof current === "object")
      ) {
        visited.add(current);

        for (let key in current) {
          if (current.hasOwnProperty(key)) {
            // 很坑，像 InputNumber 等组件存在有一些 native code 的 defaultValue，会产生冲突
            if (
              key === "defaultValue" &&
              typeof current[key] === "function" &&
              !current[key].toString().includes("[native code]")
            ) {
              count++;
            }
            traverse(current[key]);
          }
        }
      }
    }

    traverse(input);
    return count;
  }

  // 派生过程，用于外部应用
  parseSchemas(schemas: ProxyedSchema[], parentMeta?: AnyObject) {
    // 初始化空 schema
    if (IS.isArrayEmpty(this.processedSchemas.value)) {
      // 收集所有的 defaultValue 处理函数长度
      this.baseDefaultValueFunctionsLength = this.countFunctionDefaultValues(
        deepClone(schemas)
      );
      this.processedSchemas.value = this.initSchemas(schemas);
    }
    this.parse(schemas, parentMeta);
  }

  parseStable(stable: AnyObject) {
    const result: AnyObject = {};
    if (!IS.isUndefined(stable.stable)) {
      result[stable.key] = this.parseStable(stable.stable);
    } else {
      return stable;
    }
    return result;
  }

  // 对于稳定初始化更新的抽象
  stableUpdater(parseProcess: boolean[] = []) {
    if (parseProcess.every(Boolean)) {
      const processedSchemas = toRaw(this.processedSchemas.value) as Schema[];
      if (
        !IS.isProcessInprogress(processedSchemas) &&
        IS.isObjectEmpty(this.stableModel)
      ) {
        if (!this.stableUpdaterProcessProgress) {
          this.stableUpdaterProcessProgress = Array.from({
            length: processedSchemas.length,
          }).fill(false) as boolean[];
        }
        this.stableUpdaterProcessProgress[this.stableUpdaterTimes] = true;
        this.stableUpdaterTimes++;
        this.modelProcessor(processedSchemas);
      }
    }
  }

  // 核心单 schema 处理过程，接收一个对象键值对的数据结构
  parseItem(data: AnyObject, index: number, parentMeta?: AnyObject) {
    const that = this;
    const parseProcess = Array.from({
      length: Object.keys(data).filter((k) => k !== "children").length,
    }).fill(false) as boolean[];

    this.objectParser({ data, index, updater });
    function updater(meta: AnyObject) {
      // TODO：优化点，可以考虑通过一定的数据结构，最终形成更少的赋值操作，但目前的性能也能接受
      const schemaIndex = meta.index;
      const schemaKey = meta.key;
      const keyIndex = meta.keyIndex;
      if (!meta.stable) {
        return;
      }
      const parsedStable = that.parseStable(meta.stable);
      const parentIndex = parentMeta?.index;
      const parentKey = parentMeta?.key;
      let stable = parsedStable;
      if (!IS.isProcessInprogress(stable)) {
        // 认为已经结束了中间态，process 可以被看作完成
        parseProcess[keyIndex] = true;
      }
      // 如果 parentMeta 存在，一定是带 children 的情况，类型一定是 group 或者 list，只用设置其 children 即可
      if (parentMeta) {
        // schema 处理
        let exist =
          that.processedSchemas.value[parentIndex][parentKey][schemaIndex][
            schemaKey
          ];
        if (exist && IS.isObject(exist)) {
          if (schemaKey !== "component") {
            stable = Object.assign(exist, stable);
          }
        }
        that.processedSchemas.value[parentIndex][parentKey][schemaIndex][
          schemaKey
        ] = stable;
        that.stableUpdater(parseProcess);
      } else {
        // schema 处理
        let exist = that.processedSchemas.value[schemaIndex][schemaKey];
        if (exist && IS.isObject(exist)) {
          stable = Object.assign(exist, stable);
        }
        that.processedSchemas.value[schemaIndex][schemaKey] = stable;
        that.stableUpdater(parseProcess);
      }
    }
  }

  // 只做基本的对象 parser
  objectParser(root: ObjectParserRoot) {
    const data = root.data;
    const dataKeys = Object.keys(data);

    dataKeys.forEach((key, keyIndex) => {
      if (key === "children") {
        this.parseSchemas(data[key], {
          ...root,
          key,
          keyIndex,
        });
      } else {
        const updater = (stable: any) => {
          root.updater({
            ...root,
            key,
            keyIndex,
            stable,
          });
        };
        if (IS.isFunction(data[key])) {
          if (key !== "defaultValue") {
            this.schemaEffect.trackEffect(() => {
              if (key === "component") {
                const component = data[key](this.getRuntimeMeta());
                this.promiseFieldParser(component, updater, false);
              } else {
                this.fieldParser(data[key], updater);
              }
            });
          } else {
            this.defaultValueEffect.trackEffect(() => {
              const stopTrack = this.schemaEffect.trackEffect(() => {
                // 通过正则表达式匹配使用了 model 的 defaultValue 函数
                if (/\{\s*model\s*\}/.test(data[key].toString())) {
                  this.fieldParser(data[key], (res) => {
                    // 放开 undefined
                    if (!res) {
                      return updater(res);
                    }
                    // 可考虑后续重构此 Set
                    this.defaultValueInprogressMap.set(data[key], res);
                    if (
                      !IS.isProcessInprogress(res) &&
                      this.defaultValueInprogressMap.size ===
                        this.baseDefaultValueFunctionsLength &&
                      Array.from(this.defaultValueInprogressMap.values()).every(
                        (r) => !r.includes("undefined")
                      )
                    ) {
                      updater(res);
                      this.defaultValueEffect.clearEffects();
                      stopTrack();
                    } else {
                      updater(res);
                    }
                  });
                } else {
                  this.fieldParser(data[key], (res) => {
                    this.defaultValueInprogressMap.set(data[key], res);
                    if (
                      !IS.isProcessInprogress(res) &&
                      this.defaultValueInprogressMap.size ===
                        this.baseDefaultValueFunctionsLength &&
                      Array.from(this.defaultValueInprogressMap.values()).every(
                        (r) => !r.includes("undefined")
                      )
                    ) {
                      updater(res);
                      this.defaultValueEffect.clearEffects();
                      stopTrack();
                    } else {
                      updater(res);
                    }
                  });
                }
              });
            });
          }
        } else {
          if (key === "component") {
            const component = data[key];
            this.promiseFieldParser(component, updater, false);
          } else {
            this.fieldParser(data[key], updater);
          }
        }
      }
    });
  }

  promiseFieldParser(
    rootField: any,
    updater: AnyFunction,
    deepProcess: boolean
  ) {
    if (IS.isPromise(rootField)) {
      rootField.then((stableComputation) => {
        if (deepProcess && IS.isObject(stableComputation)) {
          this.objectParser({
            data: stableComputation,
            updater,
          });
        } else {
          updater(stableComputation);
        }
      });
    } else {
      if (deepProcess && IS.isObject(rootField)) {
        this.objectParser({
          data: rootField,
          updater,
        });
      } else {
        updater(rootField);
      }
    }
  }

  // 对任意对象中单个字段的 parse: 做基本处理
  fieldParser(rootField: any, updater: AnyFunction, deepProcess = true) {
    if (IS.isFunction(rootField)) {
      // 过滤需要保留原始状态的函数
      if (rootField.name.startsWith(`__proform_raw_`)) {
        updater(rootField);
      } else {
        const computation = rootField(this.getRuntimeMeta());
        this.promiseFieldParser(computation, updater, deepProcess);
      }
    } else {
      // 稳定态
      if (isRef(rootField)) {
        watch(
          () => rootField.value,
          () => {
            if (!IS.isUndefined(rootField.value)) {
              if (deepProcess && IS.isObject(rootField.value)) {
                this.objectParser({
                  data: rootField.value,
                  updater,
                });
              } else {
                updater(rootField.value);
              }
            }
          },
          {
            immediate: true,
            deep: true,
          }
        );
      } else if (isReactive(rootField)) {
        watch(
          () => rootField,
          () => {
            if (!IS.isUndefined(rootField)) {
              if (deepProcess && IS.isObject(rootField)) {
                this.objectParser({
                  data: rootField,
                  updater,
                });
              } else {
                updater(rootField);
              }
            }
          },
          {
            immediate: true,
            deep: true,
          }
        );
      } else {
        // 稳定值处理
        if (deepProcess && IS.isObject(rootField)) {
          this.objectParser({
            data: rootField,
            updater,
          });
        } else {
          updater(rootField);
        }
      }
    }
  }

  modelProcessor(schemas: Schema[]) {
    schemas.map((schema) =>
      this.createModel(schema, this.processedModel.value)
    );

    if (IS.isObjectEmpty(this.stableModel)) {
      if (
        this.stableUpdaterProcessProgress.every(Boolean) &&
        this.defaultValueEffect.effects.size === 0
      ) {
        this.stableModel = deepClone(this.processedModel.value);
        this.runtimeCore.hydrateEffect.triggerEffects();
        this.runtimeCore.hydrateEffect.clearEffects();
      }
    }
  }

  createModel(schema: AnyObject, baseModel: AnyObject) {
    if (IS.isListSchema(schema)) {
      if (!baseModel[schema.field]) {
        baseModel[schema.field] = [{}];
      }
      schema.children.forEach((childSchema) => {
        this.createModel(childSchema, baseModel[schema.field][0]);
      });
    }
    if (IS.isGroupSchema(schema)) {
      schema.children.forEach((childSchema) => {
        this.createModel(childSchema, baseModel);
      });
    }
    if (IS.isItemSchema(schema)) {
      baseModel[schema.field] = schema.defaultValue;
    }
  }
}
