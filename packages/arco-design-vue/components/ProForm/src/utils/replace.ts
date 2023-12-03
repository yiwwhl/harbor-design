export function replaceUndefinedInString(data: string, replaceTo: string) {
  return data.replace(/undefined/g, replaceTo);
}
