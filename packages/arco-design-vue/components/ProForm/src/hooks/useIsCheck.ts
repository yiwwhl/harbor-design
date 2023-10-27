export function useIsCheck() {
  function typeChecker(data: any) {
    return {}.toString.call(data);
  }

  function isUndefined(data: any): data is undefined {
    return data === undefined;
  }

  function isArray(data: any): data is any[] {
    return typeChecker(data).includes(`Array`);
  }

  function isArrayEmpty(data: any[]) {
    return data.length < 1;
  }

  function isObjectEmpty(data: Record<PropertyKey, any>) {
    return isArrayEmpty(Object.keys(data));
  }

  return {
    isUndefined,
    isArray,
    isArrayEmpty,
    isObjectEmpty,
  };
}
