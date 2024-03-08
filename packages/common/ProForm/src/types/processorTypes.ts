import { AnyFunction, AnyObject } from ".";

export interface ObjectParserRoot {
	data: AnyObject;
	index?: number; // schema index
	updater: AnyFunction;
	parentMeta?: AnyObject;
}
