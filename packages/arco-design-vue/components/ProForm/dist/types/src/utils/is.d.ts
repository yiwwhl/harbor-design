import { GroupSchema, ItemSchema, ListSchema } from "../types";
export default class IS {
    private static typeChecker;
    static isArray(data: any): data is any[];
    static isFunction(data: any): data is (...args: any) => any;
    static isAsyncFunction(data: any): data is (...args: any) => Promise<any>;
    static isUndefined(data: any): data is undefined;
    static isArrayEmpty(data: any[]): boolean;
    static isObjectEmpty(data: Record<PropertyKey, any>): boolean;
    static isListSchema(data: any): data is ListSchema;
    static isGroupSchema(data: any): data is GroupSchema;
    static isItemSchema(data: any): data is ItemSchema;
}
