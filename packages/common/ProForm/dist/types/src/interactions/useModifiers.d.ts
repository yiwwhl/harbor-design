import { AnyFunction, AnyObject, RuntimeMeta } from "../types";
type Modifier = "native" | "structured_path_parsing_mark" | "onetime";
type FunctionNative = (args: {
    rawArgs: any[];
} & RuntimeMeta) => any;
export declare function useModifiers(functionNative: FunctionNative, modifier: Modifier): FunctionNative;
export declare function markNativeFunction(functionNative: FunctionNative): FunctionNative;
export declare function markNativeObject(objectNative: AnyObject): AnyObject;
export declare function markOnetimeFunction(functionNative: FunctionNative): AnyFunction;
export declare function markStructuredPathParsing(stringNative: string): string;
export {};
