import { Ref, ref, toRaw } from "vue";
import { Context } from ".";
import {
  Setup,
  Schema,
  FormCustomization,
  AnyObject,
  SchemaType,
} from "../types";
import Processors from "./Processors";

export default class RuntimeCore {
  processors: Processors;
  schemas: Ref<Schema[]> = ref([]);
  model: Ref<AnyObject> = ref({});
  processorBySchemaType: Record<SchemaType, (schema: Schema) => any> = {
    item: this.runtimeItemProcessor,
    group: this.runtimeGroupProcessor,
    list: this.runtimeListProcessor,
  };

  constructor(public setup: Setup) {
    this.processors = new Processors(this.schemas, this.model);
    this.analyze(this.setup());
  }

  analyze(formCustomization: FormCustomization) {
    this.processors.analyzer(formCustomization);
  }

  runtimeItemProcessor(schema: Schema) {
    const Component = toRaw(schema.component);
    return (
      <Context.runtimeDoms.FormItem label={`${schema.label}:`}>
        <Component />
      </Context.runtimeDoms.FormItem>
    );
  }

  runtimeGroupProcessor(schema: Schema) {
    const Component = toRaw(schema.component);
    return (
      <Context.runtimeDoms.FormItem label={`${schema.label}:`}>
        <Component />
      </Context.runtimeDoms.FormItem>
    );
  }

  runtimeListProcessor(schema: Schema) {
    const Component = toRaw(schema.component);
    return (
      <Context.runtimeDoms.FormItem label={`${schema.label}:`}>
        <Component />
      </Context.runtimeDoms.FormItem>
    );
  }
  runtimeProcessor(schemas: Schema[]) {
    return schemas.map((schema) => {
      if (!schema.type) {
        schema.type = "item";
      }
      return this.processorBySchemaType[schema.type](schema);
    });
  }

  exec() {
    return (
      <Context.runtimeDoms.Form>
        {this.runtimeProcessor(this.schemas.value)}
      </Context.runtimeDoms.Form>
    );
  }
}
