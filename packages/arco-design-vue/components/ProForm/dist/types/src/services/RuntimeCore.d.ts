import { Ref } from "vue";
import { Setup, Schema, AnyObject, ItemSchema, GroupSchema, ListSchema, ProcessorBySchemaType } from "../types";
import Processor from "./Processor";
export default class RuntimeCore {
    setup: Setup;
    processor: Processor;
    schemas: Ref<Schema[]>;
    model: Ref<AnyObject>;
    processorBySchemaType: ProcessorBySchemaType;
    formRef: Ref<AnyObject>;
    constructor(setup: Setup);
    getRuntimeMeta(): {
        model: AnyObject;
    };
    runtimeItemProcessor(schema: ItemSchema, index?: number, baseModel?: AnyObject, parentSchema?: ListSchema): JSX.Element | undefined;
    runtimeGroupProcessor(schema: GroupSchema): JSX.Element;
    addListItem(schema: AnyObject): Promise<never> | undefined;
    deleteListItem(schema: AnyObject, index: number): void;
    runtimeListProcessor(schema: ListSchema): JSX.Element;
    runtimeProcessor(schemas: Schema[]): any[];
    exec(): JSX.Element;
}
