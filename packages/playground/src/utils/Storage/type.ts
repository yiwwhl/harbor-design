export enum MODE {
  LOCAL = "localStorage",
  SESSION = "sessionStorage",
}

export type ParamsType = {
  KeyType: string;
  ValueType: any;
};

export type StorageFunctionType = (
  key?: ParamsType["KeyType"],
  value?: ParamsType["ValueType"]
) => any;

export type BaseStorageFunctionType = (mode: MODE) => StorageFunctionType;

export type StorageType = Record<string, any> | string;
