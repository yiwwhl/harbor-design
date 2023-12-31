/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare type AnyObject = Record<PropertyKey, any>;
declare type AnyFunction = (...args: any) => any;
declare type AnyPromiseFn<T = any> = (...args: any) => Promise<T>;
