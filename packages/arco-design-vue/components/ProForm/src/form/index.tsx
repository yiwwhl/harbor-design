import {
  Fragment,
  PropType,
  defineComponent,
  inject,
  reactive,
  ref,
} from "vue";
import { Button, Form, FormItem, Space } from "@arco-design/web-vue";
import {
  FormModel,
  FormRegister,
  GroupTypeSchemaItem,
  ItemTypeSchemaItem,
  ListTypeSchemaItem,
  Register,
  RegisterInstance,
  RenderSchema,
  SchemaItemType,
} from "../types/form";
import styles from "../../../../assets/components/ProForm/index.module.scss";
import { globalConfigSymbol } from "../../../../basicComponents/GlobalConfig";
import { useIsCheck } from "../hooks/useIsCheck";

export default defineComponent({
  props: {
    register: {
      type: Function as PropType<FormRegister>,
      required: true,
    },
  },
  setup(props) {
    const { isUndefined, isFunction } = useIsCheck();
    const globalConfig = inject(globalConfigSymbol) as any;
    const formRef = ref();
    const registerInstance = {
      formRef,
    } as unknown as RegisterInstance;
    const register = props.register(registerInstance);
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
    const GroupWrapper =
      globalConfig.Components.ProForm.layout?.Group ?? Fragment;
    const ListWrapper =
      globalConfig.Components.ProForm.layout?.List ?? Fragment;
    const AddButton =
      globalConfig.Components.ProForm.opt?.AddButton ??
      (({ schema, model }: any) => {
        function handleAddClick() {
          model[schema.field].push({
            ...register.immutableModel[schema.field][0],
          });
        }
        return <Button onClick={handleAddClick}>添加</Button>;
      });
    const DeleteButton =
      globalConfig.Components.ProForm.opt?.DeleteButton ??
      (({ schema, model, index }: any) => {
        function handleDeleteClick() {
          model[schema.field].splice(index, 1);
        }
        return <Button onClick={handleDeleteClick}>删除</Button>;
      });

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

    function render(register: Register) {
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

    return () => {
      return render(register);
    };
  },
});
