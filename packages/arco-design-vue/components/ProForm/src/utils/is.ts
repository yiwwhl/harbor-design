export default class IS {
  private static typeChecker(data: any) {
    return {}.toString.call(data);
  }

  static isArray(data: any): data is any[] {
    return this.typeChecker(data) === "[object Array]";
  }

  static isFunction(data: any): data is (...args: any) => any {
    return this.typeChecker(data).includes("Function");
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
}
