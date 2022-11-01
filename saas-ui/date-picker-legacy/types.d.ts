declare type ObjectKeys<T> = T extends object
  ? (keyof T)[]
  : T extends number
  ? []
  : T extends Array<any> | string
  ? string[]
  : never

declare interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>
  entries<T extends { [key: string]: any }, K extends keyof T>(
    o: T,
  ): [keyof T, T[K]][]
}
