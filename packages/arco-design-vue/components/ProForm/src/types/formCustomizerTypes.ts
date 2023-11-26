import { AnyObject, DomType } from "./index";

export type SchemaType = "item" | "list" | "group";

export type FieldRule<T = any> = {
  type?:
    | "string"
    | "number"
    | "boolean"
    | "array"
    | "object"
    | "email"
    | "url"
    | "ip";
  required?: boolean;
  message?: string;
  length?: number;
  maxLength?: number;
  minLength?: number;
  match?: RegExp;
  uppercase?: boolean;
  lowercase?: boolean;
  min?: number;
  max?: number;
  equal?: number;
  positive?: boolean;
  negative?: boolean;
  true?: boolean;
  false?: boolean;
  includes?: any[];
  deepEqual?: any;
  empty?: boolean;
  hasKeys?: string[];
  validator?: (
    value: T | undefined,
    callback: (error?: string) => void
  ) => void;
};

export interface ItemSchema {
  type?: "item";
  rules?: FieldRule[];
  show?: boolean;
  required?: boolean;
  placeholder?: string;
  label: string;
  field: string;
  component: DomType;
  componentProps?: AnyObject;
  defaultValue?: PropertyKey | object;
}

export interface GroupSchema {
  type: "group";
  label: string;
  children: ProxyedSchema[];
}

export interface ListSchema {
  type: "list";
  field: string;
  label: string;
  children: ProxyedSchema[];
}

export type Schema = ItemSchema | GroupSchema | ListSchema;

export interface runtimeMeta {
  model: AnyObject;
}

export type ProFormProxyRule<T> =
  | T
  | ((runtimeMeta: runtimeMeta) => T)
  | ((runtimeMeta: runtimeMeta) => Promise<T>);

export type ProFormProxy<T> = {
  [K in keyof T]: ProFormProxyRule<T[K]>;
};

export type ProxyedSchema = ProFormProxy<ItemSchema | GroupSchema | ListSchema>;

export interface FormCustomization {
  schemas: ProxyedSchema[];
}
