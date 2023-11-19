import { DomType } from "./index";

export type ProFormProxy<T> =
  | T
  | ((...args: any) => T)
  | ((...args: any) => Promise<T>);

export type SchemaType = "item" | "list" | "group";

export type Schema = {
  type?: SchemaType;
  label: string;
  field: string;
  component: DomType;
  defaultValue: any;
};

export type ProxyedSchema = {
  [K in keyof Schema]: ProFormProxy<Schema[K]>;
};

export interface FormCustomization {
  schemas: ProxyedSchema[];
}
