import { GroupSchema, ItemSchema, ListSchema } from "../types";
export default class IS {
  private static typeChecker(data: any) {
    return {}.toString.call(data);
  }

  static isArray(data: any): data is any[] {
    return this.typeChecker(data) === "[object Array]";
  }

  static isFunction(data: any): data is (...args: any) => any {
    return (
      this.typeChecker(data).includes("Function") ||
      (typeof data === "string" &&
        data.includes("() {" || data.includes("() =>")))
    );
  }

  static isAsyncFunction(data: any): data is (...args: any) => Promise<any> {
    let valid = false;
    if (this.typeChecker(data) === "[object AsyncFunction]") {
      valid = true;
    }
    return valid;
  }

  static isUndefined(data: any): data is undefined {
    return data === undefined;
  }

  static isArrayEmpty(data: any[]) {
    return data?.length < 1;
  }

  static isObjectEmpty(data: Record<PropertyKey, any>) {
    return this.isArrayEmpty(Object.keys(data));
  }

  static isListSchema(data: any): data is ListSchema {
    return data.type === "list";
  }

  static isGroupSchema(data: any): data is GroupSchema {
    return data.type === "group";
  }

  static isItemSchema(data: any): data is ItemSchema {
    return this.isUndefined(data.type) || data.type === "item";
  }
}
