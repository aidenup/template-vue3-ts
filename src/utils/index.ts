import { mergeWith } from "lodash-es";
import { isObject } from "./is";

/**
 * 递归合并两个对象。
 *
 * @param source 要合并的源对象。
 * @param target 目标对象，合并后结果存放于此。
 * @returns 合并后的对象。
 */
export function deepMerge<
  T extends object | null | undefined,
  U extends object | null | undefined
>(source: T, target: U): T & U {
  if (!target) {
    return source as T & U;
  }
  if (!source) {
    return target as T & U;
  }
  return mergeWith({}, source, target, (sourceValue, targetValue) => {
    if (isObject(targetValue) && isObject(sourceValue)) {
      return deepMerge(sourceValue, targetValue);
    }
    return undefined;
  });
}
