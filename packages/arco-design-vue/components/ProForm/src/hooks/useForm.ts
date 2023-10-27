import { reactive } from "vue";
import { useIsCheck } from "./useIsCheck";
import { deepClone } from "../utils/index";
import {
  UseFormProps,
  UseForm,
  RegisterInstance,
  FormModel,
  Schemas,
  GroupTypeSchemaItem,
  ListTypeSchemaItem,
  ItemTypeSchemaItem,
} from "../types/form";

function useForm(props: UseFormProps): UseForm {
  const registerInstance = reactive({}) as RegisterInstance;
  const { isArray, isArrayEmpty } = useIsCheck();
  const { mutableModel, immutableModel } = setupModel(
    props.schemas,
    reactive({})
  );

  function setupModel(
    schemas: Schemas,
    model: FormModel
  ): {
    mutableModel: FormModel;
    immutableModel: FormModel;
  } {
    schemas.map((schema) => {
      if (isArray(model)) {
        if (isArrayEmpty(model)) {
          model.push({});
        }
        model[0][(schema as ListTypeSchemaItem).field] =
          (schema as ItemTypeSchemaItem).defaultValue ?? "";
        return;
      }
      if (schema.type === "group") {
        return setupModel((schema as GroupTypeSchemaItem).children, model);
      }
      if (schema.type === "list") {
        model[schema.field] = [];
        return setupModel(
          (schema as ListTypeSchemaItem).children,
          model[schema.field]
        );
      }
      model[schema.field] = schema.defaultValue ?? "";
    });
    // happy path
    return {
      mutableModel: model,
      immutableModel: deepClone(model),
    };
  }

  function register(_registerInstance: RegisterInstance) {
    Object.assign(registerInstance, _registerInstance);

    return {
      model: Object.assign(mutableModel),
      immutableModel,
      schemas: props.schemas,
    };
  }

  function submit(): Promise<FormModel> {
    return new Promise((resolve, reject) => {
      registerInstance.formRef.validate((errors) => {
        if (errors) {
          return reject(errors);
        }
        return resolve(mutableModel);
      });
    });
  }

  function hydrate(data: Record<PropertyKey, any>) {
    Object.assign(mutableModel, data);
  }

  return [
    register,
    {
      submit,
      hydrate,
    },
  ];
}

export default useForm;
