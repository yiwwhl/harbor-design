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
import { deepClone } from "../utils";

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
    let show = schema.show;
    if (show === undefined) {
      show = true;
    }
    if (!show) {
      delete baseModel[schema.field];
    }
    return (
      <Context.runtimeDoms.Item>
        {{
          default() {
            return (
              <Context.runtimeDoms.FormItem
                v-show={show}
                label={`${schema.label}:`}
                rules={schema.rules}
                field={field}
              >
                <Component v-model={baseModel[schema.field]} {...props} />
              </Context.runtimeDoms.FormItem>
            );
          },
        }}
      </Context.runtimeDoms.Item>
    );
  }

  runtimeGroupProcessor(schema: GroupSchema) {
    return (
      <Context.runtimeDoms.Group schema={schema}>
        {(schema.children as ItemSchema[]).map((chlidSchema) =>
          this.runtimeItemProcessor(chlidSchema)
        )}
      </Context.runtimeDoms.Group>
    );
  }

  addListItem(schema: AnyObject) {
    if (!this.processors.rawModel[schema.field]?.[0]) {
      return Promise.reject({
        code: `0001`,
        message: `异步默认值数据正在处理中，请您耐心等待... `,
      });
    }
    this.processors.rawModel[schema.field]?.[0] &&
      this.model.value[schema.field].push(
        deepClone(this.processors.rawModel[schema.field][0])
      );
  }

  deleteListItem(schema: AnyObject, index: number) {
    this.model.value[schema.field].splice(index, 1);
  }

  runtimeListProcessor(schema: ListSchema) {
    const that = this;
    return (
      <Context.runtimeDoms.List schema={schema}>
        {{
          default() {
            return that.model.value[schema.field].map(
              (listItemModel: AnyObject, listItemIndex: number) => (
                <Context.runtimeDoms.ListItem>
                  {{
                    default() {
                      return (schema.children as ItemSchema[]).map(
                        (childSchema, index) =>
                          that.runtimeItemProcessor(
                            childSchema,
                            index,
                            listItemModel,
                            schema
                          )
                      );
                    },
                    delete({ container }: AnyObject = {}) {
                      let Container = container ?? <button></button>;
                      return (
                        <Container
                          v-show={that.model.value[schema.field]?.length > 1}
                          onClick={() =>
                            that.deleteListItem(schema, listItemIndex)
                          }
                        />
                      );
                    },
                  }}
                </Context.runtimeDoms.ListItem>
              )
            );
          },
          add({ container }: AnyObject = {}) {
            let Container = container ?? <button>添加</button>;
            return <Container onClick={() => that.addListItem(schema)} />;
          },
        }}
      </Context.runtimeDoms.List>
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
