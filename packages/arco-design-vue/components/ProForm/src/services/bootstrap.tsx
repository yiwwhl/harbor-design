import { Fragment, inject } from "vue";
import { globalConfigSymbol } from "../../../../basicComponents/GlobalConfig";
import { Register } from "../types/form";
import { Button } from "@arco-design/web-vue";

export function bootstrap(register: Register) {
  const globalConfig = inject(globalConfigSymbol) as any;
  const GroupWrapper =
    globalConfig.Components.ProForm.layout?.Group ?? Fragment;
  const ListWrapper = globalConfig.Components.ProForm.layout?.List ?? Fragment;
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

  return {
    GroupWrapper,
    ListWrapper,
    AddButton,
    DeleteButton,
  };
}
