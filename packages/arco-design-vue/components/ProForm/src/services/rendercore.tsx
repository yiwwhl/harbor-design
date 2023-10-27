import { bootstrap } from "./bootstrap";
import {
  ItemTypeSchemaItem,
  ListTypeSchemaItem,
  RegisterInstance,
  FormRegister,
} from "../types/form";
import { reactive, ref } from "vue";
import { isFunction, isUndefined } from "../utils";
import { FormItem, Space, Form } from "@arco-design/web-vue";
import {
  GroupTypeSchemaItem,
  FormModel,
  SchemaItemType,
  RenderSchema,
} from "../types/form";
import styles from "../../../../assets/components/ProForm/index.module.scss";

export function rendercore(props: { register: FormRegister }) {
  const formRef = ref();
  const registerInstance = {
    formRef,
  } as unknown as RegisterInstance;
  const register = props.register(registerInstance);
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

  // should refactor later !!! 有空再弄
  function processComponentProps(props: Record<PropertyKey, any>) {
    const reactiveProps = reactive({});
    const keys = Object.keys(props);
    for (let i = 0; i < keys.length; i++) {
      // should refactor
      if (isFunction(props[keys[i]])) {
        const fnResult = props[keys[i]]();
        if (fnResult instanceof Promise) {
          fnResult.then((promiseResult) => {
            Object.assign(reactiveProps, {
              [keys[i]]: promiseResult,
            });
          });
        } else {
          Object.assign(reactiveProps, {
            [keys[i]]: props[keys[i]](),
          });
        }
      } else {
        Object.assign(reactiveProps, {
          [keys[i]]: props[keys[i]],
        });
      }
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
    schema: ItemTypeSchemaItem,
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
    const uniqueField = isUndefined(index)
      ? schema.field
      : `${parentSchema?.field}.${index}.${schema.field}`;
    return (
      <FormItem label={schema.label} field={uniqueField} rules={schema.rules}>
        <schema.component {...props} v-model={model[schema.field]} />
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
