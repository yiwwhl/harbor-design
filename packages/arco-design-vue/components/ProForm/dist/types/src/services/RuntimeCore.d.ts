import { Ref } from "vue";
import { Setup, Schema, FormCustomization, AnyObject, ItemSchema, GroupSchema, ListSchema, ProcessorBySchemaType } from "../types";
import Processors from "./Processors";
export default class RuntimeCore {
    setup: Setup;
    processors: Processors;
    schemas: Ref<Schema[]>;
    model: Ref<AnyObject>;
    processorBySchemaType: ProcessorBySchemaType;
    formRef: Ref<AnyObject>;
    constructor(setup: Setup);
    analyze(formCustomization: FormCustomization): void;
    runtimeItemProcessor(schema: ItemSchema, index?: number, baseModel?: AnyObject, parentSchema?: ListSchema): JSX.Element;
    runtimeGroupProcessor(schema: GroupSchema): JSX.Element;
    addListItem(schema: AnyObject): Promise<never> | undefined;
    deleteListItem(schema: AnyObject, index: number): void;
    runtimeListProcessor(schema: ListSchema): JSX.Element;
    runtimeProcessor(schemas: Schema[]): any[];
    exec(): JSX.Element;
}
