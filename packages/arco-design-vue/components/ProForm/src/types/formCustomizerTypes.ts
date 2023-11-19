import { AnyObject, DomType } from "./index";

export type SchemaType = "item" | "list" | "group";

export interface ItemSchema {
  type?: "item";
  label: string;
  field: string;
  component: DomType;
  componentProps?: AnyObject;
  defaultValue?: any;
}

export interface GroupSchema {
  type: "group";
  label: string;
  children: ItemSchema[];
}

export interface ListSchema {
  type: "list";
  field: string;
  label: string;
  children: ItemSchema[];
}

export type Schema = ItemSchema | GroupSchema | ListSchema;

export type ProFormProxyRule<T> =
  | T
  | ((...args: any) => T)
  | ((...args: any) => Promise<T>);

export type ProFormProxy<T> = {
  [K in keyof T]: ProFormProxyRule<T[K]>;
};

export type ProxyedSchema = ProFormProxy<ItemSchema | GroupSchema | ListSchema>;

export interface FormCustomization {
  schemas: ProxyedSchema[];
}
