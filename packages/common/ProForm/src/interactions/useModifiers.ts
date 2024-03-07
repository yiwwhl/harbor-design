import { AnyObject, RuntimeMeta } from "../types";

type Modifier = "native" | "structured_path_parsing_mark";

type FunctionNative = (
	args: {
		rawArgs: any[];
	} & RuntimeMeta,
) => any;

// TODO: 目前先只支持穿单个的 modifier 后续随着需求更新，为了避免后续更新填坑，先提前将 markNativeFunction 暴露出来

export function useModifiers(
	functionNative: FunctionNative,
	modifier: Modifier,
) {
	if (modifier === "native") {
		Object.defineProperty(functionNative, "name", {
			value: `__proform_raw_${functionNative.name}`,
			writable: true,
		});
	}
	if (modifier === "structured_path_parsing_mark") {
		Object.defineProperty(functionNative, "name", {
			value: `__proform_structured_path_parsing_mark_${functionNative.name}`,
			writable: true,
		});
	}
	return functionNative;
}

export function markNativeFunction(functionNative: FunctionNative) {
	return useModifiers(functionNative, "native");
}

export function markNativeObject(objectNative: AnyObject) {
	objectNative.__proform_raw_object = true;
	return objectNative;
}

export function markStructuredPathParsing(stringNative: string) {
	function getNativeString() {
		return stringNative;
	}
	return useModifiers(
		getNativeString,
		"structured_path_parsing_mark",
	) as unknown as string;
}
