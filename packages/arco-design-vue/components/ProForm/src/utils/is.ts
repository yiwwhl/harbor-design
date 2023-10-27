export function typeChecker(data: any) {
  return {}.toString.call(data);
}

export function isArray(data: any): data is any[] {
  return typeChecker(data) === "[object Array]";
}

export function isFunction(data: any): data is (...args: any) => any {
  return typeChecker(data).includes("Function");
}

export function isAsyncFunction(
  data: any
): data is (...args: any) => Promise<any> {
  let valid = false;
  if (typeChecker(data) === "[object AsyncFunction]") {
    valid = true;
  }
  return valid;
}

export function isUndefined(data: any): data is undefined {
  return data === undefined;
}

export function isArrayEmpty(data: any[]) {
  return data.length < 1;
}

export function isObjectEmpty(data: Record<PropertyKey, any>) {
  return isArrayEmpty(Object.keys(data));
}
