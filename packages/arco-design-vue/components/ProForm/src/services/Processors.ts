import { Ref, watchEffect, isRef, isReactive, watch, toRaw } from "vue";
import {
  AnyObject,
  Schema,
  ItemSchema,
  ProxyedSchema,
  AnyFunction,
} from "../types";
import { IS, deepClone } from "../utils";
import { Effect } from "../services";

export default class Processors {
  rawSchemas: ProxyedSchema[] = [];
  rawModel: AnyObject = {};
  schemaPreset: Record<keyof ItemSchema, any> = {
    type: {
      defaultValueWhenAsync: "item",
    },
    component: {
      defaultValueWhenAsync: undefined,
    },
    componentProps: {
      defaultValueWhenAsync: undefined,
    },
    defaultValue: {
      defaultValueWhenAsync: undefined,
    },
    label: {
      defaultValueWhenAsync: "",
    },
    field: {
      defaultValueWhenAsync: "__yiwwhl_async_field_fallback",
    },
    rules: {
      defaultValueWhenAsync: [],
    },
  };
  componentPropsPreset: AnyObject = {
    options: {
      defaultValueWhenAsync: [],
    },
  };
  uniqueEffectMap: any = {};
  schemaEffect = new Effect();
  modelEffect = new Effect();
  stopWatchEffect = new Effect();

  constructor(
    public processedSchemas: Ref<Schema[]>,
    public processedModel: Ref<AnyObject>
  ) {
    watch(
      () => this.processedModel.value,
      () => {
        this.schemaEffect.triggerEffects();
        this.modelEffect.triggerEffects();
      },
      {
        deep: true,
      }
    );
  }

  schemaAnalyzer(
    schemas: ProxyedSchema[],
    baseSchema = this.processedSchemas.value,
    baseRawSchema = this.rawSchemas,
    parentField?: string,
    schemaIndex?: number
  ) {
    for (let i = 0; i < schemas.length; i++) {
      let schema = schemas[i];
      this.schemaProcessor(
        schema,
        i,
        (processedSchema, forceUpdate, schemaKeyShouldUpdate) => {
          if (schemaKeyShouldUpdate) {
            // @ts-expect-error
            baseRawSchema[i][schemaKeyShouldUpdate] =
              processedSchema[schemaKeyShouldUpdate];
          } else {
            baseSchema[i] = processedSchema;
            this.modelProcessor(
              processedSchema,
              parentField && this.processedModel.value[parentField][0]
            );
            if (!baseRawSchema[i] || forceUpdate) {
              baseRawSchema[i] = deepClone(processedSchema);
            }

            this.schemaEffect.triggerEffects();
            this.modelEffect.triggerEffects();
          }
        },
        schemaIndex,
        parentField
      );
    }
  }

  schemaProcessor(
    schema: ProxyedSchema,
    index: number,
    setter: AnyFunction,
    schemaIndex?: number,
    parentField?: string
  ) {
    /**
     * 有 componentProps 的时候 defaultValue 会垮丝
     */
    const processed: AnyObject = {};
    const that = this;

    function updateSchema(forceUpdate = false) {
      if (processed.componentProps) {
        const processedProps = {};
        that.propsProcessor(
          processed.componentProps,
          that.componentPropsPreset,
          processedProps,
          (_forceUpdate) => {
            processed.componentProps = processedProps;
            setter({ ...processed }, _forceUpdate, "componentProps");
          },
          index,
          schemaIndex
        );
        return;
      }

      if (processed.children) {
        that.processedSchemas.value[index] = processed as Schema;
        that.rawSchemas[index] = processed as Schema;
        setter({ ...processed }, forceUpdate);

        that.schemaAnalyzer(
          processed.children,
          // @ts-expect-error 此处已经守卫为非 ItemSchema
          that.processedSchemas.value[index]?.children,
          // @ts-expect-error 此处已经守卫为非 ItemSchema
          that.rawSchemas[index]?.children,
          processed.field,
          index
        );
        return;
      }

      setter({ ...processed }, forceUpdate);
    }

    this.propsProcessor<ProxyedSchema>(
      schema,
      this.schemaPreset,
      processed,
      updateSchema,
      index,
      schemaIndex,
      parentField
    );
  }

  replaceFunctionsWithUndefined(obj: AnyObject) {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let value = obj[key];
        if (typeof value === "function") {
          // obj[key] = undefined;
        } else if (typeof value === "object") {
          this.replaceFunctionsWithUndefined(value);
        }
      }
    }
    return obj;
  }

  runtimeMeta() {
    const model = this.replaceFunctionsWithUndefined(
      toRaw(deepClone(this.processedModel.value))
    );
    return {
      model,
    };
  }

  propsProcessor<T extends object = any>(
    pendingProcess: T,
    preset: Record<keyof T, any>,
    processed: AnyObject,
    update: AnyFunction,
    schemaIndexOrChildrenIndex: number,
    schemaIndex?: number,
    parentField?: string
  ) {
    const pendingProcessKeys = Object.keys(pendingProcess) as (keyof T)[];
    const progress = Array.from({
      length: pendingProcessKeys.length,
    }).fill(false);

    function isProgressDone() {
      return progress.every((p) => p);
    }

    for (let i = 0; i < pendingProcessKeys.length; i++) {
      const pendingProcessKey = pendingProcessKeys[i];
      const propertyValue = pendingProcess[pendingProcessKey];

      if (IS.isFunction(propertyValue)) {
        const fnExecRes = propertyValue(this.runtimeMeta());
        if (pendingProcessKey !== "defaultValue") {
          this.schemaEffect.trackEffect(() => {
            let effectRes = propertyValue(this.runtimeMeta());
            if (effectRes instanceof Promise) {
              effectRes.then((res) => {
                if (schemaIndex === undefined) {
                  if (!IS.isFunction(res)) {
                    if (typeof res === "string" && res.includes("undefined")) {
                      res = res.replace(/undefined/g, "");
                    }
                    // @ts-expect-error
                    this.processedSchemas.value[schemaIndexOrChildrenIndex][
                      pendingProcessKey
                    ] = res;
                  }
                } else {
                  if (!IS.isFunction(res)) {
                    if (typeof res === "string" && res.includes("undefined")) {
                      res = res.replace(/undefined/g, "");
                    }
                    // @ts-expect-error
                    this.processedSchemas.value[schemaIndex].children[
                      schemaIndexOrChildrenIndex
                    ][pendingProcessKey] = res;
                  }
                }
              });
            } else {
              if (schemaIndex === undefined) {
                if (!IS.isFunction(effectRes)) {
                  if (
                    typeof effectRes === "string" &&
                    effectRes.includes("undefined")
                  ) {
                    effectRes = effectRes.replace(/undefined/g, "");
                  }
                  // @ts-expect-error
                  this.processedSchemas.value[schemaIndexOrChildrenIndex][
                    pendingProcessKey
                  ] = effectRes;
                }
              } else {
                if (!IS.isFunction(effectRes)) {
                  if (
                    typeof effectRes === "string" &&
                    effectRes.includes("undefined")
                  ) {
                    effectRes = effectRes.replace(/undefined/g, "");
                  }
                  // @ts-expect-error
                  this.processedSchemas.value[schemaIndex].children[
                    schemaIndexOrChildrenIndex
                  ][pendingProcessKey] = effectRes;
                }
              }
            }
          });
        } else {
          this.modelEffect.trackEffect(() => {
            let effectRes = propertyValue(this.runtimeMeta());
            this.stopWatchEffect.trackEffect(
              watchEffect(() => {
                effectRes = propertyValue(this.runtimeMeta());
                if (effectRes instanceof Promise) {
                  effectRes.then((res) => {
                    // TODO: 默认认为携带 undefined 是脏数据，这块后续重新规划，因为所谓的将 function 替换成 undefined 也是为了在一定程度上延续这种对脏数据的认知
                    if (typeof res === "string" && !res.includes("undefined")) {
                      this.stopWatchEffect.triggerEffects();
                    } else {
                      res = res.replace(/undefined/g, "");
                    }
                    // TODO: 后续重构，此处的 parentField === undefined 是用来区分 list 和 group 的
                    if (
                      schemaIndexOrChildrenIndex === undefined ||
                      parentField === undefined
                    ) {
                      // @ts-expect-error
                      if (IS.isFunction(pendingProcess.field)) {
                        // @ts-expect-error
                        const fieldRes = pendingProcess.field(
                          this.runtimeMeta()
                        );
                        if (fieldRes instanceof Promise) {
                          fieldRes.then((resolvedFieldRes) => {
                            this.processedModel.value[resolvedFieldRes] = res;
                          });
                        } else {
                          this.processedModel.value[fieldRes] = res;
                        }
                        return;
                      }
                      // @ts-expect-error

                      this.processedModel.value[pendingProcess.field] = res;
                    } else {
                      // list
                      // @ts-expect-error
                      if (IS.isFunction(pendingProcess.field)) {
                        // @ts-expect-error
                        const fieldRes = pendingProcess.field(
                          this.runtimeMeta()
                        );
                        if (fieldRes instanceof Promise) {
                          fieldRes.then((resolvedFieldRes) => {
                            this.processedModel.value[parentField][
                              schemaIndexOrChildrenIndex
                            ][resolvedFieldRes] = res;
                          });
                        } else {
                          if (
                            this.processedModel.value[parentField][
                              schemaIndexOrChildrenIndex
                            ]
                          ) {
                            this.processedModel.value[parentField][
                              schemaIndexOrChildrenIndex
                            ][fieldRes] = res;
                          }
                        }
                        return;
                      }

                      if (this.processedModel.value[parentField]) {
                        this.processedModel.value[parentField].forEach(
                          // @ts-expect-error
                          (childModel) => {
                            // @ts-expect-error
                            childModel[pendingProcess.field] = res;
                          }
                        );
                      }
                    }
                    this.rawModel = deepClone(this.processedModel.value);
                    this.modelEffect.clearEffects();
                  });
                } else {
                  if (
                    typeof effectRes === "string" &&
                    !effectRes.includes("undefined")
                  ) {
                    this.stopWatchEffect.triggerEffects();
                  } else {
                    effectRes = effectRes.replace(/undefined/g, "");
                  }
                  // @ts-expect-error
                  if (IS.isFunction(pendingProcess.field)) {
                    // @ts-expect-error
                    const fieldRes = pendingProcess.field(this.runtimeMeta());
                    if (fieldRes instanceof Promise) {
                      fieldRes.then((resolvedFieldRes) => {
                        this.processedModel.value[resolvedFieldRes] = effectRes;
                      });
                    } else {
                      this.processedModel.value[fieldRes] = effectRes;
                    }
                    return;
                  }
                  // @ts-expect-error
                  this.processedModel.value[pendingProcess.field] = effectRes;
                  // TODO: 后续重构，此处的 parentField === undefined 是用来区分 list 和 group 的
                  if (
                    schemaIndexOrChildrenIndex === undefined ||
                    parentField === undefined
                  ) {
                    // group
                    // @ts-expect-error
                    if (IS.isFunction(pendingProcess.field)) {
                      // @ts-expect-error
                      const fieldRes = pendingProcess.field(this.runtimeMeta());
                      if (fieldRes instanceof Promise) {
                        fieldRes.then((resolvedFieldRes) => {
                          this.processedModel.value[resolvedFieldRes] =
                            effectRes;
                        });
                      } else {
                        this.processedModel.value[fieldRes] = effectRes;
                      }
                      return;
                    }
                    // @ts-expect-error
                    this.processedModel.value[pendingProcess.field] = effectRes;
                  } else {
                    for (
                      let i = 0;
                      i < this.processedModel.value[parentField].length;
                      i++
                    ) {
                      const item = this.processedModel.value[parentField][i];
                      // @ts-expect-error

                      if (!IS.isFunction(pendingProcess.field)) {
                        // @ts-expect-error
                        item[pendingProcess.field] = effectRes;
                      } else {
                        // @ts-expect-error
                        const fieldRes = pendingProcess.field(
                          this.runtimeMeta()
                        );
                        if (fieldRes instanceof Promise) {
                          fieldRes.then((resolvedFieldRes) => {
                            item[resolvedFieldRes] = effectRes;
                          });
                        } else {
                          item[fieldRes] = effectRes;
                        }
                        return;
                      }
                    }
                  }
                  if (!this.rawModel) {
                    this.rawModel = deepClone(this.processedModel.value);
                  }
                  this.modelEffect.clearEffects();
                }
              })
            );
          });
        }

        if (fnExecRes instanceof Promise) {
          progress[i] = true;
          processed[pendingProcessKey] =
            preset[pendingProcessKey].defaultValueWhenAsync;
          isProgressDone() && update();
          fnExecRes.then((res) => {
            progress[i] = true;
            processed[pendingProcessKey] = res;
            isProgressDone() && update(true);
          });
        } else {
          progress[i] = true;
          processed[pendingProcessKey] = fnExecRes;
          isProgressDone() && update();
        }
      } else {
        progress[i] = true;
        if (isRef(propertyValue)) {
          watch(
            () => propertyValue.value,
            (val) => {
              processed[pendingProcessKey] = val;
              isProgressDone() && update();
            },
            {
              immediate: true,
              deep: true,
            }
          );
          watchEffect(() => {});
        } else if (isReactive(propertyValue)) {
          watch(
            () => propertyValue,
            (val) => {
              processed[pendingProcessKey] = val;
              isProgressDone() && update();
            },
            {
              immediate: true,
              deep: true,
            }
          );
        } else {
          processed[pendingProcessKey] = propertyValue;
          isProgressDone() && update();
        }
      }
    }
  }

  modelProcessor(schema: ProxyedSchema, baseModel = this.processedModel.value) {
    if (IS.isListSchema(schema)) {
      if (IS.isFunction(schema.field)) return;
      if (!baseModel[schema.field]) {
        baseModel[schema.field] = [{}];
      }
      schema.children.forEach((childSchema) => {
        this.modelProcessor(childSchema, baseModel[schema.field][0]);
      });
      return;
    }
    if (IS.isGroupSchema(schema)) {
      schema.children.forEach((childSchema) => {
        this.modelProcessor(childSchema, baseModel);
      });
      return;
    }
    if (IS.isItemSchema(schema)) {
      if (
        IS.isFunction(schema.field) ||
        IS.isUndefined(schema.field) ||
        !Number.isNaN(Number(schema.field)) ||
        IS.isFunction(schema.defaultValue)
      )
        return;
      baseModel[schema.field] = schema.defaultValue;
    }
  }
}
