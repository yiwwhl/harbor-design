import { runtimeMeta } from "../types";
type Modifier = "raw";
export declare function useModifiers(functionRaw: (args: {
    rawArgs: any[];
} & runtimeMeta) => any, modifier: Modifier): (args: {
    rawArgs: any[];
} & runtimeMeta) => any;
export {};
