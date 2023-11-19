import { Ref, Fragment } from "vue";
import {
  AnyObject,
  Schema,
  FormCustomization,
  ItemSchema,
  ProxyedSchema,
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

  analyzer(formCustomization: FormCustomization) {
    const userCustomSchemas = formCustomization.schemas;

    for (let i = 0; i < userCustomSchemas.length; i++) {
      let schema = userCustomSchemas[i];
      this.schemaProcessor(schema, (processedSchema, forceUpdate) => {
        this.processedSchemas.value[i] = processedSchema;
        this.modelProcessor(processedSchema);
        if (!this.rawSchemas[i] || forceUpdate) {
          this.rawSchemas[i] = deepClone(processedSchema);
        }
      });
    }
  }

  schemaProcessor(schema: ProxyedSchema, setter: (...args: any) => any) {
    const schemaKeys = Object.keys(schema) as Array<keyof typeof schema>;
    const processedSchema: AnyObject = {};
    const progress = Array.from({
      length: schemaKeys.length,
    }).fill(false);

    function isProgressDone() {
      return progress.every((p) => p);
    }

    // forceUpdate 主要用于处理 setter 时是否覆盖的问题，用于做一些异步数据初始化的处理
    function updateSchema(forceUpdate = false) {
      if (isProgressDone()) {
        // 同时执行 watchSchemaEffect 收集的函数
        Array.from(Context.effects).forEach((effect) => effect());
        setter({ ...processedSchema }, forceUpdate);
      }
    }

    schemaKeys.forEach((schemaKey, index) => {
      const propertyValue = schema[schemaKey];
      if (IS.isFunction(propertyValue)) {
        const fnExecRes = propertyValue();
        if (fnExecRes instanceof Promise) {
          progress[index] = true;
          processedSchema[schemaKey] =
            this.schemaDefaultValueWhenAsync[schemaKey];
          updateSchema();
          fnExecRes.then((res) => {
            progress[index] = true;
            processedSchema[schemaKey] = res;
            updateSchema(true);
          });
        } else {
          progress[index] = true;
          processedSchema[schemaKey] = fnExecRes;
          updateSchema();
        }
      } else {
        progress[index] = true;
        processedSchema[schemaKey] = propertyValue;
        updateSchema();
      }
    });
  }

  modelProcessor(schema: ProxyedSchema) {
    console.log("schema", schema);
  }
}
