import { AnyObject, RuntimeMeta } from "../types";
type Modifier = "native";
type FunctionNative = (args: {
    rawArgs: any[];
} & RuntimeMeta) => any;
export declare function useModifiers(functionNative: FunctionNative, modifier: Modifier): FunctionNative;
export declare function markNativeFunction(functionNative: FunctionNative): FunctionNative;
export declare function markNativeObject(objectNative: AnyObject): AnyObject;
export {};
