import {
  CSSProperties,
  Ref,
  isReactive,
  isRef,
  nextTick,
  reactive,
  ref,
  toRaw,
  watch,
} from "vue";
import { Context, Preset } from "..";
import {
  Setup,
  Schema,
  FormCustomization,
  AnyObject,
  ItemSchema,
  GroupSchema,
  ListSchema,
  ProcessorBySchemaType,
  Runtime,
  NativeCustomizationOptions,
} from "../../types";
import Processor from "../Processor";
import {
  IS,
  deepAssign,
  deepClone,
  replaceUndefinedInString,
} from "../../utils";
import Effect from "../Effect";
import RuntimeContainer from "./RuntimeContainer";
import RuntimeAdpter from "./RuntimeAdapter";

// TODO: should refactor
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
  native: NativeCustomizationOptions = reactive({});
  grid = {};
  runtime: Runtime = {};
  globalNativeFormOverride = {
    props: {},
    slots: {},
  };
  ui: string;
  runtimeAdapter: RuntimeAdpter;

  constructor(public setup: Setup) {
    this.processor = new Processor(this);
    const formCustomization = this.setup(this) as FormCustomization;
    this.ui = formCustomization.ui ?? Context.presets.ui;
    this.runtimeAdapter = new RuntimeAdpter(this.ui);
    if (isRef(formCustomization.schemas)) {
      const stopWatch = watch(
        () => formCustomization.schemas,
        () => {
          // @ts-expect-error
          this.processor.parseSchemas(formCustomization.schemas.value);
          nextTick(() => {
            stopWatch();
          });
        },
        {
          deep: true,
        }
      );
    } else if (isReactive(formCustomization.schemas)) {
      const stopWatch = watch(
        () => formCustomization.schemas,
        () => {
          this.processor.parseSchemas(formCustomization.schemas);
          nextTick(() => {
            stopWatch();
          });
        },
        {
          deep: true,
        }
      );
    } else {
      this.processor.parseSchemas(formCustomization.schemas);
    }
  }

  getRuntimeMeta() {
    const model = toRaw(deepClone(this.model.value));

    return {
      model,
      reactiveModel: this.model.value,
    };
  }

  runtimeItemProcessor(
    schema: ItemSchema,
    index?: number,
    baseModel = this.model.value,
    parentSchema?: ListSchema
  ) {
    const Component = toRaw(schema.component);
    if (!Component) return;
    deepAssign(this.globalNativeFormOverride.props, schema.native?.props?.Form);
    deepAssign(this.globalNativeFormOverride.slots, schema.native?.slots?.Form);
    const formItemNativeSlots = deepAssign(
      deepClone(this.native?.slots?.FormItem) ?? {},
      schema.native?.slots?.FormItem
    );
    const defaultItemStyle: CSSProperties = {
      display: "grid",
      gridColumn: "1 / -1",
      ...schema.grid,
    };
    const formItemNativeProps = deepAssign(
      deepClone(this.native?.props?.FormItem) ?? {},
      schema.native?.props?.FormItem
    );
    const runtimeField = this.runtimeAdapter.getRuntimeField({
      schema,
      parentSchema,
      index,
    });
    const componentName = Component.name;
    const props = schema.componentProps ?? {};
    const placeholderPresetByComponentName =
      Preset.placeholderPresetByComponentName;
    let placeholder = schema.placeholder;

    let show = schema.show;
    if (show === undefined) {
      show = true;
    }
    if (!show) {
      delete baseModel[schema.field];
    }
    let label = schema.label;
    const runtime = parentSchema?.runtime ?? this.runtime;
    if (!IS.isUndefined(index) && !IS.isObjectEmpty(runtime)) {
      // 对于 list 而言会有数据 model index
      label = replaceUndefinedInString(
        runtime?.customizeItemLabel?.(schema.label ?? "", index + 1),
        ""
      );
    }
    if (!placeholder) {
      let prefix = "请输入";
      if (!IS.isUndefined(componentName)) {
        if (
          // @ts-expect-error
          placeholderPresetByComponentName[componentName.toLowerCase()]
        ) {
          // 非相似碰撞
          prefix =
            // @ts-expect-error
            placeholderPresetByComponentName[componentName.toLowerCase()];
          placeholder = `${prefix}${label}`;
        } else {
          // 相似碰撞，比如某些 xxxSelect 也可以被认为是与 Select 存在碰撞
          Object.keys(placeholderPresetByComponentName).forEach((name) => {
            if (componentName.toLowerCase().includes(name.toLowerCase())) {
              // @ts-expect-error
              prefix = placeholderPresetByComponentName[name];
            }
          });
          placeholder = `${prefix}${label}`;
        }
      } else {
        placeholder = `${prefix}${label}`;
      }
    }
    const runtimeRequired = this.runtimeAdapter.getRuntimeRequired({
      ...schema,
      label,
    });
    const Item = RuntimeContainer.getItemContainer(this);
    const FormItem = RuntimeContainer.getFormItemContainer(this);
    const that = this;
    return (
      <div style={defaultItemStyle}>
        <Item>
          {{
            default() {
              return (
                <FormItem
                  {...formItemNativeProps}
                  v-show={show}
                  label={`${label}:`}
                  {...runtimeField}
                  {...runtimeRequired}
                >
                  {{
                    default() {
                      return that.runtimeAdapter.formComponentRenderer({
                        Component,
                        schema,
                        baseModel,
                        placeholder,
                        props,
                      });
                    },
                    ...formItemNativeSlots,
                  }}
                </FormItem>
              );
            },
          }}
        </Item>
      </div>
    );
  }

  runtimeGroupProcessor(schema: GroupSchema) {
    const defaultStyle = {
      display: "grid",
      gridColumn: "1 / -1",
      ...schema.grid,
    };
    const Group = RuntimeContainer.getGroupContainer(this);
    return (
      <div style={defaultStyle}>
        <Group schema={schema}>
          {(schema.children as ItemSchema[]).map((chlidSchema) =>
            this.runtimeItemProcessor(chlidSchema)
          )}
        </Group>
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
    this.runtimeAdapter.clearValidate(this);
  }

  deleteListItem(schema: AnyObject, index: number) {
    this.model.value[schema.field].splice(index, 1);
    this.runtimeAdapter.clearValidate(this);
  }

  runtimeListProcessor(schema: ListSchema) {
    const defaultStyle = {
      display: "grid",
      gridColumn: "1 / -1",
      ...schema.grid,
    };
    const that = this;
    if (!that.model.value[schema.field]) {
      that.model.value[schema.field] = [{}];
    }

    const List = RuntimeContainer.getListContainer(this);
    const ListItem = RuntimeContainer.getListItemContainer(this);
    return (
      <div style={defaultStyle}>
        <List schema={schema}>
          {{
            default() {
              return that.model.value[schema.field].map(
                (listItemModel: AnyObject, listItemIndex: number) => (
                  <ListItem>
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
                  </ListItem>
                )
              );
            },
            add({ container }: AnyObject = {}) {
              let Container = container ?? <button>添加</button>;
              return <Container onClick={() => that.addListItem(schema)} />;
            },
          }}
        </List>
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
      ...this.grid,
    };
    const that = this;
    const formNativeProps = deepAssign(
      deepClone(this.native?.props?.Form) ?? {},
      this.globalNativeFormOverride.props
    );
    const formNativeSlots = deepAssign(
      deepClone(this.native?.slots?.Form) ?? {},
      this.globalNativeFormOverride.slots
    );
    const Form = RuntimeContainer.getFormContainer(this);
    const formModelPropName = this.runtimeAdapter.getFormModelPropName();
    return (
      <Form
        {...formNativeProps}
        ref={this.formRef}
        {...{ [formModelPropName]: this.model.value }}
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
      </Form>
    );
  }
}