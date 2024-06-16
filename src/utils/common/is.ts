const toString = Object.prototype.toString

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined'
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val)
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isWhitespace(val: string): boolean {
  return val === ''
}

export function isObject(val: any): val is Record<any, any> {
  return !isNull(val) && is(val, 'Object')
}

export function isArray(val: any): val is any[] {
  return val && Array.isArray(val)
}

export function isString(val: unknown): val is string {
  return is(val, 'String')
}

export function isNumber(val: number): val is number {
  return is(val, 'Number')
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean')
}

export function isDate(val: unknown): val is Date {
  return is(val, 'Date')
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp')
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isElement(val: unknown): val is Element {
  return isObject(val) && !!val.tagName
}

export function isWindow(val: any): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window')
}

export function isNullOrUndef(val: unknown): val is null | undefined {
  return isNull(val) || isUnDef(val)
}

export function isNullOrWhitespace(val: string | null | undefined): boolean {
  return isNullOrUndef(val) || (typeof val === 'string' && isWhitespace(val))
}

/** 空数组 | 空字符串 | 空对象 | 空Map | 空Set */
export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val))
    return val.length === 0

  if (val instanceof Map || val instanceof Set)
    return val.size === 0

  if (isObject(val))
    return Object.keys(val).length === 0

  return false
}

export function ifNull(val: any, def: any = '') {
  return isNullOrWhitespace(val) ? def : val
}

export function isUrl(path: string) {
  const reg
    = /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-]*)?\??[-+=&;%@.\w]*(?:#\w*)?)?)$/
  return reg.test(path)
}

export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export const isServer = typeof window === 'undefined'

export const isClient = !isServer

// 支持数字也支持字符串数字
export function isNumberOrDecimal(val: string | number) {
  return /^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(String(val))
}

// 手机号规则
export function isMobile(val: string) {
  return /^1[3-9]\d{9}$/.test(val)
}

// 身份证规则
export function isIDNumber(val: string) {
  return /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|1\d|2\d|3[01])\d{3}(\d|X)$/.test(val)
}

// 是否是中文字
export function isChinese(val: string) {
  return /[\u4E00-\u9FA5]+/.test(val)
}
