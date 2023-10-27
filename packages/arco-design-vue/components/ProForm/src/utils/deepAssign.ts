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
