import { bootstrap } from "./bootstrap";
import {
  ItemTypeSchemaItem,
  ListTypeSchemaItem,
  RegisterInstance,
  FormRegister,
} from "../types/form";
import { reactive, ref, toRaw } from "vue";
import { isUndefined } from "../utils";
import { FormItem, Space, Form } from "@arco-design/web-vue";
import {
  GroupTypeSchemaItem,
  FormModel,
  SchemaItemType,
  RenderSchema,
} from "../types/form";
import styles from "../../../../assets/components/ProForm/index.module.scss";
import { handleAsyncOrSync } from "../services";

export function rendercore(props: { register: FormRegister }) {
  const formRef = ref();
  const registerInstance = {
    formRef,
  } as unknown as RegisterInstance;
  const register = toRaw(props.register(registerInstance));
  const { AddButton, DeleteButton, GroupWrapper, ListWrapper } =
    bootstrap(register);
  const schemaHandlerByType: Record<
    SchemaItemType,
    | RenderSchema<ItemTypeSchemaItem>
    | RenderSchema<GroupTypeSchemaItem>
    | RenderSchema<ListTypeSchemaItem>
  > = {
    item: renderItem,
    group: renderGroup,
    list: renderList,
  };

  function processComponentProps(props: Record<PropertyKey, any>) {
    const reactiveProps = reactive({});
    const keys = Object.keys(props);
    for (let i = 0; i < keys.length; i++) {
      handleAsyncOrSync(props[keys[i]], (res) =>
        Object.assign(reactiveProps, {
          [keys[i]]: res,
        })
      );
    }

    return reactiveProps;
  }

  function cacheComponentProps(
    schema: Record<PropertyKey, any>,
    propsShouldBeCached?: Record<PropertyKey, any>
  ) {
    propsShouldBeCached &&
      Object.assign(schema, {
        cachedComponentProps: propsShouldBeCached,
      });
  }

  function renderItem(
    schema: any,
    model: any,
    parentSchema?: ListTypeSchemaItem,
    index?: number
  ) {
    // point: 对于远程调用的请求来说，每次是否都获取最新值还是永远只获取一次是两种都合理的需求，目前先只做成永远获取一次，而永远都获取最新值比较小众，交互方式待定
    let props;
    if (!schema.cachedComponentProps) {
      props =
        schema.componentProps && processComponentProps(schema.componentProps);
      cacheComponentProps(schema, props);
    }
    props = schema.cachedComponentProps;
    // hard code 兜底
    !model[schema.field] &&
      Object.assign(model, {
        [schema.field]: schema.defaultValue,
      });
    const SchemaComponent = toRaw(schema.component);
    const uniqueField = isUndefined(index)
      ? schema.field
      : `${parentSchema?.field}.${index}.${schema.field}`;
    const validReRenderKeys = ["show"];

    // 每次更新处理对需要实时更新的元素的计算，需重构为对类属性的判断及统一操作
    const rawKeys = Object.keys(schema.raw).filter((key) =>
      validReRenderKeys.includes(key)
    );
    rawKeys.length > 0 &&
      rawKeys.forEach((key) => {
        handleAsyncOrSync(
          schema.raw[key],
          (val) => {
            if (schema[key] === val) return;
            Object.assign(schema, {
              [key]: val,
            });
          },
          {
            model: register.model,
          }
        );
      });

    return (
      <FormItem
        v-show={schema.show}
        label={schema.label}
        field={uniqueField}
        rules={schema.rules}
      >
        <SchemaComponent
          placeholder={schema.placeholder}
          {...props}
          v-model={model[schema.field]}
        />
      </FormItem>
    );
  }

  function renderGroup(schema: GroupTypeSchemaItem, model: FormModel) {
    return (
      <GroupWrapper label={schema.label}>
        {schema.children.map((s) => renderItem(s, model))}
      </GroupWrapper>
    );
  }

  function renderList(schema: ListTypeSchemaItem, model: FormModel) {
    const listModel = model[schema.field];
    const showDeleteButton = listModel.length > 1;
    return (
      <>
        <ListWrapper label={schema.label}>
          {listModel.map((m: any, index: number) => (
            <Space direction="vertical" fill>
              {schema.children.map((s) => renderItem(s, m, schema, index))}
              {showDeleteButton &&
                DeleteButton({
                  schema,
                  model,
                  index,
                })}
            </Space>
          ))}
          {AddButton({
            schema,
            model,
          })}
        </ListWrapper>
      </>
    );
  }

  function render() {
    const { model, schemas } = register;
    return (
      <Form ref={formRef} class={styles.form} model={model}>
        {schemas.map((schema) => {
          schema.type = schema.type ?? "item";
          return schemaHandlerByType[schema.type](schema as any, model);
        })}
      </Form>
    );
  }

  return {
    render,
    renderItem,
    renderGroup,
    renderList,
  };
}
