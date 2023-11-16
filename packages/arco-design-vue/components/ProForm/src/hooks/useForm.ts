import { reactive } from "vue";
import { deepClone, deepAssign, isArray, isArrayEmpty } from "../utils";
import {
  UseFormProps,
  UseForm,
  RegisterInstance,
  FormModel,
  Schemas,
  GroupTypeSchemaItem,
  ListTypeSchemaItem,
} from "../types/form";
import { handleAsyncOrSync } from "../services";
import { presetProcess } from "../services";

function useForm(props: UseFormProps): UseForm {
  const clonedSchemas = deepClone(props.schemas);
  const registerInstance = reactive({}) as RegisterInstance;
  const initialModel = reactive({});
  const { mutableModel, immutableModel, proxyedSchemas } = setupModelAndSchemas(
    clonedSchemas,
    initialModel,
    {}
  );

  function schemaPreprocessor(schema: any, model: any, immutable: any) {
    let processingProgress = 0;
    let newSchema = reactive({
      raw: {},
    }) as any;
    const keys = Object.keys(schema);
    for (let i = 0; i < keys.length; i++) {
      handleAsyncOrSync(
        schema[keys[i]],
        (val, raw) => {
          Object.assign(newSchema, {
            [keys[i]]: val,
          });
          if (keys[i] === "defaultValue") {
            if (isArray(immutable)) {
              if (isArrayEmpty(immutable)) {
                immutable.push({});
              }
              immutable[0][(schema as ListTypeSchemaItem).field] = val;
            } else {
              immutable[(schema as any).field] = val;
            }
            if (isArray(model)) {
              if (isArrayEmpty(model)) {
                model.push({});
              }
              model[0][(schema as ListTypeSchemaItem).field] = val;
            } else {
              model[(schema as any).field] = val;
            }
          }
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
    model: FormModel,
    immutable: FormModel
  ): {
    mutableModel: FormModel;
    immutableModel: FormModel;
    proxyedSchemas: Schemas;
  } {
    const proxyedSchemas = schemas.map((schema) => {
      schema = schemaPreprocessor(schema, model, immutable) as any;
      if (schema.type === "group") {
        const { proxyedSchemas: newGroupSchemas } = setupModelAndSchemas(
          (schema as GroupTypeSchemaItem).children,
          model,
          immutable
        );
        Object.assign(schema.children, newGroupSchemas);
      } else if (schema.type === "list") {
        model[schema.field] = [];
        immutable[schema.field] = [];
        const { proxyedSchemas: newListSchemas } = setupModelAndSchemas(
          (schema as ListTypeSchemaItem).children,
          model[schema.field],
          immutable[schema.field]
        );
        Object.assign(schema.children, newListSchemas);
      }
      return schema;
    });

    return {
      proxyedSchemas,
      mutableModel: model,
      immutableModel: immutable,
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
