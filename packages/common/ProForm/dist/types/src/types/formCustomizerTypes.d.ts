import { Ref } from "vue";
import { AnyObject, DomType, UIName } from "./index";
export type SchemaType = "item" | "list" | "group";
export type FieldRule<T = any> = {
    type?: "string" | "number" | "boolean" | "array" | "object" | "email" | "url" | "ip";
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
    validator?: (value: T | undefined, callback: (error?: string) => void) => void;
};
interface GridStyle {
    gridTemplateColumns?: string;
    gridTemplateRows?: string;
    gridTemplateAreas?: string;
    gridTemplate?: string;
    gridColumnGap?: string;
    gridRowGap?: string;
    gridGap?: string;
    justifyItems?: string;
    alignItems?: string;
    placeItems?: string;
    justifyContent?: string;
    alignContent?: string;
    placeContent?: string;
    gridAutoColumns?: string;
    gridAutoRows?: string;
    gridAutoFlow?: string;
    gridColumnStart?: string;
    gridColumnEnd?: string;
    gridRowStart?: string;
    gridRowEnd?: string;
    gridColumn?: string;
    gridRow?: string;
    gridArea?: string;
    justifySelf?: string;
    alignSelf?: string;
    placeSelf?: string;
    [key: string]: any;
}
type Primitive = string | number | boolean | null | undefined | symbol | bigint;
type AnyLike = Primitive | Function | object | {};
export interface ItemSchema {
    type?: "item";
    rules?: FieldRule[];
    show?: boolean;
    required?: boolean;
    placeholder?: string;
    runtime?: Runtime;
    native?: NativeCustomizationOptions;
    grid?: GridStyle;
    label?: string;
    field: string;
    component: DomType;
    componentProps?: Record<string, ProFormProxyRule<AnyLike>>;
    componentSlots?: AnyObject;
    defaultValue?: PropertyKey | object;
}
export interface GroupSchema {
    type: "group";
    label?: string;
    children: ProxyedSchema[];
    grid?: GridStyle;
    show?: boolean;
}
export interface ListSchema {
    type: "list";
    field: string;
    label?: string;
    children: ProxyedSchema[];
    grid?: GridStyle;
    runtime?: Runtime;
    show?: boolean;
}
export type Schema = ItemSchema | GroupSchema | ListSchema;
export interface RuntimeMeta {
    model: AnyObject;
    reactiveModel: AnyObject;
    shared: AnyObject;
    share: (data: AnyObject) => any;
}
export type ProFormProxyRule<T> = T | ((runtimeMeta: RuntimeMeta) => T) | ((runtimeMeta: RuntimeMeta) => Promise<T>);
export type ProFormProxy<T> = {
    [K in keyof T]: ProFormProxyRule<T[K]>;
};
export type ProxyedSchema = ProFormProxy<ItemSchema | GroupSchema | ListSchema>;
export interface Runtime {
    customizeListItemLabel?: (rawLabel: string, rawIndex: number) => any;
}
export interface FormCustomization {
    ui?: UIName;
    grid?: GridStyle;
    native?: NativeCustomizationOptions;
    runtime?: Runtime;
    schemas: Ref<ProxyedSchema[]> | ProxyedSchema[];
}
export type NativeCustomizationOptions = {
    props?: {
        Form?: AnyObject;
        FormItem?: AnyObject;
    };
    slots?: {
        Form?: AnyObject;
        FormItem?: AnyObject;
    };
};
export {};
