import { Ref } from "vue";
import { AnyObject, Schema, FormCustomization, ProxyedSchema } from "../types";
import { IS, deepClone } from "../utils";
import { Context } from "../services";

export default class Processors {
  public rawSchemas: Schema[] = [];
  public rawModel: AnyObject = {};

  constructor(
    public processedSchemas: Ref<Schema[]>,
    public processedModel: Ref<AnyObject>
  ) {}

  analyzer(formCustomization: FormCustomization) {
    const userCustomSchemas = formCustomization.schemas;

    for (let i = 0; i < userCustomSchemas.length; i++) {
      let schema = userCustomSchemas[i];
      this.schemaProcessor(schema, (processedSchema) => {
        this.processedSchemas.value[i] = processedSchema;
        if (!this.rawSchemas[i]) {
          this.rawSchemas[i] = deepClone(processedSchema);
        }
      });
      this.modelProcessor(schema);
    }
  }

  schemaProcessor(schema: ProxyedSchema, setter: (...args: any) => any) {
    const schemaKeys = Object.keys(schema);
    const processedSchema: AnyObject = {};
    const progress = Array.from({
      length: schemaKeys.length,
    }).fill(false);

    function isProgressDone() {
      return progress.every((p) => p);
    }

    function update() {
      if (isProgressDone()) {
        // 同时执行 watchSchemaEffect 收集的函数
        Array.from(Context.effects).forEach((effect) => effect());
        setter({ ...processedSchema });
      }
    }

    schemaKeys.forEach((schemaKey, index) => {
      const propertyValue = schema[schemaKey as keyof typeof schema];
      if (IS.isFunction(propertyValue)) {
        const fnExecRes = propertyValue();
        if (fnExecRes instanceof Promise) {
          progress[index] = true;
          processedSchema[schemaKey] = "";
          update();
          fnExecRes.then((res) => {
            progress[index] = true;
            processedSchema[schemaKey] = res;
            update();
          });
        } else {
          progress[index] = true;
          processedSchema[schemaKey] = fnExecRes;
          update();
        }
      } else {
        progress[index] = true;
        processedSchema[schemaKey] = propertyValue;
        update();
      }
    });
  }

  modelProcessor(schema: ProxyedSchema) {
    console.log("schema", schema);
  }
}
