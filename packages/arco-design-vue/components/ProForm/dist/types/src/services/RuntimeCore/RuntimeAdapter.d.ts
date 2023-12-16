import { AnyObject } from "../../types";
export default class RuntimeAdpter {
	ui: string;
	constructor(ui: string);
	getRuntimeField(runtimeArgs: AnyObject): any;
	getRuntimeRequired(runtimeArgs: AnyObject): any;
	getFormModelPropName(): any;
	formComponentRenderer(runtimeArgs: AnyObject): any;
	clearValidate(runtimeArgs: AnyObject): any;
}
