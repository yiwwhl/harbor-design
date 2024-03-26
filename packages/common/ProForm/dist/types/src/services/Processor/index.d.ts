import { Ref } from "vue";
import { AnyObject, Schema, ProxyedSchema, AnyFunction, ObjectParserRoot } from "../../types";
import { RuntimeCore } from "..";
import Effect from "../Effect";
/**
 * 基本描述
 * 对于函数的命名，如果是动词相关，代表对过程的处理，如果是名词，代表一个处理器
 */
export default class Processor {
    runtimeCore: RuntimeCore;
    processedSchemas: Ref<AnyObject[]>;
    processedModel: Ref<AnyObject>;
    getRuntimeMeta: AnyFunction;
    stableSchemas: ProxyedSchema[];
    stableModel: AnyObject;
    schemaPreset: AnyObject;
    componentPropsPreset: AnyObject;
    stableUpdaterProcessProgress: boolean[];
    stableUpdaterTimes: number;
    schemaEffect: Effect;
    defaultValueEffect: Effect;
    defaultValueInprogressMap: Map<any, any>;
    baseDefaultValueFunctionsLength: number;
    isModelInitialized: boolean;
    schemaEffectHistory: Map<any, any>;
    constructor(runtimeCore: RuntimeCore);
    parse<T extends object = any>(data: T[], parentMeta?: AnyObject): void;
    initSchemas(schemas: AnyObject[]): AnyObject[];
    countFunctionDefaultValues(input: AnyObject): number;
    parseSchemas(schemas: ProxyedSchema[], parentMeta?: AnyObject): void;
    parseStable(stable: AnyObject): AnyObject;
    stableUpdater(parseProcess?: boolean[]): void;
    parseItem(data: AnyObject, index: number, parentMeta?: AnyObject): void;
    objectParser(root: ObjectParserRoot): void;
    promiseFieldParser(rootField: any, updater: AnyFunction, deepProcess: boolean, meta: AnyObject): void;
    fieldParser(rootField: any, updater: AnyFunction, meta: AnyObject, deepProcess?: boolean): void;
    modelProcessor(schemas: Schema[]): void;
    setModel(baseModel: AnyObject, field: string, value: any): void;
    createModel(schema: AnyObject, baseModel: AnyObject): void;
}
