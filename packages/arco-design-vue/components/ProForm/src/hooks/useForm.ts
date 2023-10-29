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
  ItemTypeSchemaItem,
} from "../types/form";
import { handleAsyncOrSync } from "../services";

function useForm(props: UseFormProps): UseForm {
  const clonedSchemas = deepClone(props.schemas);
  const registerInstance = reactive({}) as RegisterInstance;
  const { mutableModel, immutableModel, proxyedSchemas } = setupModel(
    clonedSchemas,
    reactive({})
  );

  // 名字待优化，代码需要重构，目的是处理一些常用的配置项，如 required placeholder slot 等
  function presetProcess(schema: ItemTypeSchemaItem) {
    if (!schema.rules) {
      Object.assign(schema, {
        rules: [],
      });
    }
    // required
    if (schema.required) {
      (schema.rules as any).unshift({
        required: true,
        message: `${schema.label}为必填项`,
      });
    }
    // placeholder
    if (!schema.placeholder) {
      Object.assign(schema, {
        // 待重构，需要不同的组件有一个映射，同时映射可以做到映射和配置关联，配置中会有默认的 placeholder prefix 获取函数，后续会在此处执行，根据
        // 不同的配置具体情况来更灵活的控制默认提示
        placeholder: `请输入${schema.label}`,
      });
    }
  }

  function schemaPreprocessor(schema: any) {
    let processingProgress = 0;
    let newSchema = reactive({}) as any;
    const keys = Object.keys(schema);
    for (let i = 0; i < keys.length; i++) {
      handleAsyncOrSync(schema[keys[i]], (val) => {
        Object.assign(newSchema, {
          [keys[i]]: val,
        });
        if (processingProgress === keys.length - 1) {
          presetProcess(newSchema);
        } else {
          processingProgress++;
        }
      });
    }
    return newSchema;
  }

  function setupModel(
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
        model[0][(schema as ListTypeSchemaItem).field] =
          (schema as ItemTypeSchemaItem).defaultValue ?? "";
      } else if (schema.type === "group") {
        const { proxyedSchemas: newGroupSchemas } = setupModel(
          (schema as GroupTypeSchemaItem).children,
          model
        );
        Object.assign(schema.children, newGroupSchemas);
      } else if (schema.type === "list") {
        model[schema.field] = [];
        const { proxyedSchemas: newListSchemas } = setupModel(
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
  /* The `isFunction` function is used to check if a value is a function or not. It returns
`true` if the value is a function, and `false` otherwise. */

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
