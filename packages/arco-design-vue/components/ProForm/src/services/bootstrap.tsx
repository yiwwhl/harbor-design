import { Fragment, inject } from "vue";
import { globalConfigSymbol } from "../../../../basicComponents/GlobalConfig";
import { Register } from "../types/form";
import { Button } from "@arco-design/web-vue";

export function bootstrap(register: Register) {
  const globalConfig = inject(globalConfigSymbol) as any;
  const GroupWrapper =
    globalConfig.Components.ProForm.layout?.Group ?? Fragment;
  const ListWrapper = globalConfig.Components.ProForm.layout?.List ?? Fragment;

  function handleAddClick(schema: any, model: any) {
    model[schema.field].push({
      ...register.immutableModel[schema.field][0],
    });
  }

  function handleDeleteClick(schema: any, model: any, index: any) {
    model[schema.field].splice(index, 1);
    // TODO: maybe improve
    register.registerInstance.formRef.clearValidate();
  }

  const AddButton = globalConfig.Components.ProForm.opt?.AddButton
    ? ({ schema, model }: any) =>
        globalConfig.Components.ProForm.opt?.AddButton(() =>
          handleAddClick(schema, model)
        )
    : ({ schema, model }: any) => {
        return (
          <Button onClick={() => handleAddClick(schema, model)}>添加</Button>
        );
      };
  const DeleteButton = globalConfig.Components.ProForm.opt?.DeleteButton
    ? ({ schema, model, index }: any) =>
        globalConfig.Components.ProForm.opt?.DeleteButton(() =>
          handleDeleteClick(schema, model, index)
        )
    : ({ schema, model, index }: any) => {
        return (
          <Button onClick={() => handleDeleteClick(schema, model, index)}>
            删除
          </Button>
        );
      };

  return {
    GroupWrapper,
    ListWrapper,
    AddButton,
    DeleteButton,
  };
}
