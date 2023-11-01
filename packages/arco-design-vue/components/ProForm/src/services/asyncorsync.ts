import { isFunction } from "../utils";
import { AsyncOrSyncHandleMetadata } from "../types/form";

// any = anyFn | anyPromiseFn | any
export function handleAsyncOrSync(
  asyncOrSync: any,
  setter: (res: any, asyncOrSync?: any) => any,
  metadata?: AsyncOrSyncHandleMetadata
) {
  if (isFunction(asyncOrSync)) {
    const fnResult = asyncOrSync(metadata);
    if (fnResult instanceof Promise) {
      fnResult.then((res) => {
        setter(res, asyncOrSync);
      });
    } else {
      setter(fnResult, asyncOrSync);
    }
  } else {
    setter(asyncOrSync);
  }
}
