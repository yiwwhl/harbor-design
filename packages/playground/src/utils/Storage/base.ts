import { isObject, isUndefined, merge } from "lodash";
import { BaseStorageFunctionType, MODE, ParamsType, StorageType } from "./type";

// support node
const window = globalThis as any;

function stringify(value: StorageType): string {
  return JSON.stringify(value);
}

function parse(value: any): StorageType {
  return JSON.parse(value);
}

function getExistingValue(key: ParamsType["KeyType"] | undefined, mode: MODE) {
  if (checkKey(key)) return;
  return parse(window[mode].getItem(key)!);
}

function checkKey(key: any): key is undefined {
  return isUndefined(key);
}

export const setItem: BaseStorageFunctionType = (mode) => {
  return (key, value) => {
    if (checkKey(key)) return;
    const existingValue = getExistingValue(key, mode);
    if (!existingValue) {
      window[mode].setItem(key, stringify(value));
    } else {
      window[mode].setItem(key, stringify(merge(existingValue, value)));
    }
  };
};
export const getItem: BaseStorageFunctionType = (mode) => {
  return (key) => {
    if (checkKey(key)) return;
    return parse(window[mode].getItem(key));
  };
};
export const removeItem: BaseStorageFunctionType = (mode) => {
  return (key) => {
    if (checkKey(key)) return;
    let existingValue = getExistingValue(key, mode);
    if (!existingValue) {
      return;
    } else {
      if (isObject(existingValue)) {
        delete (existingValue as any)[key];
      } else {
        existingValue = "";
      }
      window[mode].setItem(key, stringify(existingValue));
    }
  };
};
export const clearAllItems: BaseStorageFunctionType = (mode) => {
  return () => {
    window[mode].clear();
  };
};
