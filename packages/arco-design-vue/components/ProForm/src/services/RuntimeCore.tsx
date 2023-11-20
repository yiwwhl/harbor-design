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
  formRef: Ref<AnyObject> = ref(null as unknown as AnyObject);

  constructor(public setup: Setup) {
    this.processors = new Processors(this.schemas, this.model);
    this.analyze(this.setup(this));
  }

  analyze(formCustomization: FormCustomization) {
    this.processors.schemaAnalyzer(formCustomization.schemas);
  }

  runtimeItemProcessor(
    schema: ItemSchema,
    index?: number,
    baseModel = this.model.value,
    parentSchema?: ListSchema
  ) {
    const field = parentSchema
      ? `${parentSchema.field}.${index}.${schema.field}`
      : schema.field;
    const Component = toRaw(schema.component);
    const props = schema.componentProps ?? {};
    return (
      <Context.runtimeDoms.FormItem
        label={`${schema.label}:`}
        rules={schema.rules}
        field={field}
      >
        <Component {...props} v-model={baseModel[schema.field]} />
      </Context.runtimeDoms.FormItem>
    );
  }

  runtimeGroupProcessor(schema: GroupSchema) {
    return (
      <>
        {schema.label}
        {(schema.children as ItemSchema[]).map((chlidSchema) =>
          this.runtimeItemProcessor(chlidSchema)
        )}
      </>
    );
  }

  runtimeListProcessor(schema: ListSchema) {
    return (
      <>
        {schema.label}
        {this.model.value[schema.field].map((listItemModel: AnyObject) =>
          (schema.children as ItemSchema[]).map((childSchema, index) =>
            this.runtimeItemProcessor(childSchema, index, listItemModel, schema)
          )
        )}
      </>
    );
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
      <Context.runtimeDoms.Form ref={this.formRef} model={this.model.value}>
        {this.runtimeProcessor(this.schemas.value)}
      </Context.runtimeDoms.Form>
    );
  }
}