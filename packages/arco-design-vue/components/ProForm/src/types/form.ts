import type { FieldRule, FormInstance } from "@arco-design/web-vue";
import { VNode } from "vue";

export type FormModel = Record<PropertyKey, any>;

export type SchemaItemType = "item" | "group" | "list";

export interface GroupTypeSchemaItem {
  type: "group";
  label: string;
  children: Array<ItemTypeSchemaItem>;
}

export type Proxyed<T> =
  | ((...args: any) => Promise<T>)
  | ((...args: any) => T)
  | T;

export interface ItemTypeSchemaItem {
  type?: "item";
  rules?: Proxyed<Array<FieldRule>>;
  field: Proxyed<string>;
  label: Proxyed<any>;
  component: Proxyed<any>;
  defaultValue?: Proxyed<any>;
  componentProps?: Proxyed<Record<string, any>>;
  cachedComponentProps?: Proxyed<Record<string, any>>;
  // 一些常见的简化用户操作的配置项
  required?: Proxyed<boolean>;
  placeholder?: Proxyed<string>;
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

export interface FormUtils {
  submit: () => Promise<FormModel>;
  hydrate: (data: any) => void;
}

export type UseForm = [register: FormRegister, formUtils: FormUtils];
