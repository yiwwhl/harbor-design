import { isFunction } from "../utils";

// any = anyFn | anyPromiseFn | any
export function handleAsyncOrSync(asyncOrSync: any, setter: (res: any) => any) {
  if (isFunction(asyncOrSync)) {
    const fnResult = asyncOrSync();
    if (fnResult instanceof Promise) {
      fnResult.then((res) => {
        setter(res);
      });
    } else {
      setter(asyncOrSync());
    }
  } else {
    setter(asyncOrSync);
  }
}
