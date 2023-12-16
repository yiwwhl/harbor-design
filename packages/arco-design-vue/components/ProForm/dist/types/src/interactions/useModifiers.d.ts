import { runtimeMeta } from "../types";
type Modifier = "native";
type FunctionNative = (
	args: {
		rawArgs: any[];
	} & runtimeMeta,
) => any;
export declare function useModifiers(
	functionNative: FunctionNative,
	modifier: Modifier,
): FunctionNative;
export declare function markNativeFunction(
	functionNative: FunctionNative,
): FunctionNative;
export {};
