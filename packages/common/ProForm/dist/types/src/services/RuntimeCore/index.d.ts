import { Ref } from "vue";
import { Setup, Schema, AnyObject, ItemSchema, GroupSchema, ListSchema, ProcessorBySchemaType, Runtime, NativeCustomizationOptions } from "../../types";
import Processor from "../Processor";
import Effect from "../Effect";
import RuntimeAdpter from "./RuntimeAdapter";
export default class RuntimeCore {
    setup: Setup;
    processor: Processor;
    schemas: Ref<Schema[]>;
    model: Ref<AnyObject>;
    processorBySchemaType: ProcessorBySchemaType;
    formRef: Ref<AnyObject>;
    hydrateEffect: Effect;
    native: NativeCustomizationOptions;
    grid: {};
    runtime: Runtime;
    globalNativeFormOverride: {
        props: {
            Form: {};
            FormItem: {};
        };
        slots: {
            Form: {};
            FormItem: {};
        };
    };
    ui: string;
    runtimeAdapter: RuntimeAdpter;
    shared: AnyObject;
    shareHistory: Map<any, any>;
    constructor(setup: Setup);
    getRuntimeMeta(): {
        model: AnyObject;
        reactiveModel: AnyObject;
        shared: AnyObject;
        share: (data: AnyObject) => void;
    };
    runtimeItemProcessor(schema: ItemSchema, index?: number, baseModel?: AnyObject, parentSchema?: ListSchema): JSX.Element | undefined;
    runtimeGroupProcessor(schema: GroupSchema): JSX.Element;
    addListItem(schema: AnyObject): void;
    deleteListItem(schema: AnyObject, index: number): void;
    runtimeListProcessor(schema: ListSchema): JSX.Element;
    runtimeProcessor(schemas: Schema[]): any[];
    exec(): JSX.Element;
}
