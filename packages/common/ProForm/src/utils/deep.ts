export function deepAssign(
	target: Record<PropertyKey, any>,
	...sources: any[]
) {
	sources.forEach((source) => {
		if (Array.isArray(source)) {
			// 直接用 source 数组替换 target 数组，不进行合并
			target = [...source];
		} else {
			for (const key in source) {
				if (source.hasOwnProperty(key) && source[key] !== undefined) {
					if (
						typeof source[key] === "object" &&
						source[key] !== null &&
						!(source[key] instanceof Date) &&
						!(source[key] instanceof RegExp)
					) {
						// 当源属性是数组时，直接使用源数组替代目标数组
						if (Array.isArray(source[key])) {
							target[key] = [...source[key]];
						} else {
							// 深度合并对象
							target[key] = deepAssign(target[key] || {}, source[key]);
						}
					} else {
						// 对于非对象，直接覆盖目标属性
						target[key] = source[key];
					}
				}
			}
		}
	});
	return target;
}

export function deepClone<T>(source: T): T {
	const visited = new WeakMap();

	function clone(value: any): any {
		if (value === null || typeof value !== "object") {
			return value;
		}

		if (value instanceof Date) {
			return new Date(value);
		}

		if (value instanceof RegExp) {
			return new RegExp(value);
		}

		if (value instanceof Map) {
			const copy = new Map();
			for (const [key, val] of value) {
				copy.set(clone(key), clone(val));
			}
			return copy;
		}
		if (value instanceof Set) {
			const copy = new Set();
			for (const val of value) {
				copy.add(clone(val));
			}
			return copy;
		}

		if (visited.has(value)) {
			return visited.get(value);
		}

		if (Array.isArray(value)) {
			const copy: any[] = [];
			visited.set(value, copy);
			for (let i = 0; i < value.length; i++) {
				copy[i] = clone(value[i]);
			}
			return copy;
		}

		const copy = Object.create(Object.getPrototypeOf(value));
		visited.set(value, copy);
		for (const key in value) {
			if (value.hasOwnProperty(key)) {
				copy[key] = clone(value[key]);
			}
		}

		return copy;
	}

	return clone(source);
}
