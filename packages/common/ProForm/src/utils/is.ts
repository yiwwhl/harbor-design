import { AnyObject, GroupSchema, ItemSchema, ListSchema } from "../types";
export default class IS {
	private static typeChecker(data: any) {
		return {}.toString.call(data);
	}

	static isString(data: any): data is string {
		return typeof data === "string";
	}

	static isArray(data: any): data is any[] {
		return this.typeChecker(data) === "[object Array]";
	}

	static isFunction(data: any): data is (...args: any) => any {
		return this.typeChecker(data) === "[object Function]";
	}

	static isPromise(data: any): data is Promise<any> {
		return data instanceof Promise;
	}

	static isObject(data: any): data is AnyObject {
		return this.typeChecker(data) === "[object Object]";
	}

	static isAsyncFunction(data: any): data is (...args: any) => Promise<any> {
		return this.typeChecker(data) === "[object AsyncFunction]";
	}

	static isUndefined(data: any): data is undefined {
		return data === undefined;
	}

	static isNull(data: any): data is null {
		return data === null;
	}

	static isArrayEmpty(data: any[]) {
		return data?.length < 1;
	}

	static isObjectEmpty(data: Record<PropertyKey, any>) {
		return this.isArrayEmpty(Object.keys(data));
	}

	static isListSchema(data: any): data is ListSchema {
		return data.type === "list";
	}

	static isGroupSchema(data: any): data is GroupSchema {
		return data.type === "group";
	}

	static isItemSchema(data: any): data is ItemSchema {
		return this.isUndefined(data.type) || data.type === "item";
	}

	static isProcessInprogress(data: any): boolean {
		if (data === undefined) {
			return true;
		}
		if (this.isObject(data)) {
			// 对组件关闭检查
			if (data.setup || this.isFunction(data.setup) || data.props) {
				return false;
			}
			if (this.isObjectEmpty(data)) {
				return true;
			}
			if (data.__proform_raw_object) {
				return false;
			}
			for (const key in data) {
				// 绕过对 componentProps 的检测，避免因为 componentProps 中的一些配置阻塞了默认值的计算
				if (key === "componentProps") {
					return false;
				}
				if (data.hasOwnProperty(key)) {
					if (this.isProcessInprogress(data[key])) {
						return true;
					}
				}
			}
		} else if (this.isArray(data)) {
			if (this.isArrayEmpty(data)) {
				return true;
			}
			for (const item of data) {
				return this.isProcessInprogress(item);
			}
		}

		return false;
	}

	static isNativeObject(object: AnyObject): boolean {
		return !!object.__proform_raw_object;
	}
}
