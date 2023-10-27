import type { FieldRule, FormInstance } from "@arco-design/web-vue";
import { VNode } from "vue";

export type FormModel = Record<PropertyKey, any>;

export type SchemaItemType = "item" | "group" | "list";

export interface GroupTypeSchemaItem {
  type: "group";
  label: string;
  children: Array<ItemTypeSchemaItem>;
}

export interface ItemTypeSchemaItem {
  type?: "item";
  rules?: Array<FieldRule>;
  defaultValue?: any;
  field: string;
  label: string;
  component: any;
}

export interface GroupTypeSchemaItem {
  type: "group";
  label: string;
  children: Array<ItemTypeSchemaItem>;
}

export interface ListTypeSchemaItem {
  type: "list";
  field: string;
  label: string;
  children: Array<ItemTypeSchemaItem>;
}

export type RenderSchema<T> = (schema: T, model: FormModel) => VNode;

export type SchemaItem =
  | ItemTypeSchemaItem
  | GroupTypeSchemaItem
  | ListTypeSchemaItem;

export type Schemas = Array<SchemaItem>;

export interface UseFormProps {
  schemas: Schemas;
}

export type Register = {
  model: FormModel;
  readonly immutableModel: FormModel;
  schemas: Schemas;
};

export type RegisterInstance = {
  formRef: FormInstance;
};

export type FormRegister = (registerInstance: RegisterInstance) => Register;

export type UseForm = [
  register: FormRegister,
  {
    submit: () => Promise<FormModel>;
  }
];
