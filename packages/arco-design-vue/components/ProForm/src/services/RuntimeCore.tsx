import { Ref, ref, toRaw } from "vue";
import { Context } from ".";
import {
  Setup,
  Schema,
  FormCustomization,
  AnyObject,
  ItemSchema,
  GroupSchema,
  ListSchema,
  ProcessorBySchemaType,
} from "../types";
import Processors from "./Processors";

export default class RuntimeCore {
  processors: Processors;
  schemas: Ref<Schema[]> = ref([]);
  model: Ref<AnyObject> = ref({});
  processorBySchemaType: ProcessorBySchemaType = {
    item: this.runtimeItemProcessor.bind(this),
    group: this.runtimeGroupProcessor.bind(this),
    list: this.runtimeListProcessor.bind(this),
  };

  constructor(public setup: Setup) {
    this.processors = new Processors(this.schemas, this.model);
    this.analyze(this.setup());
  }

  analyze(formCustomization: FormCustomization) {
    this.processors.analyzer(formCustomization);
  }

  runtimeItemProcessor(schema: ItemSchema) {
    const Component = toRaw(schema.component);
    return (
      <Context.runtimeDoms.FormItem label={`${schema.label}:`}>
        <Component />
      </Context.runtimeDoms.FormItem>
    );
  }

  runtimeGroupProcessor(schema: GroupSchema) {
    return (
      <>
        {schema.label}
        {schema.children.map(this.runtimeItemProcessor)}
      </>
    );
  }

  runtimeListProcessor(schema: ListSchema) {
    return <>{schema.label}</>;
  }

  runtimeProcessor(schemas: Schema[]) {
    return schemas.map((schema) => {
      if (!schema.type) {
        schema.type = "item";
      }
      // @ts-expect-error 类型不兼容，处理成本过高，直接忽略处理
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
