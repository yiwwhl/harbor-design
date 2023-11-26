import { AnyFunction, AnyObject } from ".";
export interface ObjectParserRoot {
    data: AnyObject;
    index?: number;
    updater: AnyFunction;
}
