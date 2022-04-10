import { isPlainObject, PlainObject } from './isPlainObject';
import { isArray } from './isArray';

export function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}
