import { CSSProperties, Ref, reactive, ref, toRaw } from "vue";
import { Context, Preset } from ".";
import {
  Setup,
  Schema,
  FormCustomization,
  AnyObject,
  ItemSchema,
  GroupSchema,
  ListSchema,
  ProcessorBySchemaType,
  CustomizationOptions,
} from "../types";
import Processor from "./Processor";
import { deepAssign, deepClone } from "../utils";
import Effect from "./Effect";

export default class RuntimeCore {
  processor: Processor;
  schemas: Ref<Schema[]> = ref([]);
  model: Ref<AnyObject> = ref({});
  processorBySchemaType: ProcessorBySchemaType = {
    item: this.runtimeItemProcessor.bind(this),
    group: this.runtimeGroupProcessor.bind(this),
    list: this.runtimeListProcessor.bind(this),
  };
  formRef: Ref<AnyObject> = ref(null as unknown as AnyObject);
  hydrateEffect = new Effect();
  customizedOptions: CustomizationOptions = reactive({});
  gridProps = {};
  globalNativeFormOverride = {
    props: {},
    slots: {},
  };

  constructor(public setup: Setup) {
    this.processor = new Processor(this);
    const formCustomization = this.setup(this) as FormCustomization;
    this.processor.parseSchemas(formCustomization.schemas);
  }

  getRuntimeMeta() {
    const model = toRaw(deepClone(this.model.value));

    return {
      model,
    };
  }

  runtimeItemProcessor(
    schema: ItemSchema,
    index?: number,
    baseModel = this.model.value,
    parentSchema?: ListSchema
  ) {
    deepAssign(this.globalNativeFormOverride.props, schema.native?.props?.Form);
    deepAssign(this.globalNativeFormOverride.slots, schema.native?.slots?.Form);
    const formItemNativeProps = deepAssign(
      deepClone(this.customizedOptions.native?.props?.FormItem) ?? {},
      schema.native?.props?.FormItem
    );
    const formItemNativeSlots = deepAssign(
      deepClone(this.customizedOptions.native?.slots?.FormItem) ?? {},
      schema.native?.slots?.FormItem
    );
    const defaultItemStyle: CSSProperties = {
      display: "grid",
      gridColumn: "1 / -1",
      ...schema.gridProps,
    };
    const field = parentSchema
      ? `${parentSchema.field}.${index}.${schema.field}`
      : schema.field;
    const Component = toRaw(schema.component);
    if (!Component) return;
    const componentName = Component.name;
    const props = schema.componentProps ?? {};
    const placeholderPresetByComponentName =
      Preset.placeholderPresetByComponentName;
    let placeholder = schema.placeholder;
    if (!placeholder) {
      const prefix =
        // @ts-expect-error
        placeholderPresetByComponentName[componentName] ?? "请输入";
      placeholder = `${prefix}${schema.label}`;
    }
    const required = schema.required;
    if (required) {
      if (!schema.rules) {
        schema.rules = [];
        schema.rules?.push({
          required: true,
          message: `${schema.label}是必填项`,
        });
      } else {
        const requiredIndex = schema.rules.findIndex((rule) => !!rule.required);
        schema.rules[requiredIndex].message = `${schema.label}是必填项`;
      }
    }
    let show = schema.show;
    if (show === undefined) {
      show = true;
    }
    if (!show) {
      delete baseModel[schema.field];
    }
    return (
      <div style={defaultItemStyle}>
        <Context.runtimeDoms.Item>
          {{
            default() {
              return (
                <Context.runtimeDoms.FormItem
                  {...formItemNativeProps}
                  v-show={show}
                  label={`${schema.label}:`}
                  rules={schema.rules}
                  field={field}
                >
                  {{
                    default() {
                      return (
                        <Component
                          v-model={baseModel[schema.field]}
                          placeholder={placeholder}
                          {...props}
                        />
                      );
                    },
                    ...formItemNativeSlots,
                  }}
                </Context.runtimeDoms.FormItem>
              );
            },
          }}
        </Context.runtimeDoms.Item>
      </div>
    );
  }

  runtimeGroupProcessor(schema: GroupSchema) {
    const defaultStyle = {
      display: "grid",
      gridColumn: "1 / -1",
      ...schema.gridProps,
    };
    return (
      <div style={defaultStyle}>
        <Context.runtimeDoms.Group schema={schema}>
          {(schema.children as ItemSchema[]).map((chlidSchema) =>
            this.runtimeItemProcessor(chlidSchema)
          )}
        </Context.runtimeDoms.Group>
      </div>
    );
  }

  addListItem(schema: AnyObject) {
    if (!this.processor.stableModel[schema.field]?.[0]) {
      return Promise.reject({
        code: `0001`,
        message: `异步默认值数据正在处理中，请您耐心等待... `,
      });
    }
    this.processor.stableModel[schema.field]?.[0] &&
      this.model.value[schema.field].push(
        deepClone(this.processor.stableModel[schema.field][0])
      );
    this.formRef.value.clearValidate();
  }

  deleteListItem(schema: AnyObject, index: number) {
    this.model.value[schema.field].splice(index, 1);
    this.formRef.value.clearValidate();
  }

  runtimeListProcessor(schema: ListSchema) {
    const defaultStyle = {
      display: "grid",
      gridColumn: "1 / -1",
      ...schema.gridProps,
    };
    const that = this;
    if (!that.model.value[schema.field]) {
      that.model.value[schema.field] = [{}];
    }
    return (
      <div style={defaultStyle}>
        <Context.runtimeDoms.List schema={schema}>
          {{
            default() {
              return that.model.value[schema.field].map(
                (listItemModel: AnyObject, listItemIndex: number) => (
                  <Context.runtimeDoms.ListItem>
                    {{
                      default() {
                        return (schema.children as ItemSchema[]).map(
                          (childSchema) =>
                            that.runtimeItemProcessor(
                              childSchema,
                              listItemIndex,
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
      </div>
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
    const defaultStyle: CSSProperties = {
      display: "grid",
      gridColumn: "1 / -1",
      gridAutoColumns: "1fr",
      ...this.gridProps,
    };
    const that = this;
    const formNativeProps = deepAssign(
      deepClone(this.customizedOptions.native?.props?.Form) ?? {},
      this.globalNativeFormOverride.props
    );
    const formNativeSlots = deepAssign(
      deepClone(this.customizedOptions.native?.slots?.Form) ?? {},
      this.globalNativeFormOverride.slots
    );
    return (
      <Context.runtimeDoms.Form
        {...formNativeProps}
        ref={this.formRef}
        model={this.model.value}
      >
        {{
          default() {
            return (
              <div style={defaultStyle}>
                {that.runtimeProcessor(that.schemas.value)}
              </div>
            );
          },
          ...formNativeSlots,
        }}
      </Context.runtimeDoms.Form>
    );
  }
}
