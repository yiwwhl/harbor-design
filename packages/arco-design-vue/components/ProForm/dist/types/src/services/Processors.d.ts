import { Ref } from "vue";
import { AnyObject, Schema, ItemSchema, ProxyedSchema, AnyFunction } from "../types";
import { Effect } from "../services";
export default class Processors {
    processedSchemas: Ref<Schema[]>;
    processedModel: Ref<AnyObject>;
    rawSchemas: ProxyedSchema[];
    rawModel: AnyObject;
    schemaPreset: Record<keyof ItemSchema, any>;
    componentPropsPreset: AnyObject;
    uniqueEffectMap: any;
    schemaEffect: Effect;
    modelEffect: Effect;
    stopWatchEffect: Effect;
    constructor(processedSchemas: Ref<Schema[]>, processedModel: Ref<AnyObject>);
    schemaAnalyzer(schemas: ProxyedSchema[], baseSchema?: Schema[], baseRawSchema?: ProxyedSchema[], parentField?: string, schemaIndex?: number): void;
    schemaProcessor(schema: ProxyedSchema, index: number, setter: AnyFunction, schemaIndex?: number, parentField?: string): void;
    replaceFunctionsWithUndefined(obj: AnyObject): AnyObject;
    runtimeMeta(): {
        model: AnyObject;
    };
    propsProcessor<T extends object = any>(pendingProcess: T, preset: Record<keyof T, any>, processed: AnyObject, update: AnyFunction, schemaIndexOrChildrenIndex: number, schemaIndex?: number, parentField?: string): void;
    modelProcessor(schema: ProxyedSchema, baseModel?: AnyObject): void;
}
