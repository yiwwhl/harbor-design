import { GroupSchema, ItemSchema, ListSchema } from "./index";
export interface ProcessorBySchemaType {
    item: (schema: ItemSchema) => any;
    group: (schema: GroupSchema) => any;
    list: (schema: ListSchema) => any;
}
