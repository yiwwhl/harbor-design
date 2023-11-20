import { Ref, Fragment } from "vue";
import {
  AnyObject,
  Schema,
  ItemSchema,
  ProxyedSchema,
  AnyFunction,
} from "../types";
import { IS, deepClone } from "../utils";
import { Context } from "../services";

export default class Processors {
  public rawSchemas: Schema[] = [];
  public rawModel: AnyObject = {};
  public schemaDefaultValueWhenAsync: Record<keyof ItemSchema, any> = {
    type: "item",
    component: Fragment,
    componentProps: undefined,
    defaultValue: undefined,
    label: "",
    field: "warn_no_field",
  };

  constructor(
    public processedSchemas: Ref<Schema[]>,
    public processedModel: Ref<AnyObject>
  ) {}

  schemaAnalyzer(
    schemas: ProxyedSchema[],
    baseSchema = this.processedSchemas.value
  ) {
    for (let i = 0; i < schemas.length; i++) {
      let schema = schemas[i];
      this.schemaProcessor(schema, i, (processedSchema, forceUpdate) => {
        baseSchema[i] = processedSchema;
        this.modelProcessor(processedSchema);
        if (!this.rawSchemas[i] || forceUpdate) {
          this.rawSchemas[i] = deepClone(processedSchema);
        }
      });
    }
  }

  schemaProcessor(schema: ProxyedSchema, index: number, setter: AnyFunction) {
    const processed: AnyObject = {};
    const that = this;

    function updateSchema(forceUpdate = false) {
      // 同时执行 watchSchemaEffect 收集的函数
      Array.from(Context.effects).forEach((effect) => effect());

      if (processed.componentProps) {
        const processedProps = {};
        that.propsProcessor(
          processed.componentProps,
          {
            options: undefined,
          },
          processedProps,
          () => {
            processed.componentProps = processedProps;
            setter({ ...processed }, forceUpdate);
          }
        );
        return;
      }

      if (processed.children) {
        that.processedSchemas.value[index] = processed as Schema;
        that.schemaAnalyzer(
          processed.children,
          // @ts-expect-error 此处已经守卫为非 ItemSchema
          that.processedSchemas.value[index]?.children
        );
        return;
      }

      setter({ ...processed }, forceUpdate);
    }

    this.propsProcessor<ProxyedSchema>(
      schema,
      this.schemaDefaultValueWhenAsync,
      processed,
      updateSchema
    );
  }

  propsProcessor<T extends object = any>(
    pendingProcess: T,
    schemaDefaultValueWhenAsync: Record<keyof T, any>,
    processed: AnyObject,
    update: AnyFunction
  ) {
    const pendingProcessKeys = Object.keys(pendingProcess) as (keyof T)[];
    const progress = Array.from({
      length: pendingProcessKeys.length,
    }).fill(false);

    function isProgressDone() {
      return progress.every((p) => p);
    }

    pendingProcessKeys.forEach((pendingProcessKey, index) => {
      const propertyValue = pendingProcess[pendingProcessKey];
      if (IS.isFunction(propertyValue)) {
        const fnExecRes = propertyValue();
        if (fnExecRes instanceof Promise) {
          progress[index] = true;
          processed[pendingProcessKey] =
            schemaDefaultValueWhenAsync[pendingProcessKey];
          isProgressDone() && update();
          fnExecRes.then((res) => {
            progress[index] = true;
            processed[pendingProcessKey] = res;
            isProgressDone() && update(true);
          });
        } else {
          progress[index] = true;
          processed[pendingProcessKey] = fnExecRes;
          isProgressDone() && update();
        }
      } else {
        progress[index] = true;
        processed[pendingProcessKey] = propertyValue;
        isProgressDone() && update();
      }
    });
  }

  modelProcessor(schema: ProxyedSchema) {
    console.log("schema", schema);
  }
}
