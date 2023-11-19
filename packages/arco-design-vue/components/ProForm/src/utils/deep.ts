export function deepAssign(
  target: Record<PropertyKey, any>,
  ...sources: any[]
) {
  sources.forEach((source: any) => {
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        if (typeof source[key] === "object" && source[key] !== null) {
          target[key] = target[key] || {};
          deepAssign(target[key], source[key]);
        } else {
          target[key] = source[key];
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
      for (let [key, val] of value) {
        copy.set(clone(key), clone(val));
      }
      return copy;
    }
    if (value instanceof Set) {
      const copy = new Set();
      for (let val of value) {
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
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        copy[key] = clone(value[key]);
      }
    }

    return copy;
  }

  return clone(source);
}
