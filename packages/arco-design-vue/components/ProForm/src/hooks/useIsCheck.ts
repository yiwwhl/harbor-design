export function useIsCheck() {
  function typeChecker(data: any) {
    return {}.toString.call(data);
  }

  function isArray(data: any): data is any[] {
    return typeChecker(data) === "[object Array]";
  }

  function isFunction(data: any): data is (...args: any) => any {
    return typeChecker(data).includes("Function");
  }

  function isAsyncFunction(data: any): data is (...args: any) => Promise<any> {
    let valid = false;
    if (typeChecker(data) === "[object AsyncFunction]") {
      valid = true;
    }
    return valid;
  }

  function isUndefined(data: any): data is undefined {
    return data === undefined;
  }

  function isArrayEmpty(data: any[]) {
    return data.length < 1;
  }

  function isObjectEmpty(data: Record<PropertyKey, any>) {
    return isArrayEmpty(Object.keys(data));
  }

  return {
    isArray,
    isFunction,
    isAsyncFunction,
    isUndefined,
    isArrayEmpty,
    isObjectEmpty,
  };
}
