import { Fragment, PropType, defineComponent, inject, ref } from "vue";
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

export default defineComponent({
  props: {
    register: {
      type: Function as PropType<FormRegister>,
      required: true,
    },
  },
  setup(props) {
    const globalConfig = inject(globalConfigSymbol) as any;
    const formRef = ref();
    const registerInstance = {
      formRef,
    } as unknown as RegisterInstance;
    const register = props.register(registerInstance);
    console.log("register", register);
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
        console.log("dataModel", schema);
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

    function renderItem(schema: ItemTypeSchemaItem, model: any) {
      return (
        <FormItem
          label={schema.label}
          field={schema.field}
          rules={schema.rules}
        >
          <schema.component v-model={model[schema.field]} />
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
                {schema.children.map((s) => renderItem(s, m))}
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
