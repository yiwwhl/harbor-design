import { reactive, watchEffect } from "vue";
import { deepClone, deepAssign, isArray, isArrayEmpty } from "../utils";
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
import { handleAsyncOrSync } from "../services";
import { presetProcess } from "../services";

function useForm(props: UseFormProps): UseForm {
  const clonedSchemas = deepClone(props.schemas);
  const registerInstance = reactive({}) as RegisterInstance;
  const initialModel = reactive({});
  const { mutableModel, immutableModel, proxyedSchemas } = setupModelAndSchemas(
    clonedSchemas,
    initialModel
  );

  function schemaPreprocessor(schema: any) {
    let processingProgress = 0;
    let newSchema = reactive({
      raw: {},
    }) as any;
    console.log("process");
    const keys = Object.keys(schema);
    for (let i = 0; i < keys.length; i++) {
      handleAsyncOrSync(
        schema[keys[i]],
        (val, raw) => {
          Object.assign(newSchema, {
            [keys[i]]: val,
          });
          raw &&
            Object.assign(newSchema, {
              raw: {
                ...newSchema.raw,
                [keys[i]]: raw,
              },
            });
          if (processingProgress === keys.length - 1) {
            presetProcess(newSchema);
          } else {
            processingProgress++;
          }
        },
        {
          model: initialModel,
        }
      );
    }
    return newSchema;
  }

  // 在 setupModelAndSchemas 层，需要调用 handleAsyncOrSync 方法来处理默认值
  function setupModelAndSchemas(
    schemas: Schemas,
    model: FormModel
  ): {
    mutableModel: FormModel;
    immutableModel: FormModel;
    proxyedSchemas: Schemas;
  } {
    const proxyedSchemas = schemas.map((schema) => {
      schema = schemaPreprocessor(schema) as any;

      if (isArray(model)) {
        if (isArrayEmpty(model)) {
          model.push({});
        }
        watchEffect(() => {
          model[0][(schema as ListTypeSchemaItem).field] =
            (schema as ItemTypeSchemaItem).defaultValue ?? "";
        });
      } else if (schema.type === "group") {
        const { proxyedSchemas: newGroupSchemas } = setupModelAndSchemas(
          (schema as GroupTypeSchemaItem).children,
          model
        );
        Object.assign(schema.children, newGroupSchemas);
      } else if (schema.type === "list") {
        model[schema.field] = [];
        const { proxyedSchemas: newListSchemas } = setupModelAndSchemas(
          (schema as ListTypeSchemaItem).children,
          model[schema.field]
        );
        Object.assign(schema.children, newListSchemas);
      } else {
        model[(schema as any).field] = schema.defaultValue ?? "";
      }
      return schema;
    });

    return {
      proxyedSchemas,
      mutableModel: model,
      immutableModel: deepClone(model),
    };
  }

  function register(_registerInstance: RegisterInstance) {
    Object.assign(registerInstance, _registerInstance);

    return {
      model: Object.assign(mutableModel),
      immutableModel,
      schemas: proxyedSchemas,
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

  function hydrate(data: any) {
    handleAsyncOrSync(data, (res) => {
      Object.keys(res).forEach((field) => {
        if (mutableModel[field].length < res[field].length) {
          while (res[field].length - mutableModel[field].length > 0) {
            mutableModel[field].push(deepClone(immutableModel[field][0]));
          }
        }
      });
      deepAssign(mutableModel, res);
    });
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
