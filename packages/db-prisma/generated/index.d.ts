/**
 * Client
 **/

import * as runtime from './runtime/library'
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions

export type PrismaPromise<T> = $Public.PrismaPromise<T>

export type UserPayload<
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
> = {
  name: 'User'
  objects: {
    organizations: OrganizationPayload<ExtArgs>[]
    OrganizationMember: OrganizationMemberPayload<ExtArgs>[]
    Activity: ActivityPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<
    {
      id: string
      email: string
      firstName: string | null
      lastName: string | null
      name: string | null
      status: string | null
      avatar: string | null
      createdAt: Date
      updatedAt: Date
    },
    ExtArgs['result']['user']
  >
  composites: {}
}

/**
 * Model User
 *
 */
export type User = runtime.Types.DefaultSelection<UserPayload>
export type OrganizationPayload<
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
> = {
  name: 'Organization'
  objects: {
    members: OrganizationMemberPayload<ExtArgs>[]
    User: UserPayload<ExtArgs> | null
    Subscription: SubscriptionPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<
    {
      id: string
      name: string
      slug: string
      plan: string | null
      email: string | null
      logo: string | null
      createdAt: Date
      updatedAt: Date
      userId: string | null
    },
    ExtArgs['result']['organization']
  >
  composites: {}
}

/**
 * Model Organization
 *
 */
export type Organization = runtime.Types.DefaultSelection<OrganizationPayload>
export type OrganizationMemberPayload<
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
> = {
  name: 'OrganizationMember'
  objects: {
    user: UserPayload<ExtArgs>
    organization: OrganizationPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<
    {
      id: string
      userId: string
      organizationId: string
      roles: Role[]
    },
    ExtArgs['result']['organizationMember']
  >
  composites: {}
}

/**
 * Model OrganizationMember
 *
 */
export type OrganizationMember =
  runtime.Types.DefaultSelection<OrganizationMemberPayload>
export type SubscriptionPayload<
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
> = {
  name: 'Subscription'
  objects: {
    organization: OrganizationPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<
    {
      id: string
      organizationId: string
      plan: string
      status: SubscriptionStatus
      startedAt: Date | null
      trialEndsAt: Date | null
      createdAt: Date
      updatedAt: Date
    },
    ExtArgs['result']['subscription']
  >
  composites: {}
}

/**
 * Model Subscription
 *
 */
export type Subscription = runtime.Types.DefaultSelection<SubscriptionPayload>
export type ContactPayload<
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
> = {
  name: 'Contact'
  objects: {}
  scalars: $Extensions.GetResult<
    {
      id: string
      email: string
      firstName: string | null
      lastName: string | null
      name: string | null
      status: string | null
      type: string | null
      tags: string[]
      createdAt: Date
      updatedAt: Date
    },
    ExtArgs['result']['contact']
  >
  composites: {}
}

/**
 * Model Contact
 *
 */
export type Contact = runtime.Types.DefaultSelection<ContactPayload>
export type ActivityPayload<
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
> = {
  name: 'Activity'
  objects: {
    user: UserPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<
    {
      id: string
      userId: string
      type: ActivityType
      data: string
      date: Date
      createdAt: Date
      updatedAt: Date
    },
    ExtArgs['result']['activity']
  >
  composites: {}
}

/**
 * Model Activity
 *
 */
export type Activity = runtime.Types.DefaultSelection<ActivityPayload>

/**
 * Enums
 */

export const Role: {
  owner: 'owner'
  admin: 'admin'
  member: 'member'
}

export type Role = (typeof Role)[keyof typeof Role]

export const SubscriptionStatus: {
  active: 'active'
  trialing: 'trialing'
  past_due: 'past_due'
  paused: 'paused'
  canceled: 'canceled'
}

export type SubscriptionStatus =
  (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus]

export const ActivityType: {
  action: 'action'
  update: 'update'
  comment: 'comment'
}

export type ActivityType = (typeof ActivityType)[keyof typeof ActivityType]

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T
    ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<T['log']>
      : never
    : never,
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg?: Prisma.Subset<T, Prisma.PrismaClientOptions>)
  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent,
    ) => void,
  ): void

  /**
   * Connect with the database
   */
  $connect(): Promise<void>

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
  ): Promise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(
    fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => Promise<R>,
    options?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    },
  ): Promise<R>

  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs>

  /**
   * `prisma.organization`: Exposes CRUD operations for the **Organization** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Organizations
   * const organizations = await prisma.organization.findMany()
   * ```
   */
  get organization(): Prisma.OrganizationDelegate<ExtArgs>

  /**
   * `prisma.organizationMember`: Exposes CRUD operations for the **OrganizationMember** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more OrganizationMembers
   * const organizationMembers = await prisma.organizationMember.findMany()
   * ```
   */
  get organizationMember(): Prisma.OrganizationMemberDelegate<ExtArgs>

  /**
   * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Subscriptions
   * const subscriptions = await prisma.subscription.findMany()
   * ```
   */
  get subscription(): Prisma.SubscriptionDelegate<ExtArgs>

  /**
   * `prisma.contact`: Exposes CRUD operations for the **Contact** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Contacts
   * const contacts = await prisma.contact.findMany()
   * ```
   */
  get contact(): Prisma.ContactDelegate<ExtArgs>

  /**
   * `prisma.activity`: Exposes CRUD operations for the **Activity** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Activities
   * const activities = await prisma.activity.findMany()
   * ```
   */
  get activity(): Prisma.ActivityDelegate<ExtArgs>
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
   * Extensions
   */
  export type Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export type Args<T, F extends $Public.Operation> = $Public.Args<T, F>
  export type Payload<T, F extends $Public.Operation> = $Public.Payload<T, F>
  export type Result<T, A, F extends $Public.Operation> = $Public.Result<
    T,
    A,
    F
  >
  export type Exact<T, W> = $Public.Exact<T, W>

  /**
   * Prisma Client JS version: 5.0.0
   * Query Engine version: 6b0aef69b7cdfc787f822ecd7cdc76d5f1991584
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from.
   */
  export type JsonObject = { [Key in string]?: JsonValue }

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue =
    | string
    | number
    | boolean
    | JsonObject
    | JsonArray
    | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {
    readonly [Key in string]?: InputJsonValue | null
  }

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray
    extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue =
    | string
    | number
    | boolean
    | InputJsonObject
    | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<
    infer U
  >
    ? U
    : T

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> =
    PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P]
  }

  export type Enumerable<T> = T | Array<T>

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  }

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } & K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
    ? False
    : T extends Date
    ? False
    : T extends Uint8Array
    ? False
    : T extends BigInt
    ? False
    : T extends object
    ? True
    : False

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K]
  } & {}

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>
      }
    >
  >

  type Key = string | number | symbol
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never
  type AtStrict<O extends object, K extends Key> = O[K & keyof O]
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = {
    1: AtStrict<O, K>
    0: AtLoose<O, K>
  }[strict]

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K]
      } & {}

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K]
  } & {}

  type _Record<K extends keyof any, T> = {
    [P in K]: T
  }

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? K : never]-?: O[P] } & O)
      : never
  >

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B

  export const type: unique symbol

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never
      }
    : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>,
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T,
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>

  export const ModelName: {
    User: 'User'
    Organization: 'Organization'
    OrganizationMember: 'OrganizationMember'
    Subscription: 'Subscription'
    Contact: 'Contact'
    Activity: 'Activity'
  }

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]

  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb
    extends $Utils.Fn<
      { extArgs: $Extensions.Args },
      $Utils.Record<string, any>
    > {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    meta: {
      modelProps:
        | 'user'
        | 'organization'
        | 'organizationMember'
        | 'subscription'
        | 'contact'
        | 'activity'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Organization: {
        payload: OrganizationPayload<ExtArgs>
        fields: Prisma.OrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<OrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<OrganizationPayload>
          }
          findFirst: {
            args: Prisma.OrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<OrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<OrganizationPayload>
          }
          findMany: {
            args: Prisma.OrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<OrganizationPayload>[]
          }
          create: {
            args: Prisma.OrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<OrganizationPayload>
          }
          createMany: {
            args: Prisma.OrganizationCreateManyArgs<ExtArgs>
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.OrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<OrganizationPayload>
          }
          update: {
            args: Prisma.OrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<OrganizationPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationDeleteManyArgs<ExtArgs>
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationUpdateManyArgs<ExtArgs>
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.OrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<OrganizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.OrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationCountArgs<ExtArgs>
            result:
              | $Utils.Optional<OrganizationCountAggregateOutputType>
              | number
          }
        }
      }
      OrganizationMember: {
        payload: OrganizationMemberPayload<ExtArgs>
        fields: Prisma.OrganizationMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<OrganizationMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<OrganizationMemberPayload>
          }
          findFirst: {
            args: Prisma.OrganizationMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<OrganizationMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<OrganizationMemberPayload>
          }
          findMany: {
            args: Prisma.OrganizationMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<OrganizationMemberPayload>[]
          }
          create: {
            args: Prisma.OrganizationMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<OrganizationMemberPayload>
          }
          createMany: {
            args: Prisma.OrganizationMemberCreateManyArgs<ExtArgs>
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.OrganizationMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<OrganizationMemberPayload>
          }
          update: {
            args: Prisma.OrganizationMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<OrganizationMemberPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationMemberDeleteManyArgs<ExtArgs>
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationMemberUpdateManyArgs<ExtArgs>
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.OrganizationMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<OrganizationMemberPayload>
          }
          aggregate: {
            args: Prisma.OrganizationMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganizationMember>
          }
          groupBy: {
            args: Prisma.OrganizationMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationMemberCountArgs<ExtArgs>
            result:
              | $Utils.Optional<OrganizationMemberCountAggregateOutputType>
              | number
          }
        }
      }
      Subscription: {
        payload: SubscriptionPayload<ExtArgs>
        fields: Prisma.SubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<SubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<SubscriptionPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<SubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<SubscriptionPayload>
          }
          findMany: {
            args: Prisma.SubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<SubscriptionPayload>[]
          }
          create: {
            args: Prisma.SubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<SubscriptionPayload>
          }
          createMany: {
            args: Prisma.SubscriptionCreateManyArgs<ExtArgs>
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.SubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<SubscriptionPayload>
          }
          update: {
            args: Prisma.SubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<SubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionDeleteManyArgs<ExtArgs>
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionUpdateManyArgs<ExtArgs>
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.SubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<SubscriptionPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscription>
          }
          groupBy: {
            args: Prisma.SubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionCountArgs<ExtArgs>
            result:
              | $Utils.Optional<SubscriptionCountAggregateOutputType>
              | number
          }
        }
      }
      Contact: {
        payload: ContactPayload<ExtArgs>
        fields: Prisma.ContactFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<ContactPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<ContactPayload>
          }
          findFirst: {
            args: Prisma.ContactFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<ContactPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<ContactPayload>
          }
          findMany: {
            args: Prisma.ContactFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<ContactPayload>[]
          }
          create: {
            args: Prisma.ContactCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<ContactPayload>
          }
          createMany: {
            args: Prisma.ContactCreateManyArgs<ExtArgs>
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ContactDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<ContactPayload>
          }
          update: {
            args: Prisma.ContactUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<ContactPayload>
          }
          deleteMany: {
            args: Prisma.ContactDeleteManyArgs<ExtArgs>
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ContactUpdateManyArgs<ExtArgs>
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ContactUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<ContactPayload>
          }
          aggregate: {
            args: Prisma.ContactAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContact>
          }
          groupBy: {
            args: Prisma.ContactGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactCountArgs<ExtArgs>
            result: $Utils.Optional<ContactCountAggregateOutputType> | number
          }
        }
      }
      Activity: {
        payload: ActivityPayload<ExtArgs>
        fields: Prisma.ActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<ActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<ActivityPayload>
          }
          findFirst: {
            args: Prisma.ActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<ActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<ActivityPayload>
          }
          findMany: {
            args: Prisma.ActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<ActivityPayload>[]
          }
          create: {
            args: Prisma.ActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<ActivityPayload>
          }
          createMany: {
            args: Prisma.ActivityCreateManyArgs<ExtArgs>
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<ActivityPayload>
          }
          update: {
            args: Prisma.ActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<ActivityPayload>
          }
          deleteMany: {
            args: Prisma.ActivityDeleteManyArgs<ExtArgs>
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityUpdateManyArgs<ExtArgs>
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<ActivityPayload>
          }
          aggregate: {
            args: Prisma.ActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivity>
          }
          groupBy: {
            args: Prisma.ActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]]
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]]
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]]
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]]
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> =
    T extends LogDefinition
      ? T['emit'] extends 'event'
        ? T['level']
        : never
      : never
  export type GetEvents<T extends any> = T extends Array<
    LogLevel | LogDefinition
  >
    ? GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>,
  ): LogLevel | undefined

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */

  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    organizations: number
    OrganizationMember: number
    Activity: number
  }

  export type UserCountOutputTypeSelect<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    organizations?: boolean | UserCountOutputTypeCountOrganizationsArgs
    OrganizationMember?:
      | boolean
      | UserCountOutputTypeCountOrganizationMemberArgs
    Activity?: boolean | UserCountOutputTypeCountActivityArgs
  }

  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrganizationsArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: OrganizationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrganizationMemberArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: OrganizationMemberWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActivityArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: ActivityWhereInput
  }

  /**
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    members: number
    Subscription: number
  }

  export type OrganizationCountOutputTypeSelect<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    members?: boolean | OrganizationCountOutputTypeCountMembersArgs
    Subscription?: boolean | OrganizationCountOutputTypeCountSubscriptionArgs
  }

  // Custom InputTypes

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountMembersArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: OrganizationMemberWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountSubscriptionArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: SubscriptionWhereInput
  }

  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
    name: string | null
    status: string | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
    name: string | null
    status: string | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    firstName: number
    lastName: number
    name: number
    status: number
    avatar: number
    createdAt: number
    updatedAt: number
    _all: number
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    name?: true
    status?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    name?: true
    status?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    name?: true
    status?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }

  export type UserGroupByArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: UserWhereInput
    orderBy?:
      | UserOrderByWithAggregationInput
      | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    firstName: string | null
    lastName: string | null
    name: string | null
    status: string | null
    avatar: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>
      }
    >
  >

  export type UserSelect<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean
      email?: boolean
      firstName?: boolean
      lastName?: boolean
      name?: boolean
      status?: boolean
      avatar?: boolean
      createdAt?: boolean
      updatedAt?: boolean
      organizations?: boolean | User$organizationsArgs<ExtArgs>
      OrganizationMember?: boolean | User$OrganizationMemberArgs<ExtArgs>
      Activity?: boolean | User$ActivityArgs<ExtArgs>
      _count?: boolean | UserCountOutputTypeArgs<ExtArgs>
    },
    ExtArgs['result']['user']
  >

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    name?: boolean
    status?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    organizations?: boolean | User$organizationsArgs<ExtArgs>
    OrganizationMember?: boolean | User$OrganizationMemberArgs<ExtArgs>
    Activity?: boolean | User$ActivityArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeArgs<ExtArgs>
  }

  type UserGetPayload<S extends boolean | null | undefined | UserArgs> =
    $Types.GetResult<UserPayload, S>

  type UserCountArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = Omit<UserFindManyArgs, 'select' | 'include'> & {
    select?: UserCountAggregateInputType | true
  }

  export interface UserDelegate<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['User']
      meta: { name: 'User' }
    }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<T extends UserFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Types.GetResult<UserPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<T extends UserFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Types.GetResult<UserPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Types.GetResult<UserPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends UserFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Types.GetResult<UserPayload<ExtArgs>, T, 'findMany'>
    >

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     **/
    create<T extends UserCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Types.GetResult<UserPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends UserCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     **/
    delete<T extends UserDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Types.GetResult<UserPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends UserUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Types.GetResult<UserPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends UserDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends UserUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     **/
    upsert<T extends UserUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Types.GetResult<UserPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>,
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [
                  Error,
                  'Field ',
                  P,
                  ` in "having" needs to be provided in "by"`,
                ]
          }[HavingFields]
        : 'take' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
          }[OrderFields],
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetUserGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > implements Prisma.PrismaPromise<T>
  {
    private readonly _dmmf
    private readonly _queryType
    private readonly _rootField
    private readonly _clientMethod
    private readonly _args
    private readonly _dataPath
    private readonly _errorFormat
    private readonly _measurePerformance?
    private _isList
    private _callsite
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise'
    constructor(
      _dmmf: runtime.DMMFClass,
      _queryType: 'query' | 'mutation',
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean,
    )

    organizations<T extends User$organizationsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$organizationsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Types.GetResult<OrganizationPayload<ExtArgs>, T, 'findMany'> | Null
    >

    OrganizationMember<T extends User$OrganizationMemberArgs<ExtArgs> = {}>(
      args?: Subset<T, User$OrganizationMemberArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Types.GetResult<OrganizationMemberPayload<ExtArgs>, T, 'findMany'> | Null
    >

    Activity<T extends User$ActivityArgs<ExtArgs> = {}>(
      args?: Subset<T, User$ActivityArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Types.GetResult<ActivityPayload<ExtArgs>, T, 'findMany'> | Null
    >

    private get _document()
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): Promise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): Promise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>
  }

  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<'User', 'String'>
    readonly email: FieldRef<'User', 'String'>
    readonly firstName: FieldRef<'User', 'String'>
    readonly lastName: FieldRef<'User', 'String'>
    readonly name: FieldRef<'User', 'String'>
    readonly status: FieldRef<'User', 'String'>
    readonly avatar: FieldRef<'User', 'String'>
    readonly createdAt: FieldRef<'User', 'DateTime'>
    readonly updatedAt: FieldRef<'User', 'DateTime'>
  }

  // Custom InputTypes

  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.organizations
   */
  export type User$organizationsArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
    orderBy?:
      | OrganizationOrderByWithRelationInput
      | OrganizationOrderByWithRelationInput[]
    cursor?: OrganizationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * User.OrganizationMember
   */
  export type User$OrganizationMemberArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
    where?: OrganizationMemberWhereInput
    orderBy?:
      | OrganizationMemberOrderByWithRelationInput
      | OrganizationMemberOrderByWithRelationInput[]
    cursor?: OrganizationMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?:
      | OrganizationMemberScalarFieldEnum
      | OrganizationMemberScalarFieldEnum[]
  }

  /**
   * User.Activity
   */
  export type User$ActivityArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ActivityInclude<ExtArgs> | null
    where?: ActivityWhereInput
    orderBy?:
      | ActivityOrderByWithRelationInput
      | ActivityOrderByWithRelationInput[]
    cursor?: ActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
  }

  /**
   * Model Organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    plan: string | null
    email: string | null
    logo: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type OrganizationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    plan: string | null
    email: string | null
    logo: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type OrganizationCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    plan: number
    email: number
    logo: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }

  export type OrganizationMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    plan?: true
    email?: true
    logo?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type OrganizationMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    plan?: true
    email?: true
    logo?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type OrganizationCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    plan?: true
    email?: true
    logo?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Organization to aggregate.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Organizations to fetch.
     */
    orderBy?:
      | OrganizationOrderByWithRelationInput
      | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Organizations
     **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<
    T extends OrganizationAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }

  export type OrganizationGroupByArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: OrganizationWhereInput
    orderBy?:
      | OrganizationOrderByWithAggregationInput
      | OrganizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: OrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    id: string
    name: string
    slug: string
    plan: string | null
    email: string | null
    logo: string | null
    createdAt: Date
    updatedAt: Date
    userId: string | null
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<OrganizationGroupByOutputType, T['by']> & {
          [P in keyof T &
            keyof OrganizationGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >

  export type OrganizationSelect<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean
      name?: boolean
      slug?: boolean
      plan?: boolean
      email?: boolean
      logo?: boolean
      createdAt?: boolean
      updatedAt?: boolean
      userId?: boolean
      members?: boolean | Organization$membersArgs<ExtArgs>
      User?: boolean | Organization$UserArgs<ExtArgs>
      Subscription?: boolean | Organization$SubscriptionArgs<ExtArgs>
      _count?: boolean | OrganizationCountOutputTypeArgs<ExtArgs>
    },
    ExtArgs['result']['organization']
  >

  export type OrganizationSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    plan?: boolean
    email?: boolean
    logo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type OrganizationInclude<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    members?: boolean | Organization$membersArgs<ExtArgs>
    User?: boolean | Organization$UserArgs<ExtArgs>
    Subscription?: boolean | Organization$SubscriptionArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeArgs<ExtArgs>
  }

  type OrganizationGetPayload<
    S extends boolean | null | undefined | OrganizationArgs,
  > = $Types.GetResult<OrganizationPayload, S>

  type OrganizationCountArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = Omit<OrganizationFindManyArgs, 'select' | 'include'> & {
    select?: OrganizationCountAggregateInputType | true
  }

  export interface OrganizationDelegate<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Organization']
      meta: { name: 'Organization' }
    }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {OrganizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<T extends OrganizationFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>,
    ): Prisma__OrganizationClient<
      $Types.GetResult<OrganizationPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >

    /**
     * Find one Organization that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {OrganizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__OrganizationClient<
      $Types.GetResult<OrganizationPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<T extends OrganizationFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>,
    ): Prisma__OrganizationClient<
      $Types.GetResult<OrganizationPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__OrganizationClient<
      $Types.GetResult<OrganizationPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     *
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const organizationWithIdOnly = await prisma.organization.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends OrganizationFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Types.GetResult<OrganizationPayload<ExtArgs>, T, 'findMany'>
    >

    /**
     * Create a Organization.
     * @param {OrganizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     *
     **/
    create<T extends OrganizationCreateArgs<ExtArgs>>(
      args: SelectSubset<T, OrganizationCreateArgs<ExtArgs>>,
    ): Prisma__OrganizationClient<
      $Types.GetResult<OrganizationPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >

    /**
     * Create many Organizations.
     *     @param {OrganizationCreateManyArgs} args - Arguments to create many Organizations.
     *     @example
     *     // Create many Organizations
     *     const organization = await prisma.organization.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends OrganizationCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Organization.
     * @param {OrganizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     *
     **/
    delete<T extends OrganizationDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>,
    ): Prisma__OrganizationClient<
      $Types.GetResult<OrganizationPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >

    /**
     * Update one Organization.
     * @param {OrganizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends OrganizationUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>,
    ): Prisma__OrganizationClient<
      $Types.GetResult<OrganizationPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >

    /**
     * Delete zero or more Organizations.
     * @param {OrganizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends OrganizationDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends OrganizationUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Organization.
     * @param {OrganizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     **/
    upsert<T extends OrganizationUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>,
    ): Prisma__OrganizationClient<
      $Types.GetResult<OrganizationPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >

    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
     **/
    count<T extends OrganizationCountArgs>(
      args?: Subset<T, OrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends OrganizationAggregateArgs>(
      args: Subset<T, OrganizationAggregateArgs>,
    ): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends OrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [
                  Error,
                  'Field ',
                  P,
                  ` in "having" needs to be provided in "by"`,
                ]
          }[HavingFields]
        : 'take' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
          }[OrderFields],
    >(
      args: SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetOrganizationGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>
    /**
     * Fields of the Organization model
     */
    readonly fields: OrganizationFieldRefs
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__OrganizationClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > implements Prisma.PrismaPromise<T>
  {
    private readonly _dmmf
    private readonly _queryType
    private readonly _rootField
    private readonly _clientMethod
    private readonly _args
    private readonly _dataPath
    private readonly _errorFormat
    private readonly _measurePerformance?
    private _isList
    private _callsite
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise'
    constructor(
      _dmmf: runtime.DMMFClass,
      _queryType: 'query' | 'mutation',
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean,
    )

    members<T extends Organization$membersArgs<ExtArgs> = {}>(
      args?: Subset<T, Organization$membersArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Types.GetResult<OrganizationMemberPayload<ExtArgs>, T, 'findMany'> | Null
    >

    User<T extends Organization$UserArgs<ExtArgs> = {}>(
      args?: Subset<T, Organization$UserArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique'> | Null,
      never,
      ExtArgs
    >

    Subscription<T extends Organization$SubscriptionArgs<ExtArgs> = {}>(
      args?: Subset<T, Organization$SubscriptionArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Types.GetResult<SubscriptionPayload<ExtArgs>, T, 'findMany'> | Null
    >

    private get _document()
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): Promise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): Promise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>
  }

  /**
   * Fields of the Organization model
   */
  interface OrganizationFieldRefs {
    readonly id: FieldRef<'Organization', 'String'>
    readonly name: FieldRef<'Organization', 'String'>
    readonly slug: FieldRef<'Organization', 'String'>
    readonly plan: FieldRef<'Organization', 'String'>
    readonly email: FieldRef<'Organization', 'String'>
    readonly logo: FieldRef<'Organization', 'String'>
    readonly createdAt: FieldRef<'Organization', 'DateTime'>
    readonly updatedAt: FieldRef<'Organization', 'DateTime'>
    readonly userId: FieldRef<'Organization', 'String'>
  }

  // Custom InputTypes

  /**
   * Organization findUnique
   */
  export type OrganizationFindUniqueArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findUniqueOrThrow
   */
  export type OrganizationFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findFirst
   */
  export type OrganizationFindFirstArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Organizations to fetch.
     */
    orderBy?:
      | OrganizationOrderByWithRelationInput
      | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findFirstOrThrow
   */
  export type OrganizationFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Organizations to fetch.
     */
    orderBy?:
      | OrganizationOrderByWithRelationInput
      | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findMany
   */
  export type OrganizationFindManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organizations to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Organizations to fetch.
     */
    orderBy?:
      | OrganizationOrderByWithRelationInput
      | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Organizations.
     */
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization create
   */
  export type OrganizationCreateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a Organization.
     */
    data: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
  }

  /**
   * Organization createMany
   */
  export type OrganizationCreateManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization update
   */
  export type OrganizationUpdateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a Organization.
     */
    data: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
    /**
     * Choose, which Organization to update.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization updateMany
   */
  export type OrganizationUpdateManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Organizations.
     */
    data: XOR<
      OrganizationUpdateManyMutationInput,
      OrganizationUncheckedUpdateManyInput
    >
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
  }

  /**
   * Organization upsert
   */
  export type OrganizationUpsertArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the Organization to update in case it exists.
     */
    where: OrganizationWhereUniqueInput
    /**
     * In case the Organization found by the `where` argument doesn't exist, create a new Organization with this data.
     */
    create: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
    /**
     * In case the Organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
  }

  /**
   * Organization delete
   */
  export type OrganizationDeleteArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter which Organization to delete.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization deleteMany
   */
  export type OrganizationDeleteManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Organizations to delete
     */
    where?: OrganizationWhereInput
  }

  /**
   * Organization.members
   */
  export type Organization$membersArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
    where?: OrganizationMemberWhereInput
    orderBy?:
      | OrganizationMemberOrderByWithRelationInput
      | OrganizationMemberOrderByWithRelationInput[]
    cursor?: OrganizationMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?:
      | OrganizationMemberScalarFieldEnum
      | OrganizationMemberScalarFieldEnum[]
  }

  /**
   * Organization.User
   */
  export type Organization$UserArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Organization.Subscription
   */
  export type Organization$SubscriptionArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
    orderBy?:
      | SubscriptionOrderByWithRelationInput
      | SubscriptionOrderByWithRelationInput[]
    cursor?: SubscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Organization without action
   */
  export type OrganizationArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationInclude<ExtArgs> | null
  }

  /**
   * Model OrganizationMember
   */

  export type AggregateOrganizationMember = {
    _count: OrganizationMemberCountAggregateOutputType | null
    _min: OrganizationMemberMinAggregateOutputType | null
    _max: OrganizationMemberMaxAggregateOutputType | null
  }

  export type OrganizationMemberMinAggregateOutputType = {
    id: string | null
    userId: string | null
    organizationId: string | null
  }

  export type OrganizationMemberMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    organizationId: string | null
  }

  export type OrganizationMemberCountAggregateOutputType = {
    id: number
    userId: number
    organizationId: number
    roles: number
    _all: number
  }

  export type OrganizationMemberMinAggregateInputType = {
    id?: true
    userId?: true
    organizationId?: true
  }

  export type OrganizationMemberMaxAggregateInputType = {
    id?: true
    userId?: true
    organizationId?: true
  }

  export type OrganizationMemberCountAggregateInputType = {
    id?: true
    userId?: true
    organizationId?: true
    roles?: true
    _all?: true
  }

  export type OrganizationMemberAggregateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which OrganizationMember to aggregate.
     */
    where?: OrganizationMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrganizationMembers to fetch.
     */
    orderBy?:
      | OrganizationMemberOrderByWithRelationInput
      | OrganizationMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: OrganizationMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrganizationMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrganizationMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned OrganizationMembers
     **/
    _count?: true | OrganizationMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: OrganizationMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: OrganizationMemberMaxAggregateInputType
  }

  export type GetOrganizationMemberAggregateType<
    T extends OrganizationMemberAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateOrganizationMember]: P extends
      | '_count'
      | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganizationMember[P]>
      : GetScalarType<T[P], AggregateOrganizationMember[P]>
  }

  export type OrganizationMemberGroupByArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: OrganizationMemberWhereInput
    orderBy?:
      | OrganizationMemberOrderByWithAggregationInput
      | OrganizationMemberOrderByWithAggregationInput[]
    by: OrganizationMemberScalarFieldEnum[] | OrganizationMemberScalarFieldEnum
    having?: OrganizationMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationMemberCountAggregateInputType | true
    _min?: OrganizationMemberMinAggregateInputType
    _max?: OrganizationMemberMaxAggregateInputType
  }

  export type OrganizationMemberGroupByOutputType = {
    id: string
    userId: string
    organizationId: string
    roles: Role[]
    _count: OrganizationMemberCountAggregateOutputType | null
    _min: OrganizationMemberMinAggregateOutputType | null
    _max: OrganizationMemberMaxAggregateOutputType | null
  }

  type GetOrganizationMemberGroupByPayload<
    T extends OrganizationMemberGroupByArgs,
  > = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationMemberGroupByOutputType, T['by']> & {
        [P in keyof T &
          keyof OrganizationMemberGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], OrganizationMemberGroupByOutputType[P]>
          : GetScalarType<T[P], OrganizationMemberGroupByOutputType[P]>
      }
    >
  >

  export type OrganizationMemberSelect<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean
      userId?: boolean
      organizationId?: boolean
      roles?: boolean
      user?: boolean | UserArgs<ExtArgs>
      organization?: boolean | OrganizationArgs<ExtArgs>
    },
    ExtArgs['result']['organizationMember']
  >

  export type OrganizationMemberSelectScalar = {
    id?: boolean
    userId?: boolean
    organizationId?: boolean
    roles?: boolean
  }

  export type OrganizationMemberInclude<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserArgs<ExtArgs>
    organization?: boolean | OrganizationArgs<ExtArgs>
  }

  type OrganizationMemberGetPayload<
    S extends boolean | null | undefined | OrganizationMemberArgs,
  > = $Types.GetResult<OrganizationMemberPayload, S>

  type OrganizationMemberCountArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = Omit<OrganizationMemberFindManyArgs, 'select' | 'include'> & {
    select?: OrganizationMemberCountAggregateInputType | true
  }

  export interface OrganizationMemberDelegate<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['OrganizationMember']
      meta: { name: 'OrganizationMember' }
    }
    /**
     * Find zero or one OrganizationMember that matches the filter.
     * @param {OrganizationMemberFindUniqueArgs} args - Arguments to find a OrganizationMember
     * @example
     * // Get one OrganizationMember
     * const organizationMember = await prisma.organizationMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<T extends OrganizationMemberFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, OrganizationMemberFindUniqueArgs<ExtArgs>>,
    ): Prisma__OrganizationMemberClient<
      $Types.GetResult<
        OrganizationMemberPayload<ExtArgs>,
        T,
        'findUnique'
      > | null,
      null,
      ExtArgs
    >

    /**
     * Find one OrganizationMember that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {OrganizationMemberFindUniqueOrThrowArgs} args - Arguments to find a OrganizationMember
     * @example
     * // Get one OrganizationMember
     * const organizationMember = await prisma.organizationMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<
      T extends OrganizationMemberFindUniqueOrThrowArgs<ExtArgs>,
    >(
      args?: SelectSubset<T, OrganizationMemberFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__OrganizationMemberClient<
      $Types.GetResult<
        OrganizationMemberPayload<ExtArgs>,
        T,
        'findUniqueOrThrow'
      >,
      never,
      ExtArgs
    >

    /**
     * Find the first OrganizationMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationMemberFindFirstArgs} args - Arguments to find a OrganizationMember
     * @example
     * // Get one OrganizationMember
     * const organizationMember = await prisma.organizationMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<T extends OrganizationMemberFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, OrganizationMemberFindFirstArgs<ExtArgs>>,
    ): Prisma__OrganizationMemberClient<
      $Types.GetResult<
        OrganizationMemberPayload<ExtArgs>,
        T,
        'findFirst'
      > | null,
      null,
      ExtArgs
    >

    /**
     * Find the first OrganizationMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationMemberFindFirstOrThrowArgs} args - Arguments to find a OrganizationMember
     * @example
     * // Get one OrganizationMember
     * const organizationMember = await prisma.organizationMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends OrganizationMemberFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, OrganizationMemberFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__OrganizationMemberClient<
      $Types.GetResult<
        OrganizationMemberPayload<ExtArgs>,
        T,
        'findFirstOrThrow'
      >,
      never,
      ExtArgs
    >

    /**
     * Find zero or more OrganizationMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationMemberFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrganizationMembers
     * const organizationMembers = await prisma.organizationMember.findMany()
     *
     * // Get first 10 OrganizationMembers
     * const organizationMembers = await prisma.organizationMember.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const organizationMemberWithIdOnly = await prisma.organizationMember.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends OrganizationMemberFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OrganizationMemberFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Types.GetResult<OrganizationMemberPayload<ExtArgs>, T, 'findMany'>
    >

    /**
     * Create a OrganizationMember.
     * @param {OrganizationMemberCreateArgs} args - Arguments to create a OrganizationMember.
     * @example
     * // Create one OrganizationMember
     * const OrganizationMember = await prisma.organizationMember.create({
     *   data: {
     *     // ... data to create a OrganizationMember
     *   }
     * })
     *
     **/
    create<T extends OrganizationMemberCreateArgs<ExtArgs>>(
      args: SelectSubset<T, OrganizationMemberCreateArgs<ExtArgs>>,
    ): Prisma__OrganizationMemberClient<
      $Types.GetResult<OrganizationMemberPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >

    /**
     * Create many OrganizationMembers.
     *     @param {OrganizationMemberCreateManyArgs} args - Arguments to create many OrganizationMembers.
     *     @example
     *     // Create many OrganizationMembers
     *     const organizationMember = await prisma.organizationMember.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends OrganizationMemberCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OrganizationMemberCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OrganizationMember.
     * @param {OrganizationMemberDeleteArgs} args - Arguments to delete one OrganizationMember.
     * @example
     * // Delete one OrganizationMember
     * const OrganizationMember = await prisma.organizationMember.delete({
     *   where: {
     *     // ... filter to delete one OrganizationMember
     *   }
     * })
     *
     **/
    delete<T extends OrganizationMemberDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, OrganizationMemberDeleteArgs<ExtArgs>>,
    ): Prisma__OrganizationMemberClient<
      $Types.GetResult<OrganizationMemberPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >

    /**
     * Update one OrganizationMember.
     * @param {OrganizationMemberUpdateArgs} args - Arguments to update one OrganizationMember.
     * @example
     * // Update one OrganizationMember
     * const organizationMember = await prisma.organizationMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends OrganizationMemberUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, OrganizationMemberUpdateArgs<ExtArgs>>,
    ): Prisma__OrganizationMemberClient<
      $Types.GetResult<OrganizationMemberPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >

    /**
     * Delete zero or more OrganizationMembers.
     * @param {OrganizationMemberDeleteManyArgs} args - Arguments to filter OrganizationMembers to delete.
     * @example
     * // Delete a few OrganizationMembers
     * const { count } = await prisma.organizationMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends OrganizationMemberDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OrganizationMemberDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrganizationMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrganizationMembers
     * const organizationMember = await prisma.organizationMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends OrganizationMemberUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, OrganizationMemberUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OrganizationMember.
     * @param {OrganizationMemberUpsertArgs} args - Arguments to update or create a OrganizationMember.
     * @example
     * // Update or create a OrganizationMember
     * const organizationMember = await prisma.organizationMember.upsert({
     *   create: {
     *     // ... data to create a OrganizationMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrganizationMember we want to update
     *   }
     * })
     **/
    upsert<T extends OrganizationMemberUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, OrganizationMemberUpsertArgs<ExtArgs>>,
    ): Prisma__OrganizationMemberClient<
      $Types.GetResult<OrganizationMemberPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >

    /**
     * Count the number of OrganizationMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationMemberCountArgs} args - Arguments to filter OrganizationMembers to count.
     * @example
     * // Count the number of OrganizationMembers
     * const count = await prisma.organizationMember.count({
     *   where: {
     *     // ... the filter for the OrganizationMembers we want to count
     *   }
     * })
     **/
    count<T extends OrganizationMemberCountArgs>(
      args?: Subset<T, OrganizationMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<
              T['select'],
              OrganizationMemberCountAggregateOutputType
            >
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrganizationMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends OrganizationMemberAggregateArgs>(
      args: Subset<T, OrganizationMemberAggregateArgs>,
    ): Prisma.PrismaPromise<GetOrganizationMemberAggregateType<T>>

    /**
     * Group by OrganizationMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends OrganizationMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationMemberGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [
                  Error,
                  'Field ',
                  P,
                  ` in "having" needs to be provided in "by"`,
                ]
          }[HavingFields]
        : 'take' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
          }[OrderFields],
    >(
      args: SubsetIntersection<T, OrganizationMemberGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetOrganizationMemberGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>
    /**
     * Fields of the OrganizationMember model
     */
    readonly fields: OrganizationMemberFieldRefs
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrganizationMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__OrganizationMemberClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > implements Prisma.PrismaPromise<T>
  {
    private readonly _dmmf
    private readonly _queryType
    private readonly _rootField
    private readonly _clientMethod
    private readonly _args
    private readonly _dataPath
    private readonly _errorFormat
    private readonly _measurePerformance?
    private _isList
    private _callsite
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise'
    constructor(
      _dmmf: runtime.DMMFClass,
      _queryType: 'query' | 'mutation',
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean,
    )

    user<T extends UserArgs<ExtArgs> = {}>(
      args?: Subset<T, UserArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique'> | Null,
      never,
      ExtArgs
    >

    organization<T extends OrganizationArgs<ExtArgs> = {}>(
      args?: Subset<T, OrganizationArgs<ExtArgs>>,
    ): Prisma__OrganizationClient<
      $Types.GetResult<OrganizationPayload<ExtArgs>, T, 'findUnique'> | Null,
      never,
      ExtArgs
    >

    private get _document()
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): Promise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): Promise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>
  }

  /**
   * Fields of the OrganizationMember model
   */
  interface OrganizationMemberFieldRefs {
    readonly id: FieldRef<'OrganizationMember', 'String'>
    readonly userId: FieldRef<'OrganizationMember', 'String'>
    readonly organizationId: FieldRef<'OrganizationMember', 'String'>
    readonly roles: FieldRef<'OrganizationMember', 'Role[]'>
  }

  // Custom InputTypes

  /**
   * OrganizationMember findUnique
   */
  export type OrganizationMemberFindUniqueArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationMember to fetch.
     */
    where: OrganizationMemberWhereUniqueInput
  }

  /**
   * OrganizationMember findUniqueOrThrow
   */
  export type OrganizationMemberFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationMember to fetch.
     */
    where: OrganizationMemberWhereUniqueInput
  }

  /**
   * OrganizationMember findFirst
   */
  export type OrganizationMemberFindFirstArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationMember to fetch.
     */
    where?: OrganizationMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrganizationMembers to fetch.
     */
    orderBy?:
      | OrganizationMemberOrderByWithRelationInput
      | OrganizationMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OrganizationMembers.
     */
    cursor?: OrganizationMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrganizationMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrganizationMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrganizationMembers.
     */
    distinct?:
      | OrganizationMemberScalarFieldEnum
      | OrganizationMemberScalarFieldEnum[]
  }

  /**
   * OrganizationMember findFirstOrThrow
   */
  export type OrganizationMemberFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationMember to fetch.
     */
    where?: OrganizationMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrganizationMembers to fetch.
     */
    orderBy?:
      | OrganizationMemberOrderByWithRelationInput
      | OrganizationMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OrganizationMembers.
     */
    cursor?: OrganizationMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrganizationMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrganizationMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrganizationMembers.
     */
    distinct?:
      | OrganizationMemberScalarFieldEnum
      | OrganizationMemberScalarFieldEnum[]
  }

  /**
   * OrganizationMember findMany
   */
  export type OrganizationMemberFindManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationMembers to fetch.
     */
    where?: OrganizationMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrganizationMembers to fetch.
     */
    orderBy?:
      | OrganizationMemberOrderByWithRelationInput
      | OrganizationMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing OrganizationMembers.
     */
    cursor?: OrganizationMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrganizationMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrganizationMembers.
     */
    skip?: number
    distinct?:
      | OrganizationMemberScalarFieldEnum
      | OrganizationMemberScalarFieldEnum[]
  }

  /**
   * OrganizationMember create
   */
  export type OrganizationMemberCreateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a OrganizationMember.
     */
    data: XOR<
      OrganizationMemberCreateInput,
      OrganizationMemberUncheckedCreateInput
    >
  }

  /**
   * OrganizationMember createMany
   */
  export type OrganizationMemberCreateManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many OrganizationMembers.
     */
    data:
      | OrganizationMemberCreateManyInput
      | OrganizationMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrganizationMember update
   */
  export type OrganizationMemberUpdateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a OrganizationMember.
     */
    data: XOR<
      OrganizationMemberUpdateInput,
      OrganizationMemberUncheckedUpdateInput
    >
    /**
     * Choose, which OrganizationMember to update.
     */
    where: OrganizationMemberWhereUniqueInput
  }

  /**
   * OrganizationMember updateMany
   */
  export type OrganizationMemberUpdateManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update OrganizationMembers.
     */
    data: XOR<
      OrganizationMemberUpdateManyMutationInput,
      OrganizationMemberUncheckedUpdateManyInput
    >
    /**
     * Filter which OrganizationMembers to update
     */
    where?: OrganizationMemberWhereInput
  }

  /**
   * OrganizationMember upsert
   */
  export type OrganizationMemberUpsertArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the OrganizationMember to update in case it exists.
     */
    where: OrganizationMemberWhereUniqueInput
    /**
     * In case the OrganizationMember found by the `where` argument doesn't exist, create a new OrganizationMember with this data.
     */
    create: XOR<
      OrganizationMemberCreateInput,
      OrganizationMemberUncheckedCreateInput
    >
    /**
     * In case the OrganizationMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<
      OrganizationMemberUpdateInput,
      OrganizationMemberUncheckedUpdateInput
    >
  }

  /**
   * OrganizationMember delete
   */
  export type OrganizationMemberDeleteArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
    /**
     * Filter which OrganizationMember to delete.
     */
    where: OrganizationMemberWhereUniqueInput
  }

  /**
   * OrganizationMember deleteMany
   */
  export type OrganizationMemberDeleteManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which OrganizationMembers to delete
     */
    where?: OrganizationMemberWhereInput
  }

  /**
   * OrganizationMember without action
   */
  export type OrganizationMemberArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
  }

  /**
   * Model Subscription
   */

  export type AggregateSubscription = {
    _count: SubscriptionCountAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  export type SubscriptionMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    plan: string | null
    status: SubscriptionStatus | null
    startedAt: Date | null
    trialEndsAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    plan: string | null
    status: SubscriptionStatus | null
    startedAt: Date | null
    trialEndsAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionCountAggregateOutputType = {
    id: number
    organizationId: number
    plan: number
    status: number
    startedAt: number
    trialEndsAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }

  export type SubscriptionMinAggregateInputType = {
    id?: true
    organizationId?: true
    plan?: true
    status?: true
    startedAt?: true
    trialEndsAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionMaxAggregateInputType = {
    id?: true
    organizationId?: true
    plan?: true
    status?: true
    startedAt?: true
    trialEndsAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionCountAggregateInputType = {
    id?: true
    organizationId?: true
    plan?: true
    status?: true
    startedAt?: true
    trialEndsAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubscriptionAggregateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Subscription to aggregate.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?:
      | SubscriptionOrderByWithRelationInput
      | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Subscriptions
     **/
    _count?: true | SubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: SubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: SubscriptionMaxAggregateInputType
  }

  export type GetSubscriptionAggregateType<
    T extends SubscriptionAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscription[P]>
      : GetScalarType<T[P], AggregateSubscription[P]>
  }

  export type SubscriptionGroupByArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: SubscriptionWhereInput
    orderBy?:
      | SubscriptionOrderByWithAggregationInput
      | SubscriptionOrderByWithAggregationInput[]
    by: SubscriptionScalarFieldEnum[] | SubscriptionScalarFieldEnum
    having?: SubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionCountAggregateInputType | true
    _min?: SubscriptionMinAggregateInputType
    _max?: SubscriptionMaxAggregateInputType
  }

  export type SubscriptionGroupByOutputType = {
    id: string
    organizationId: string
    plan: string
    status: SubscriptionStatus
    startedAt: Date | null
    trialEndsAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: SubscriptionCountAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  type GetSubscriptionGroupByPayload<T extends SubscriptionGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<SubscriptionGroupByOutputType, T['by']> & {
          [P in keyof T &
            keyof SubscriptionGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
        }
      >
    >

  export type SubscriptionSelect<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean
      organizationId?: boolean
      plan?: boolean
      status?: boolean
      startedAt?: boolean
      trialEndsAt?: boolean
      createdAt?: boolean
      updatedAt?: boolean
      organization?: boolean | OrganizationArgs<ExtArgs>
    },
    ExtArgs['result']['subscription']
  >

  export type SubscriptionSelectScalar = {
    id?: boolean
    organizationId?: boolean
    plan?: boolean
    status?: boolean
    startedAt?: boolean
    trialEndsAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubscriptionInclude<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    organization?: boolean | OrganizationArgs<ExtArgs>
  }

  type SubscriptionGetPayload<
    S extends boolean | null | undefined | SubscriptionArgs,
  > = $Types.GetResult<SubscriptionPayload, S>

  type SubscriptionCountArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = Omit<SubscriptionFindManyArgs, 'select' | 'include'> & {
    select?: SubscriptionCountAggregateInputType | true
  }

  export interface SubscriptionDelegate<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Subscription']
      meta: { name: 'Subscription' }
    }
    /**
     * Find zero or one Subscription that matches the filter.
     * @param {SubscriptionFindUniqueArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<T extends SubscriptionFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, SubscriptionFindUniqueArgs<ExtArgs>>,
    ): Prisma__SubscriptionClient<
      $Types.GetResult<SubscriptionPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >

    /**
     * Find one Subscription that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {SubscriptionFindUniqueOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends SubscriptionFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SubscriptionFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__SubscriptionClient<
      $Types.GetResult<SubscriptionPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >

    /**
     * Find the first Subscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<T extends SubscriptionFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, SubscriptionFindFirstArgs<ExtArgs>>,
    ): Prisma__SubscriptionClient<
      $Types.GetResult<SubscriptionPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >

    /**
     * Find the first Subscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends SubscriptionFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SubscriptionFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__SubscriptionClient<
      $Types.GetResult<SubscriptionPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscription.findMany()
     *
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscription.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends SubscriptionFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SubscriptionFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Types.GetResult<SubscriptionPayload<ExtArgs>, T, 'findMany'>
    >

    /**
     * Create a Subscription.
     * @param {SubscriptionCreateArgs} args - Arguments to create a Subscription.
     * @example
     * // Create one Subscription
     * const Subscription = await prisma.subscription.create({
     *   data: {
     *     // ... data to create a Subscription
     *   }
     * })
     *
     **/
    create<T extends SubscriptionCreateArgs<ExtArgs>>(
      args: SelectSubset<T, SubscriptionCreateArgs<ExtArgs>>,
    ): Prisma__SubscriptionClient<
      $Types.GetResult<SubscriptionPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >

    /**
     * Create many Subscriptions.
     *     @param {SubscriptionCreateManyArgs} args - Arguments to create many Subscriptions.
     *     @example
     *     // Create many Subscriptions
     *     const subscription = await prisma.subscription.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends SubscriptionCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SubscriptionCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Subscription.
     * @param {SubscriptionDeleteArgs} args - Arguments to delete one Subscription.
     * @example
     * // Delete one Subscription
     * const Subscription = await prisma.subscription.delete({
     *   where: {
     *     // ... filter to delete one Subscription
     *   }
     * })
     *
     **/
    delete<T extends SubscriptionDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, SubscriptionDeleteArgs<ExtArgs>>,
    ): Prisma__SubscriptionClient<
      $Types.GetResult<SubscriptionPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >

    /**
     * Update one Subscription.
     * @param {SubscriptionUpdateArgs} args - Arguments to update one Subscription.
     * @example
     * // Update one Subscription
     * const subscription = await prisma.subscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends SubscriptionUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, SubscriptionUpdateArgs<ExtArgs>>,
    ): Prisma__SubscriptionClient<
      $Types.GetResult<SubscriptionPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >

    /**
     * Delete zero or more Subscriptions.
     * @param {SubscriptionDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends SubscriptionDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SubscriptionDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends SubscriptionUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, SubscriptionUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Subscription.
     * @param {SubscriptionUpsertArgs} args - Arguments to update or create a Subscription.
     * @example
     * // Update or create a Subscription
     * const subscription = await prisma.subscription.upsert({
     *   create: {
     *     // ... data to create a Subscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscription we want to update
     *   }
     * })
     **/
    upsert<T extends SubscriptionUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, SubscriptionUpsertArgs<ExtArgs>>,
    ): Prisma__SubscriptionClient<
      $Types.GetResult<SubscriptionPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >

    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscription.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
     **/
    count<T extends SubscriptionCountArgs>(
      args?: Subset<T, SubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends SubscriptionAggregateArgs>(
      args: Subset<T, SubscriptionAggregateArgs>,
    ): Prisma.PrismaPromise<GetSubscriptionAggregateType<T>>

    /**
     * Group by Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends SubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [
                  Error,
                  'Field ',
                  P,
                  ` in "having" needs to be provided in "by"`,
                ]
          }[HavingFields]
        : 'take' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
          }[OrderFields],
    >(
      args: SubsetIntersection<T, SubscriptionGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetSubscriptionGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>
    /**
     * Fields of the Subscription model
     */
    readonly fields: SubscriptionFieldRefs
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SubscriptionClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > implements Prisma.PrismaPromise<T>
  {
    private readonly _dmmf
    private readonly _queryType
    private readonly _rootField
    private readonly _clientMethod
    private readonly _args
    private readonly _dataPath
    private readonly _errorFormat
    private readonly _measurePerformance?
    private _isList
    private _callsite
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise'
    constructor(
      _dmmf: runtime.DMMFClass,
      _queryType: 'query' | 'mutation',
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean,
    )

    organization<T extends OrganizationArgs<ExtArgs> = {}>(
      args?: Subset<T, OrganizationArgs<ExtArgs>>,
    ): Prisma__OrganizationClient<
      $Types.GetResult<OrganizationPayload<ExtArgs>, T, 'findUnique'> | Null,
      never,
      ExtArgs
    >

    private get _document()
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): Promise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): Promise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>
  }

  /**
   * Fields of the Subscription model
   */
  interface SubscriptionFieldRefs {
    readonly id: FieldRef<'Subscription', 'String'>
    readonly organizationId: FieldRef<'Subscription', 'String'>
    readonly plan: FieldRef<'Subscription', 'String'>
    readonly status: FieldRef<'Subscription', 'SubscriptionStatus'>
    readonly startedAt: FieldRef<'Subscription', 'DateTime'>
    readonly trialEndsAt: FieldRef<'Subscription', 'DateTime'>
    readonly createdAt: FieldRef<'Subscription', 'DateTime'>
    readonly updatedAt: FieldRef<'Subscription', 'DateTime'>
  }

  // Custom InputTypes

  /**
   * Subscription findUnique
   */
  export type SubscriptionFindUniqueArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findUniqueOrThrow
   */
  export type SubscriptionFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findFirst
   */
  export type SubscriptionFindFirstArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?:
      | SubscriptionOrderByWithRelationInput
      | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findFirstOrThrow
   */
  export type SubscriptionFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?:
      | SubscriptionOrderByWithRelationInput
      | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findMany
   */
  export type SubscriptionFindManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscriptions to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?:
      | SubscriptionOrderByWithRelationInput
      | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription create
   */
  export type SubscriptionCreateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Subscription.
     */
    data: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
  }

  /**
   * Subscription createMany
   */
  export type SubscriptionCreateManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subscription update
   */
  export type SubscriptionUpdateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Subscription.
     */
    data: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
    /**
     * Choose, which Subscription to update.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription updateMany
   */
  export type SubscriptionUpdateManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<
      SubscriptionUpdateManyMutationInput,
      SubscriptionUncheckedUpdateManyInput
    >
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
  }

  /**
   * Subscription upsert
   */
  export type SubscriptionUpsertArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Subscription to update in case it exists.
     */
    where: SubscriptionWhereUniqueInput
    /**
     * In case the Subscription found by the `where` argument doesn't exist, create a new Subscription with this data.
     */
    create: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
    /**
     * In case the Subscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
  }

  /**
   * Subscription delete
   */
  export type SubscriptionDeleteArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter which Subscription to delete.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription deleteMany
   */
  export type SubscriptionDeleteManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Subscriptions to delete
     */
    where?: SubscriptionWhereInput
  }

  /**
   * Subscription without action
   */
  export type SubscriptionArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriptionInclude<ExtArgs> | null
  }

  /**
   * Model Contact
   */

  export type AggregateContact = {
    _count: ContactCountAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  export type ContactMinAggregateOutputType = {
    id: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
    name: string | null
    status: string | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContactMaxAggregateOutputType = {
    id: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
    name: string | null
    status: string | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContactCountAggregateOutputType = {
    id: number
    email: number
    firstName: number
    lastName: number
    name: number
    status: number
    type: number
    tags: number
    createdAt: number
    updatedAt: number
    _all: number
  }

  export type ContactMinAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    name?: true
    status?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContactMaxAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    name?: true
    status?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContactCountAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    name?: true
    status?: true
    type?: true
    tags?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ContactAggregateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Contact to aggregate.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Contacts to fetch.
     */
    orderBy?:
      | ContactOrderByWithRelationInput
      | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Contacts
     **/
    _count?: true | ContactCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ContactMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ContactMaxAggregateInputType
  }

  export type GetContactAggregateType<T extends ContactAggregateArgs> = {
    [P in keyof T & keyof AggregateContact]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContact[P]>
      : GetScalarType<T[P], AggregateContact[P]>
  }

  export type ContactGroupByArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: ContactWhereInput
    orderBy?:
      | ContactOrderByWithAggregationInput
      | ContactOrderByWithAggregationInput[]
    by: ContactScalarFieldEnum[] | ContactScalarFieldEnum
    having?: ContactScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactCountAggregateInputType | true
    _min?: ContactMinAggregateInputType
    _max?: ContactMaxAggregateInputType
  }

  export type ContactGroupByOutputType = {
    id: string
    email: string
    firstName: string | null
    lastName: string | null
    name: string | null
    status: string | null
    type: string | null
    tags: string[]
    createdAt: Date
    updatedAt: Date
    _count: ContactCountAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  type GetContactGroupByPayload<T extends ContactGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ContactGroupByOutputType, T['by']> & {
          [P in keyof T & keyof ContactGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactGroupByOutputType[P]>
            : GetScalarType<T[P], ContactGroupByOutputType[P]>
        }
      >
    >

  export type ContactSelect<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean
      email?: boolean
      firstName?: boolean
      lastName?: boolean
      name?: boolean
      status?: boolean
      type?: boolean
      tags?: boolean
      createdAt?: boolean
      updatedAt?: boolean
    },
    ExtArgs['result']['contact']
  >

  export type ContactSelectScalar = {
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    name?: boolean
    status?: boolean
    type?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  type ContactGetPayload<S extends boolean | null | undefined | ContactArgs> =
    $Types.GetResult<ContactPayload, S>

  type ContactCountArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = Omit<ContactFindManyArgs, 'select' | 'include'> & {
    select?: ContactCountAggregateInputType | true
  }

  export interface ContactDelegate<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Contact']
      meta: { name: 'Contact' }
    }
    /**
     * Find zero or one Contact that matches the filter.
     * @param {ContactFindUniqueArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<T extends ContactFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ContactFindUniqueArgs<ExtArgs>>,
    ): Prisma__ContactClient<
      $Types.GetResult<ContactPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >

    /**
     * Find one Contact that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {ContactFindUniqueOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends ContactFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ContactFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ContactClient<
      $Types.GetResult<ContactPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >

    /**
     * Find the first Contact that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<T extends ContactFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ContactFindFirstArgs<ExtArgs>>,
    ): Prisma__ContactClient<
      $Types.GetResult<ContactPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >

    /**
     * Find the first Contact that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends ContactFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ContactFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ContactClient<
      $Types.GetResult<ContactPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >

    /**
     * Find zero or more Contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contacts
     * const contacts = await prisma.contact.findMany()
     *
     * // Get first 10 Contacts
     * const contacts = await prisma.contact.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const contactWithIdOnly = await prisma.contact.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends ContactFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ContactFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Types.GetResult<ContactPayload<ExtArgs>, T, 'findMany'>
    >

    /**
     * Create a Contact.
     * @param {ContactCreateArgs} args - Arguments to create a Contact.
     * @example
     * // Create one Contact
     * const Contact = await prisma.contact.create({
     *   data: {
     *     // ... data to create a Contact
     *   }
     * })
     *
     **/
    create<T extends ContactCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ContactCreateArgs<ExtArgs>>,
    ): Prisma__ContactClient<
      $Types.GetResult<ContactPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >

    /**
     * Create many Contacts.
     *     @param {ContactCreateManyArgs} args - Arguments to create many Contacts.
     *     @example
     *     // Create many Contacts
     *     const contact = await prisma.contact.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends ContactCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ContactCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Contact.
     * @param {ContactDeleteArgs} args - Arguments to delete one Contact.
     * @example
     * // Delete one Contact
     * const Contact = await prisma.contact.delete({
     *   where: {
     *     // ... filter to delete one Contact
     *   }
     * })
     *
     **/
    delete<T extends ContactDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ContactDeleteArgs<ExtArgs>>,
    ): Prisma__ContactClient<
      $Types.GetResult<ContactPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >

    /**
     * Update one Contact.
     * @param {ContactUpdateArgs} args - Arguments to update one Contact.
     * @example
     * // Update one Contact
     * const contact = await prisma.contact.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends ContactUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ContactUpdateArgs<ExtArgs>>,
    ): Prisma__ContactClient<
      $Types.GetResult<ContactPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >

    /**
     * Delete zero or more Contacts.
     * @param {ContactDeleteManyArgs} args - Arguments to filter Contacts to delete.
     * @example
     * // Delete a few Contacts
     * const { count } = await prisma.contact.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends ContactDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ContactDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contacts
     * const contact = await prisma.contact.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends ContactUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ContactUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Contact.
     * @param {ContactUpsertArgs} args - Arguments to update or create a Contact.
     * @example
     * // Update or create a Contact
     * const contact = await prisma.contact.upsert({
     *   create: {
     *     // ... data to create a Contact
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contact we want to update
     *   }
     * })
     **/
    upsert<T extends ContactUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ContactUpsertArgs<ExtArgs>>,
    ): Prisma__ContactClient<
      $Types.GetResult<ContactPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >

    /**
     * Count the number of Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactCountArgs} args - Arguments to filter Contacts to count.
     * @example
     * // Count the number of Contacts
     * const count = await prisma.contact.count({
     *   where: {
     *     // ... the filter for the Contacts we want to count
     *   }
     * })
     **/
    count<T extends ContactCountArgs>(
      args?: Subset<T, ContactCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ContactAggregateArgs>(
      args: Subset<T, ContactAggregateArgs>,
    ): Prisma.PrismaPromise<GetContactAggregateType<T>>

    /**
     * Group by Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ContactGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactGroupByArgs['orderBy'] }
        : { orderBy?: ContactGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [
                  Error,
                  'Field ',
                  P,
                  ` in "having" needs to be provided in "by"`,
                ]
          }[HavingFields]
        : 'take' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
          }[OrderFields],
    >(
      args: SubsetIntersection<T, ContactGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetContactGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>
    /**
     * Fields of the Contact model
     */
    readonly fields: ContactFieldRefs
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contact.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ContactClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > implements Prisma.PrismaPromise<T>
  {
    private readonly _dmmf
    private readonly _queryType
    private readonly _rootField
    private readonly _clientMethod
    private readonly _args
    private readonly _dataPath
    private readonly _errorFormat
    private readonly _measurePerformance?
    private _isList
    private _callsite
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise'
    constructor(
      _dmmf: runtime.DMMFClass,
      _queryType: 'query' | 'mutation',
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean,
    )

    private get _document()
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): Promise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): Promise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>
  }

  /**
   * Fields of the Contact model
   */
  interface ContactFieldRefs {
    readonly id: FieldRef<'Contact', 'String'>
    readonly email: FieldRef<'Contact', 'String'>
    readonly firstName: FieldRef<'Contact', 'String'>
    readonly lastName: FieldRef<'Contact', 'String'>
    readonly name: FieldRef<'Contact', 'String'>
    readonly status: FieldRef<'Contact', 'String'>
    readonly type: FieldRef<'Contact', 'String'>
    readonly tags: FieldRef<'Contact', 'String[]'>
    readonly createdAt: FieldRef<'Contact', 'DateTime'>
    readonly updatedAt: FieldRef<'Contact', 'DateTime'>
  }

  // Custom InputTypes

  /**
   * Contact findUnique
   */
  export type ContactFindUniqueArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact findUniqueOrThrow
   */
  export type ContactFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact findFirst
   */
  export type ContactFindFirstArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Contacts to fetch.
     */
    orderBy?:
      | ContactOrderByWithRelationInput
      | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact findFirstOrThrow
   */
  export type ContactFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Contacts to fetch.
     */
    orderBy?:
      | ContactOrderByWithRelationInput
      | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact findMany
   */
  export type ContactFindManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Filter, which Contacts to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Contacts to fetch.
     */
    orderBy?:
      | ContactOrderByWithRelationInput
      | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Contacts.
     */
    skip?: number
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact create
   */
  export type ContactCreateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * The data needed to create a Contact.
     */
    data: XOR<ContactCreateInput, ContactUncheckedCreateInput>
  }

  /**
   * Contact createMany
   */
  export type ContactCreateManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Contacts.
     */
    data: ContactCreateManyInput | ContactCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contact update
   */
  export type ContactUpdateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * The data needed to update a Contact.
     */
    data: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
    /**
     * Choose, which Contact to update.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact updateMany
   */
  export type ContactUpdateManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Contacts.
     */
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyInput>
    /**
     * Filter which Contacts to update
     */
    where?: ContactWhereInput
  }

  /**
   * Contact upsert
   */
  export type ContactUpsertArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * The filter to search for the Contact to update in case it exists.
     */
    where: ContactWhereUniqueInput
    /**
     * In case the Contact found by the `where` argument doesn't exist, create a new Contact with this data.
     */
    create: XOR<ContactCreateInput, ContactUncheckedCreateInput>
    /**
     * In case the Contact was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
  }

  /**
   * Contact delete
   */
  export type ContactDeleteArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Filter which Contact to delete.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact deleteMany
   */
  export type ContactDeleteManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Contacts to delete
     */
    where?: ContactWhereInput
  }

  /**
   * Contact without action
   */
  export type ContactArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
  }

  /**
   * Model Activity
   */

  export type AggregateActivity = {
    _count: ActivityCountAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  export type ActivityMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: ActivityType | null
    data: string | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ActivityMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: ActivityType | null
    data: string | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ActivityCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    data: number
    date: number
    createdAt: number
    updatedAt: number
    _all: number
  }

  export type ActivityMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    data?: true
    date?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ActivityMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    data?: true
    date?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ActivityCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    data?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ActivityAggregateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Activity to aggregate.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Activities to fetch.
     */
    orderBy?:
      | ActivityOrderByWithRelationInput
      | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Activities
     **/
    _count?: true | ActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ActivityMaxAggregateInputType
  }

  export type GetActivityAggregateType<T extends ActivityAggregateArgs> = {
    [P in keyof T & keyof AggregateActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivity[P]>
      : GetScalarType<T[P], AggregateActivity[P]>
  }

  export type ActivityGroupByArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: ActivityWhereInput
    orderBy?:
      | ActivityOrderByWithAggregationInput
      | ActivityOrderByWithAggregationInput[]
    by: ActivityScalarFieldEnum[] | ActivityScalarFieldEnum
    having?: ActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityCountAggregateInputType | true
    _min?: ActivityMinAggregateInputType
    _max?: ActivityMaxAggregateInputType
  }

  export type ActivityGroupByOutputType = {
    id: string
    userId: string
    type: ActivityType
    data: string
    date: Date
    createdAt: Date
    updatedAt: Date
    _count: ActivityCountAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  type GetActivityGroupByPayload<T extends ActivityGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ActivityGroupByOutputType, T['by']> & {
          [P in keyof T & keyof ActivityGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityGroupByOutputType[P]>
        }
      >
    >

  export type ActivitySelect<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean
      userId?: boolean
      type?: boolean
      data?: boolean
      date?: boolean
      createdAt?: boolean
      updatedAt?: boolean
      user?: boolean | UserArgs<ExtArgs>
    },
    ExtArgs['result']['activity']
  >

  export type ActivitySelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    data?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ActivityInclude<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserArgs<ExtArgs>
  }

  type ActivityGetPayload<S extends boolean | null | undefined | ActivityArgs> =
    $Types.GetResult<ActivityPayload, S>

  type ActivityCountArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = Omit<ActivityFindManyArgs, 'select' | 'include'> & {
    select?: ActivityCountAggregateInputType | true
  }

  export interface ActivityDelegate<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Activity']
      meta: { name: 'Activity' }
    }
    /**
     * Find zero or one Activity that matches the filter.
     * @param {ActivityFindUniqueArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<T extends ActivityFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ActivityFindUniqueArgs<ExtArgs>>,
    ): Prisma__ActivityClient<
      $Types.GetResult<ActivityPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >

    /**
     * Find one Activity that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {ActivityFindUniqueOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends ActivityFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ActivityFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ActivityClient<
      $Types.GetResult<ActivityPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >

    /**
     * Find the first Activity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<T extends ActivityFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ActivityFindFirstArgs<ExtArgs>>,
    ): Prisma__ActivityClient<
      $Types.GetResult<ActivityPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >

    /**
     * Find the first Activity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends ActivityFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ActivityFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ActivityClient<
      $Types.GetResult<ActivityPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >

    /**
     * Find zero or more Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activities
     * const activities = await prisma.activity.findMany()
     *
     * // Get first 10 Activities
     * const activities = await prisma.activity.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const activityWithIdOnly = await prisma.activity.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends ActivityFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ActivityFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Types.GetResult<ActivityPayload<ExtArgs>, T, 'findMany'>
    >

    /**
     * Create a Activity.
     * @param {ActivityCreateArgs} args - Arguments to create a Activity.
     * @example
     * // Create one Activity
     * const Activity = await prisma.activity.create({
     *   data: {
     *     // ... data to create a Activity
     *   }
     * })
     *
     **/
    create<T extends ActivityCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ActivityCreateArgs<ExtArgs>>,
    ): Prisma__ActivityClient<
      $Types.GetResult<ActivityPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >

    /**
     * Create many Activities.
     *     @param {ActivityCreateManyArgs} args - Arguments to create many Activities.
     *     @example
     *     // Create many Activities
     *     const activity = await prisma.activity.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends ActivityCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ActivityCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Activity.
     * @param {ActivityDeleteArgs} args - Arguments to delete one Activity.
     * @example
     * // Delete one Activity
     * const Activity = await prisma.activity.delete({
     *   where: {
     *     // ... filter to delete one Activity
     *   }
     * })
     *
     **/
    delete<T extends ActivityDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ActivityDeleteArgs<ExtArgs>>,
    ): Prisma__ActivityClient<
      $Types.GetResult<ActivityPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >

    /**
     * Update one Activity.
     * @param {ActivityUpdateArgs} args - Arguments to update one Activity.
     * @example
     * // Update one Activity
     * const activity = await prisma.activity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends ActivityUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ActivityUpdateArgs<ExtArgs>>,
    ): Prisma__ActivityClient<
      $Types.GetResult<ActivityPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >

    /**
     * Delete zero or more Activities.
     * @param {ActivityDeleteManyArgs} args - Arguments to filter Activities to delete.
     * @example
     * // Delete a few Activities
     * const { count } = await prisma.activity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends ActivityDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ActivityDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends ActivityUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ActivityUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Activity.
     * @param {ActivityUpsertArgs} args - Arguments to update or create a Activity.
     * @example
     * // Update or create a Activity
     * const activity = await prisma.activity.upsert({
     *   create: {
     *     // ... data to create a Activity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activity we want to update
     *   }
     * })
     **/
    upsert<T extends ActivityUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ActivityUpsertArgs<ExtArgs>>,
    ): Prisma__ActivityClient<
      $Types.GetResult<ActivityPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >

    /**
     * Count the number of Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCountArgs} args - Arguments to filter Activities to count.
     * @example
     * // Count the number of Activities
     * const count = await prisma.activity.count({
     *   where: {
     *     // ... the filter for the Activities we want to count
     *   }
     * })
     **/
    count<T extends ActivityCountArgs>(
      args?: Subset<T, ActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ActivityAggregateArgs>(
      args: Subset<T, ActivityAggregateArgs>,
    ): Prisma.PrismaPromise<GetActivityAggregateType<T>>

    /**
     * Group by Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityGroupByArgs['orderBy'] }
        : { orderBy?: ActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [
                  Error,
                  'Field ',
                  P,
                  ` in "having" needs to be provided in "by"`,
                ]
          }[HavingFields]
        : 'take' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
          }[OrderFields],
    >(
      args: SubsetIntersection<T, ActivityGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetActivityGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>
    /**
     * Fields of the Activity model
     */
    readonly fields: ActivityFieldRefs
  }

  /**
   * The delegate class that acts as a "Promise-like" for Activity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ActivityClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > implements Prisma.PrismaPromise<T>
  {
    private readonly _dmmf
    private readonly _queryType
    private readonly _rootField
    private readonly _clientMethod
    private readonly _args
    private readonly _dataPath
    private readonly _errorFormat
    private readonly _measurePerformance?
    private _isList
    private _callsite
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise'
    constructor(
      _dmmf: runtime.DMMFClass,
      _queryType: 'query' | 'mutation',
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean,
    )

    user<T extends UserArgs<ExtArgs> = {}>(
      args?: Subset<T, UserArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique'> | Null,
      never,
      ExtArgs
    >

    private get _document()
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): Promise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): Promise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>
  }

  /**
   * Fields of the Activity model
   */
  interface ActivityFieldRefs {
    readonly id: FieldRef<'Activity', 'String'>
    readonly userId: FieldRef<'Activity', 'String'>
    readonly type: FieldRef<'Activity', 'ActivityType'>
    readonly data: FieldRef<'Activity', 'String'>
    readonly date: FieldRef<'Activity', 'DateTime'>
    readonly createdAt: FieldRef<'Activity', 'DateTime'>
    readonly updatedAt: FieldRef<'Activity', 'DateTime'>
  }

  // Custom InputTypes

  /**
   * Activity findUnique
   */
  export type ActivityFindUniqueArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findUniqueOrThrow
   */
  export type ActivityFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findFirst
   */
  export type ActivityFindFirstArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Activities to fetch.
     */
    orderBy?:
      | ActivityOrderByWithRelationInput
      | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findFirstOrThrow
   */
  export type ActivityFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Activities to fetch.
     */
    orderBy?:
      | ActivityOrderByWithRelationInput
      | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findMany
   */
  export type ActivityFindManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activities to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Activities to fetch.
     */
    orderBy?:
      | ActivityOrderByWithRelationInput
      | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Activities.
     */
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity create
   */
  export type ActivityCreateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a Activity.
     */
    data: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
  }

  /**
   * Activity createMany
   */
  export type ActivityCreateManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Activity update
   */
  export type ActivityUpdateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a Activity.
     */
    data: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
    /**
     * Choose, which Activity to update.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity updateMany
   */
  export type ActivityUpdateManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
  }

  /**
   * Activity upsert
   */
  export type ActivityUpsertArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the Activity to update in case it exists.
     */
    where: ActivityWhereUniqueInput
    /**
     * In case the Activity found by the `where` argument doesn't exist, create a new Activity with this data.
     */
    create: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
    /**
     * In case the Activity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
  }

  /**
   * Activity delete
   */
  export type ActivityDeleteArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter which Activity to delete.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity deleteMany
   */
  export type ActivityDeleteManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Activities to delete
     */
    where?: ActivityWhereInput
  }

  /**
   * Activity without action
   */
  export type ActivityArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ActivityInclude<ExtArgs> | null
  }

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted'
    ReadCommitted: 'ReadCommitted'
    RepeatableRead: 'RepeatableRead'
    Serializable: 'Serializable'
  }

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]

  export const UserScalarFieldEnum: {
    id: 'id'
    email: 'email'
    firstName: 'firstName'
    lastName: 'lastName'
    name: 'name'
    status: 'status'
    avatar: 'avatar'
    createdAt: 'createdAt'
    updatedAt: 'updatedAt'
  }

  export type UserScalarFieldEnum =
    (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]

  export const OrganizationScalarFieldEnum: {
    id: 'id'
    name: 'name'
    slug: 'slug'
    plan: 'plan'
    email: 'email'
    logo: 'logo'
    createdAt: 'createdAt'
    updatedAt: 'updatedAt'
    userId: 'userId'
  }

  export type OrganizationScalarFieldEnum =
    (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]

  export const OrganizationMemberScalarFieldEnum: {
    id: 'id'
    userId: 'userId'
    organizationId: 'organizationId'
    roles: 'roles'
  }

  export type OrganizationMemberScalarFieldEnum =
    (typeof OrganizationMemberScalarFieldEnum)[keyof typeof OrganizationMemberScalarFieldEnum]

  export const SubscriptionScalarFieldEnum: {
    id: 'id'
    organizationId: 'organizationId'
    plan: 'plan'
    status: 'status'
    startedAt: 'startedAt'
    trialEndsAt: 'trialEndsAt'
    createdAt: 'createdAt'
    updatedAt: 'updatedAt'
  }

  export type SubscriptionScalarFieldEnum =
    (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum]

  export const ContactScalarFieldEnum: {
    id: 'id'
    email: 'email'
    firstName: 'firstName'
    lastName: 'lastName'
    name: 'name'
    status: 'status'
    type: 'type'
    tags: 'tags'
    createdAt: 'createdAt'
    updatedAt: 'updatedAt'
  }

  export type ContactScalarFieldEnum =
    (typeof ContactScalarFieldEnum)[keyof typeof ContactScalarFieldEnum]

  export const ActivityScalarFieldEnum: {
    id: 'id'
    userId: 'userId'
    type: 'type'
    data: 'data'
    date: 'date'
    createdAt: 'createdAt'
    updatedAt: 'updatedAt'
  }

  export type ActivityScalarFieldEnum =
    (typeof ActivityScalarFieldEnum)[keyof typeof ActivityScalarFieldEnum]

  export const SortOrder: {
    asc: 'asc'
    desc: 'desc'
  }

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]

  export const QueryMode: {
    default: 'default'
    insensitive: 'insensitive'
  }

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]

  export const NullsOrder: {
    first: 'first'
    last: 'last'
  }

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String'
  >

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String[]'
  >

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime'
  >

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >

  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Role[]'
  >

  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Role'
  >

  /**
   * Reference to a field of type 'SubscriptionStatus'
   */
  export type EnumSubscriptionStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'SubscriptionStatus'>

  /**
   * Reference to a field of type 'SubscriptionStatus[]'
   */
  export type ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'SubscriptionStatus[]'>

  /**
   * Reference to a field of type 'ActivityType'
   */
  export type EnumActivityTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'ActivityType'
  >

  /**
   * Reference to a field of type 'ActivityType[]'
   */
  export type ListEnumActivityTypeFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'ActivityType[]'>

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int'
  >

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int[]'
  >

  /**
   * Deep Input Types
   */

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<'User'> | string
    email?: StringFilter<'User'> | string
    firstName?: StringNullableFilter<'User'> | string | null
    lastName?: StringNullableFilter<'User'> | string | null
    name?: StringNullableFilter<'User'> | string | null
    status?: StringNullableFilter<'User'> | string | null
    avatar?: StringNullableFilter<'User'> | string | null
    createdAt?: DateTimeFilter<'User'> | Date | string
    updatedAt?: DateTimeFilter<'User'> | Date | string
    organizations?: OrganizationListRelationFilter
    OrganizationMember?: OrganizationMemberListRelationFilter
    Activity?: ActivityListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizations?: OrganizationOrderByRelationAggregateInput
    OrganizationMember?: OrganizationMemberOrderByRelationAggregateInput
    Activity?: ActivityOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string
      email?: string
      AND?: UserWhereInput | UserWhereInput[]
      OR?: UserWhereInput[]
      NOT?: UserWhereInput | UserWhereInput[]
      firstName?: StringNullableFilter<'User'> | string | null
      lastName?: StringNullableFilter<'User'> | string | null
      name?: StringNullableFilter<'User'> | string | null
      status?: StringNullableFilter<'User'> | string | null
      avatar?: StringNullableFilter<'User'> | string | null
      createdAt?: DateTimeFilter<'User'> | Date | string
      updatedAt?: DateTimeFilter<'User'> | Date | string
      organizations?: OrganizationListRelationFilter
      OrganizationMember?: OrganizationMemberListRelationFilter
      Activity?: ActivityListRelationFilter
    },
    'id' | 'email'
  >

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<'User'> | string
    email?: StringWithAggregatesFilter<'User'> | string
    firstName?: StringNullableWithAggregatesFilter<'User'> | string | null
    lastName?: StringNullableWithAggregatesFilter<'User'> | string | null
    name?: StringNullableWithAggregatesFilter<'User'> | string | null
    status?: StringNullableWithAggregatesFilter<'User'> | string | null
    avatar?: StringNullableWithAggregatesFilter<'User'> | string | null
    createdAt?: DateTimeWithAggregatesFilter<'User'> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<'User'> | Date | string
  }

  export type OrganizationWhereInput = {
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    id?: StringFilter<'Organization'> | string
    name?: StringFilter<'Organization'> | string
    slug?: StringFilter<'Organization'> | string
    plan?: StringNullableFilter<'Organization'> | string | null
    email?: StringNullableFilter<'Organization'> | string | null
    logo?: StringNullableFilter<'Organization'> | string | null
    createdAt?: DateTimeFilter<'Organization'> | Date | string
    updatedAt?: DateTimeFilter<'Organization'> | Date | string
    userId?: StringNullableFilter<'Organization'> | string | null
    members?: OrganizationMemberListRelationFilter
    User?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    Subscription?: SubscriptionListRelationFilter
  }

  export type OrganizationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    plan?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    members?: OrganizationMemberOrderByRelationAggregateInput
    User?: UserOrderByWithRelationInput
    Subscription?: SubscriptionOrderByRelationAggregateInput
  }

  export type OrganizationWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string
      slug?: string
      AND?: OrganizationWhereInput | OrganizationWhereInput[]
      OR?: OrganizationWhereInput[]
      NOT?: OrganizationWhereInput | OrganizationWhereInput[]
      name?: StringFilter<'Organization'> | string
      plan?: StringNullableFilter<'Organization'> | string | null
      email?: StringNullableFilter<'Organization'> | string | null
      logo?: StringNullableFilter<'Organization'> | string | null
      createdAt?: DateTimeFilter<'Organization'> | Date | string
      updatedAt?: DateTimeFilter<'Organization'> | Date | string
      userId?: StringNullableFilter<'Organization'> | string | null
      members?: OrganizationMemberListRelationFilter
      User?: XOR<UserNullableRelationFilter, UserWhereInput> | null
      Subscription?: SubscriptionListRelationFilter
    },
    'id' | 'slug'
  >

  export type OrganizationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    plan?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    _count?: OrganizationCountOrderByAggregateInput
    _max?: OrganizationMaxOrderByAggregateInput
    _min?: OrganizationMinOrderByAggregateInput
  }

  export type OrganizationScalarWhereWithAggregatesInput = {
    AND?:
      | OrganizationScalarWhereWithAggregatesInput
      | OrganizationScalarWhereWithAggregatesInput[]
    OR?: OrganizationScalarWhereWithAggregatesInput[]
    NOT?:
      | OrganizationScalarWhereWithAggregatesInput
      | OrganizationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<'Organization'> | string
    name?: StringWithAggregatesFilter<'Organization'> | string
    slug?: StringWithAggregatesFilter<'Organization'> | string
    plan?: StringNullableWithAggregatesFilter<'Organization'> | string | null
    email?: StringNullableWithAggregatesFilter<'Organization'> | string | null
    logo?: StringNullableWithAggregatesFilter<'Organization'> | string | null
    createdAt?: DateTimeWithAggregatesFilter<'Organization'> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<'Organization'> | Date | string
    userId?: StringNullableWithAggregatesFilter<'Organization'> | string | null
  }

  export type OrganizationMemberWhereInput = {
    AND?: OrganizationMemberWhereInput | OrganizationMemberWhereInput[]
    OR?: OrganizationMemberWhereInput[]
    NOT?: OrganizationMemberWhereInput | OrganizationMemberWhereInput[]
    id?: StringFilter<'OrganizationMember'> | string
    userId?: StringFilter<'OrganizationMember'> | string
    organizationId?: StringFilter<'OrganizationMember'> | string
    roles?: EnumRoleNullableListFilter<'OrganizationMember'>
    user?: XOR<UserRelationFilter, UserWhereInput>
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
  }

  export type OrganizationMemberOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    roles?: SortOrder
    user?: UserOrderByWithRelationInput
    organization?: OrganizationOrderByWithRelationInput
  }

  export type OrganizationMemberWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string
      AND?: OrganizationMemberWhereInput | OrganizationMemberWhereInput[]
      OR?: OrganizationMemberWhereInput[]
      NOT?: OrganizationMemberWhereInput | OrganizationMemberWhereInput[]
      userId?: StringFilter<'OrganizationMember'> | string
      organizationId?: StringFilter<'OrganizationMember'> | string
      roles?: EnumRoleNullableListFilter<'OrganizationMember'>
      user?: XOR<UserRelationFilter, UserWhereInput>
      organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    },
    'id'
  >

  export type OrganizationMemberOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    roles?: SortOrder
    _count?: OrganizationMemberCountOrderByAggregateInput
    _max?: OrganizationMemberMaxOrderByAggregateInput
    _min?: OrganizationMemberMinOrderByAggregateInput
  }

  export type OrganizationMemberScalarWhereWithAggregatesInput = {
    AND?:
      | OrganizationMemberScalarWhereWithAggregatesInput
      | OrganizationMemberScalarWhereWithAggregatesInput[]
    OR?: OrganizationMemberScalarWhereWithAggregatesInput[]
    NOT?:
      | OrganizationMemberScalarWhereWithAggregatesInput
      | OrganizationMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<'OrganizationMember'> | string
    userId?: StringWithAggregatesFilter<'OrganizationMember'> | string
    organizationId?: StringWithAggregatesFilter<'OrganizationMember'> | string
    roles?: EnumRoleNullableListFilter<'OrganizationMember'>
  }

  export type SubscriptionWhereInput = {
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    id?: StringFilter<'Subscription'> | string
    organizationId?: StringFilter<'Subscription'> | string
    plan?: StringFilter<'Subscription'> | string
    status?: EnumSubscriptionStatusFilter<'Subscription'> | SubscriptionStatus
    startedAt?: DateTimeNullableFilter<'Subscription'> | Date | string | null
    trialEndsAt?: DateTimeNullableFilter<'Subscription'> | Date | string | null
    createdAt?: DateTimeFilter<'Subscription'> | Date | string
    updatedAt?: DateTimeFilter<'Subscription'> | Date | string
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
  }

  export type SubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
  }

  export type SubscriptionWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string
      AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
      OR?: SubscriptionWhereInput[]
      NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
      organizationId?: StringFilter<'Subscription'> | string
      plan?: StringFilter<'Subscription'> | string
      status?: EnumSubscriptionStatusFilter<'Subscription'> | SubscriptionStatus
      startedAt?: DateTimeNullableFilter<'Subscription'> | Date | string | null
      trialEndsAt?:
        | DateTimeNullableFilter<'Subscription'>
        | Date
        | string
        | null
      createdAt?: DateTimeFilter<'Subscription'> | Date | string
      updatedAt?: DateTimeFilter<'Subscription'> | Date | string
      organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    },
    'id'
  >

  export type SubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubscriptionCountOrderByAggregateInput
    _max?: SubscriptionMaxOrderByAggregateInput
    _min?: SubscriptionMinOrderByAggregateInput
  }

  export type SubscriptionScalarWhereWithAggregatesInput = {
    AND?:
      | SubscriptionScalarWhereWithAggregatesInput
      | SubscriptionScalarWhereWithAggregatesInput[]
    OR?: SubscriptionScalarWhereWithAggregatesInput[]
    NOT?:
      | SubscriptionScalarWhereWithAggregatesInput
      | SubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<'Subscription'> | string
    organizationId?: StringWithAggregatesFilter<'Subscription'> | string
    plan?: StringWithAggregatesFilter<'Subscription'> | string
    status?:
      | EnumSubscriptionStatusWithAggregatesFilter<'Subscription'>
      | SubscriptionStatus
    startedAt?:
      | DateTimeNullableWithAggregatesFilter<'Subscription'>
      | Date
      | string
      | null
    trialEndsAt?:
      | DateTimeNullableWithAggregatesFilter<'Subscription'>
      | Date
      | string
      | null
    createdAt?: DateTimeWithAggregatesFilter<'Subscription'> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<'Subscription'> | Date | string
  }

  export type ContactWhereInput = {
    AND?: ContactWhereInput | ContactWhereInput[]
    OR?: ContactWhereInput[]
    NOT?: ContactWhereInput | ContactWhereInput[]
    id?: StringFilter<'Contact'> | string
    email?: StringFilter<'Contact'> | string
    firstName?: StringNullableFilter<'Contact'> | string | null
    lastName?: StringNullableFilter<'Contact'> | string | null
    name?: StringNullableFilter<'Contact'> | string | null
    status?: StringNullableFilter<'Contact'> | string | null
    type?: StringNullableFilter<'Contact'> | string | null
    tags?: StringNullableListFilter<'Contact'>
    createdAt?: DateTimeFilter<'Contact'> | Date | string
    updatedAt?: DateTimeFilter<'Contact'> | Date | string
  }

  export type ContactOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string
      email?: string
      AND?: ContactWhereInput | ContactWhereInput[]
      OR?: ContactWhereInput[]
      NOT?: ContactWhereInput | ContactWhereInput[]
      firstName?: StringNullableFilter<'Contact'> | string | null
      lastName?: StringNullableFilter<'Contact'> | string | null
      name?: StringNullableFilter<'Contact'> | string | null
      status?: StringNullableFilter<'Contact'> | string | null
      type?: StringNullableFilter<'Contact'> | string | null
      tags?: StringNullableListFilter<'Contact'>
      createdAt?: DateTimeFilter<'Contact'> | Date | string
      updatedAt?: DateTimeFilter<'Contact'> | Date | string
    },
    'id' | 'email'
  >

  export type ContactOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ContactCountOrderByAggregateInput
    _max?: ContactMaxOrderByAggregateInput
    _min?: ContactMinOrderByAggregateInput
  }

  export type ContactScalarWhereWithAggregatesInput = {
    AND?:
      | ContactScalarWhereWithAggregatesInput
      | ContactScalarWhereWithAggregatesInput[]
    OR?: ContactScalarWhereWithAggregatesInput[]
    NOT?:
      | ContactScalarWhereWithAggregatesInput
      | ContactScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<'Contact'> | string
    email?: StringWithAggregatesFilter<'Contact'> | string
    firstName?: StringNullableWithAggregatesFilter<'Contact'> | string | null
    lastName?: StringNullableWithAggregatesFilter<'Contact'> | string | null
    name?: StringNullableWithAggregatesFilter<'Contact'> | string | null
    status?: StringNullableWithAggregatesFilter<'Contact'> | string | null
    type?: StringNullableWithAggregatesFilter<'Contact'> | string | null
    tags?: StringNullableListFilter<'Contact'>
    createdAt?: DateTimeWithAggregatesFilter<'Contact'> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<'Contact'> | Date | string
  }

  export type ActivityWhereInput = {
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    id?: StringFilter<'Activity'> | string
    userId?: StringFilter<'Activity'> | string
    type?: EnumActivityTypeFilter<'Activity'> | ActivityType
    data?: StringFilter<'Activity'> | string
    date?: DateTimeFilter<'Activity'> | Date | string
    createdAt?: DateTimeFilter<'Activity'> | Date | string
    updatedAt?: DateTimeFilter<'Activity'> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ActivityOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    data?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ActivityWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string
      AND?: ActivityWhereInput | ActivityWhereInput[]
      OR?: ActivityWhereInput[]
      NOT?: ActivityWhereInput | ActivityWhereInput[]
      userId?: StringFilter<'Activity'> | string
      type?: EnumActivityTypeFilter<'Activity'> | ActivityType
      data?: StringFilter<'Activity'> | string
      date?: DateTimeFilter<'Activity'> | Date | string
      createdAt?: DateTimeFilter<'Activity'> | Date | string
      updatedAt?: DateTimeFilter<'Activity'> | Date | string
      user?: XOR<UserRelationFilter, UserWhereInput>
    },
    'id'
  >

  export type ActivityOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    data?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ActivityCountOrderByAggregateInput
    _max?: ActivityMaxOrderByAggregateInput
    _min?: ActivityMinOrderByAggregateInput
  }

  export type ActivityScalarWhereWithAggregatesInput = {
    AND?:
      | ActivityScalarWhereWithAggregatesInput
      | ActivityScalarWhereWithAggregatesInput[]
    OR?: ActivityScalarWhereWithAggregatesInput[]
    NOT?:
      | ActivityScalarWhereWithAggregatesInput
      | ActivityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<'Activity'> | string
    userId?: StringWithAggregatesFilter<'Activity'> | string
    type?: EnumActivityTypeWithAggregatesFilter<'Activity'> | ActivityType
    data?: StringWithAggregatesFilter<'Activity'> | string
    date?: DateTimeWithAggregatesFilter<'Activity'> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<'Activity'> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<'Activity'> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    firstName?: string | null
    lastName?: string | null
    name?: string | null
    status?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizations?: OrganizationCreateNestedManyWithoutUserInput
    OrganizationMember?: OrganizationMemberCreateNestedManyWithoutUserInput
    Activity?: ActivityCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    firstName?: string | null
    lastName?: string | null
    name?: string | null
    status?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizations?: OrganizationUncheckedCreateNestedManyWithoutUserInput
    OrganizationMember?: OrganizationMemberUncheckedCreateNestedManyWithoutUserInput
    Activity?: ActivityUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizations?: OrganizationUpdateManyWithoutUserNestedInput
    OrganizationMember?: OrganizationMemberUpdateManyWithoutUserNestedInput
    Activity?: ActivityUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizations?: OrganizationUncheckedUpdateManyWithoutUserNestedInput
    OrganizationMember?: OrganizationMemberUncheckedUpdateManyWithoutUserNestedInput
    Activity?: ActivityUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    firstName?: string | null
    lastName?: string | null
    name?: string | null
    status?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationCreateInput = {
    id?: string
    name: string
    slug: string
    plan?: string | null
    email?: string | null
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: OrganizationMemberCreateNestedManyWithoutOrganizationInput
    User?: UserCreateNestedOneWithoutOrganizationsInput
    Subscription?: SubscriptionCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    plan?: string | null
    email?: string | null
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    members?: OrganizationMemberUncheckedCreateNestedManyWithoutOrganizationInput
    Subscription?: SubscriptionUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: OrganizationMemberUpdateManyWithoutOrganizationNestedInput
    User?: UserUpdateOneWithoutOrganizationsNestedInput
    Subscription?: SubscriptionUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    members?: OrganizationMemberUncheckedUpdateManyWithoutOrganizationNestedInput
    Subscription?: SubscriptionUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateManyInput = {
    id?: string
    name: string
    slug: string
    plan?: string | null
    email?: string | null
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
  }

  export type OrganizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrganizationMemberCreateInput = {
    id?: string
    roles?: OrganizationMemberCreaterolesInput | Role[]
    user: UserCreateNestedOneWithoutOrganizationMemberInput
    organization: OrganizationCreateNestedOneWithoutMembersInput
  }

  export type OrganizationMemberUncheckedCreateInput = {
    id?: string
    userId: string
    organizationId: string
    roles?: OrganizationMemberCreaterolesInput | Role[]
  }

  export type OrganizationMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roles?: OrganizationMemberUpdaterolesInput | Role[]
    user?: UserUpdateOneRequiredWithoutOrganizationMemberNestedInput
    organization?: OrganizationUpdateOneRequiredWithoutMembersNestedInput
  }

  export type OrganizationMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    roles?: OrganizationMemberUpdaterolesInput | Role[]
  }

  export type OrganizationMemberCreateManyInput = {
    id?: string
    userId: string
    organizationId: string
    roles?: OrganizationMemberCreaterolesInput | Role[]
  }

  export type OrganizationMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    roles?: OrganizationMemberUpdaterolesInput | Role[]
  }

  export type OrganizationMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    roles?: OrganizationMemberUpdaterolesInput | Role[]
  }

  export type SubscriptionCreateInput = {
    id?: string
    plan: string
    status: SubscriptionStatus
    startedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateInput = {
    id?: string
    organizationId: string
    plan: string
    status: SubscriptionStatus
    startedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?:
      | EnumSubscriptionStatusFieldUpdateOperationsInput
      | SubscriptionStatus
    startedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null
    trialEndsAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?:
      | EnumSubscriptionStatusFieldUpdateOperationsInput
      | SubscriptionStatus
    startedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null
    trialEndsAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateManyInput = {
    id?: string
    organizationId: string
    plan: string
    status: SubscriptionStatus
    startedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?:
      | EnumSubscriptionStatusFieldUpdateOperationsInput
      | SubscriptionStatus
    startedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null
    trialEndsAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?:
      | EnumSubscriptionStatusFieldUpdateOperationsInput
      | SubscriptionStatus
    startedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null
    trialEndsAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactCreateInput = {
    id?: string
    email: string
    firstName?: string | null
    lastName?: string | null
    name?: string | null
    status?: string | null
    type?: string | null
    tags?: ContactCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactUncheckedCreateInput = {
    id?: string
    email: string
    firstName?: string | null
    lastName?: string | null
    name?: string | null
    status?: string | null
    type?: string | null
    tags?: ContactCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContactUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContactUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactCreateManyInput = {
    id?: string
    email: string
    firstName?: string | null
    lastName?: string | null
    name?: string | null
    status?: string | null
    type?: string | null
    tags?: ContactCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContactUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContactUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCreateInput = {
    id?: string
    type: ActivityType
    data: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutActivityInput
  }

  export type ActivityUncheckedCreateInput = {
    id?: string
    userId: string
    type: ActivityType
    data: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActivityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumActivityTypeFieldUpdateOperationsInput | ActivityType
    data?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutActivityNestedInput
  }

  export type ActivityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumActivityTypeFieldUpdateOperationsInput | ActivityType
    data?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCreateManyInput = {
    id?: string
    userId: string
    type: ActivityType
    data: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActivityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumActivityTypeFieldUpdateOperationsInput | ActivityType
    data?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumActivityTypeFieldUpdateOperationsInput | ActivityType
    data?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type OrganizationListRelationFilter = {
    every?: OrganizationWhereInput
    some?: OrganizationWhereInput
    none?: OrganizationWhereInput
  }

  export type OrganizationMemberListRelationFilter = {
    every?: OrganizationMemberWhereInput
    some?: OrganizationMemberWhereInput
    none?: OrganizationMemberWhereInput
  }

  export type ActivityListRelationFilter = {
    every?: ActivityWhereInput
    some?: ActivityWhereInput
    none?: ActivityWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OrganizationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    name?: SortOrder
    status?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    name?: SortOrder
    status?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    name?: SortOrder
    status?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type SubscriptionListRelationFilter = {
    every?: SubscriptionWhereInput
    some?: SubscriptionWhereInput
    none?: SubscriptionWhereInput
  }

  export type SubscriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    plan?: SortOrder
    email?: SortOrder
    logo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type OrganizationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    plan?: SortOrder
    email?: SortOrder
    logo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type OrganizationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    plan?: SortOrder
    email?: SortOrder
    logo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type EnumRoleNullableListFilter<$PrismaModel = never> = {
    equals?: Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null
    has?: Role | EnumRoleFieldRefInput<$PrismaModel> | null
    hasEvery?: Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    hasSome?: Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type OrganizationRelationFilter = {
    is?: OrganizationWhereInput
    isNot?: OrganizationWhereInput
  }

  export type OrganizationMemberCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    roles?: SortOrder
  }

  export type OrganizationMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
  }

  export type OrganizationMemberMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
  }

  export type EnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?:
      | SubscriptionStatus
      | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?:
      | SubscriptionStatus[]
      | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?:
      | SubscriptionStatus[]
      | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | SubscriptionStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    trialEndsAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    trialEndsAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    trialEndsAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?:
        | SubscriptionStatus
        | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
      in?:
        | SubscriptionStatus[]
        | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
      notIn?:
        | SubscriptionStatus[]
        | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
      not?:
        | NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel>
        | SubscriptionStatus
      _count?: NestedIntFilter<$PrismaModel>
      _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
      _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?:
      | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
      | Date
      | string
      | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ContactCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    name?: SortOrder
    status?: SortOrder
    type?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    name?: SortOrder
    status?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    name?: SortOrder
    status?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumActivityTypeFilter<$PrismaModel = never> = {
    equals?: ActivityType | EnumActivityTypeFieldRefInput<$PrismaModel>
    in?: ActivityType[] | ListEnumActivityTypeFieldRefInput<$PrismaModel>
    notIn?: ActivityType[] | ListEnumActivityTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumActivityTypeFilter<$PrismaModel> | ActivityType
  }

  export type ActivityCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    data?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    data?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActivityMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    data?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumActivityTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: ActivityType | EnumActivityTypeFieldRefInput<$PrismaModel>
    in?: ActivityType[] | ListEnumActivityTypeFieldRefInput<$PrismaModel>
    notIn?: ActivityType[] | ListEnumActivityTypeFieldRefInput<$PrismaModel>
    not?:
      | NestedEnumActivityTypeWithAggregatesFilter<$PrismaModel>
      | ActivityType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumActivityTypeFilter<$PrismaModel>
    _max?: NestedEnumActivityTypeFilter<$PrismaModel>
  }

  export type OrganizationCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          OrganizationCreateWithoutUserInput,
          OrganizationUncheckedCreateWithoutUserInput
        >
      | OrganizationCreateWithoutUserInput[]
      | OrganizationUncheckedCreateWithoutUserInput[]
    connectOrCreate?:
      | OrganizationCreateOrConnectWithoutUserInput
      | OrganizationCreateOrConnectWithoutUserInput[]
    createMany?: OrganizationCreateManyUserInputEnvelope
    connect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
  }

  export type OrganizationMemberCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          OrganizationMemberCreateWithoutUserInput,
          OrganizationMemberUncheckedCreateWithoutUserInput
        >
      | OrganizationMemberCreateWithoutUserInput[]
      | OrganizationMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?:
      | OrganizationMemberCreateOrConnectWithoutUserInput
      | OrganizationMemberCreateOrConnectWithoutUserInput[]
    createMany?: OrganizationMemberCreateManyUserInputEnvelope
    connect?:
      | OrganizationMemberWhereUniqueInput
      | OrganizationMemberWhereUniqueInput[]
  }

  export type ActivityCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          ActivityCreateWithoutUserInput,
          ActivityUncheckedCreateWithoutUserInput
        >
      | ActivityCreateWithoutUserInput[]
      | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?:
      | ActivityCreateOrConnectWithoutUserInput
      | ActivityCreateOrConnectWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type OrganizationUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          OrganizationCreateWithoutUserInput,
          OrganizationUncheckedCreateWithoutUserInput
        >
      | OrganizationCreateWithoutUserInput[]
      | OrganizationUncheckedCreateWithoutUserInput[]
    connectOrCreate?:
      | OrganizationCreateOrConnectWithoutUserInput
      | OrganizationCreateOrConnectWithoutUserInput[]
    createMany?: OrganizationCreateManyUserInputEnvelope
    connect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
  }

  export type OrganizationMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          OrganizationMemberCreateWithoutUserInput,
          OrganizationMemberUncheckedCreateWithoutUserInput
        >
      | OrganizationMemberCreateWithoutUserInput[]
      | OrganizationMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?:
      | OrganizationMemberCreateOrConnectWithoutUserInput
      | OrganizationMemberCreateOrConnectWithoutUserInput[]
    createMany?: OrganizationMemberCreateManyUserInputEnvelope
    connect?:
      | OrganizationMemberWhereUniqueInput
      | OrganizationMemberWhereUniqueInput[]
  }

  export type ActivityUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          ActivityCreateWithoutUserInput,
          ActivityUncheckedCreateWithoutUserInput
        >
      | ActivityCreateWithoutUserInput[]
      | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?:
      | ActivityCreateOrConnectWithoutUserInput
      | ActivityCreateOrConnectWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type OrganizationUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          OrganizationCreateWithoutUserInput,
          OrganizationUncheckedCreateWithoutUserInput
        >
      | OrganizationCreateWithoutUserInput[]
      | OrganizationUncheckedCreateWithoutUserInput[]
    connectOrCreate?:
      | OrganizationCreateOrConnectWithoutUserInput
      | OrganizationCreateOrConnectWithoutUserInput[]
    upsert?:
      | OrganizationUpsertWithWhereUniqueWithoutUserInput
      | OrganizationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrganizationCreateManyUserInputEnvelope
    set?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    disconnect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    delete?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    connect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    update?:
      | OrganizationUpdateWithWhereUniqueWithoutUserInput
      | OrganizationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?:
      | OrganizationUpdateManyWithWhereWithoutUserInput
      | OrganizationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrganizationScalarWhereInput | OrganizationScalarWhereInput[]
  }

  export type OrganizationMemberUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          OrganizationMemberCreateWithoutUserInput,
          OrganizationMemberUncheckedCreateWithoutUserInput
        >
      | OrganizationMemberCreateWithoutUserInput[]
      | OrganizationMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?:
      | OrganizationMemberCreateOrConnectWithoutUserInput
      | OrganizationMemberCreateOrConnectWithoutUserInput[]
    upsert?:
      | OrganizationMemberUpsertWithWhereUniqueWithoutUserInput
      | OrganizationMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrganizationMemberCreateManyUserInputEnvelope
    set?:
      | OrganizationMemberWhereUniqueInput
      | OrganizationMemberWhereUniqueInput[]
    disconnect?:
      | OrganizationMemberWhereUniqueInput
      | OrganizationMemberWhereUniqueInput[]
    delete?:
      | OrganizationMemberWhereUniqueInput
      | OrganizationMemberWhereUniqueInput[]
    connect?:
      | OrganizationMemberWhereUniqueInput
      | OrganizationMemberWhereUniqueInput[]
    update?:
      | OrganizationMemberUpdateWithWhereUniqueWithoutUserInput
      | OrganizationMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?:
      | OrganizationMemberUpdateManyWithWhereWithoutUserInput
      | OrganizationMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?:
      | OrganizationMemberScalarWhereInput
      | OrganizationMemberScalarWhereInput[]
  }

  export type ActivityUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          ActivityCreateWithoutUserInput,
          ActivityUncheckedCreateWithoutUserInput
        >
      | ActivityCreateWithoutUserInput[]
      | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?:
      | ActivityCreateOrConnectWithoutUserInput
      | ActivityCreateOrConnectWithoutUserInput[]
    upsert?:
      | ActivityUpsertWithWhereUniqueWithoutUserInput
      | ActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?:
      | ActivityUpdateWithWhereUniqueWithoutUserInput
      | ActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?:
      | ActivityUpdateManyWithWhereWithoutUserInput
      | ActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type OrganizationUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          OrganizationCreateWithoutUserInput,
          OrganizationUncheckedCreateWithoutUserInput
        >
      | OrganizationCreateWithoutUserInput[]
      | OrganizationUncheckedCreateWithoutUserInput[]
    connectOrCreate?:
      | OrganizationCreateOrConnectWithoutUserInput
      | OrganizationCreateOrConnectWithoutUserInput[]
    upsert?:
      | OrganizationUpsertWithWhereUniqueWithoutUserInput
      | OrganizationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrganizationCreateManyUserInputEnvelope
    set?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    disconnect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    delete?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    connect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    update?:
      | OrganizationUpdateWithWhereUniqueWithoutUserInput
      | OrganizationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?:
      | OrganizationUpdateManyWithWhereWithoutUserInput
      | OrganizationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrganizationScalarWhereInput | OrganizationScalarWhereInput[]
  }

  export type OrganizationMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          OrganizationMemberCreateWithoutUserInput,
          OrganizationMemberUncheckedCreateWithoutUserInput
        >
      | OrganizationMemberCreateWithoutUserInput[]
      | OrganizationMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?:
      | OrganizationMemberCreateOrConnectWithoutUserInput
      | OrganizationMemberCreateOrConnectWithoutUserInput[]
    upsert?:
      | OrganizationMemberUpsertWithWhereUniqueWithoutUserInput
      | OrganizationMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrganizationMemberCreateManyUserInputEnvelope
    set?:
      | OrganizationMemberWhereUniqueInput
      | OrganizationMemberWhereUniqueInput[]
    disconnect?:
      | OrganizationMemberWhereUniqueInput
      | OrganizationMemberWhereUniqueInput[]
    delete?:
      | OrganizationMemberWhereUniqueInput
      | OrganizationMemberWhereUniqueInput[]
    connect?:
      | OrganizationMemberWhereUniqueInput
      | OrganizationMemberWhereUniqueInput[]
    update?:
      | OrganizationMemberUpdateWithWhereUniqueWithoutUserInput
      | OrganizationMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?:
      | OrganizationMemberUpdateManyWithWhereWithoutUserInput
      | OrganizationMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?:
      | OrganizationMemberScalarWhereInput
      | OrganizationMemberScalarWhereInput[]
  }

  export type ActivityUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          ActivityCreateWithoutUserInput,
          ActivityUncheckedCreateWithoutUserInput
        >
      | ActivityCreateWithoutUserInput[]
      | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?:
      | ActivityCreateOrConnectWithoutUserInput
      | ActivityCreateOrConnectWithoutUserInput[]
    upsert?:
      | ActivityUpsertWithWhereUniqueWithoutUserInput
      | ActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?:
      | ActivityUpdateWithWhereUniqueWithoutUserInput
      | ActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?:
      | ActivityUpdateManyWithWhereWithoutUserInput
      | ActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type OrganizationMemberCreateNestedManyWithoutOrganizationInput = {
    create?:
      | XOR<
          OrganizationMemberCreateWithoutOrganizationInput,
          OrganizationMemberUncheckedCreateWithoutOrganizationInput
        >
      | OrganizationMemberCreateWithoutOrganizationInput[]
      | OrganizationMemberUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?:
      | OrganizationMemberCreateOrConnectWithoutOrganizationInput
      | OrganizationMemberCreateOrConnectWithoutOrganizationInput[]
    createMany?: OrganizationMemberCreateManyOrganizationInputEnvelope
    connect?:
      | OrganizationMemberWhereUniqueInput
      | OrganizationMemberWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutOrganizationsInput = {
    create?: XOR<
      UserCreateWithoutOrganizationsInput,
      UserUncheckedCreateWithoutOrganizationsInput
    >
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationsInput
    connect?: UserWhereUniqueInput
  }

  export type SubscriptionCreateNestedManyWithoutOrganizationInput = {
    create?:
      | XOR<
          SubscriptionCreateWithoutOrganizationInput,
          SubscriptionUncheckedCreateWithoutOrganizationInput
        >
      | SubscriptionCreateWithoutOrganizationInput[]
      | SubscriptionUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?:
      | SubscriptionCreateOrConnectWithoutOrganizationInput
      | SubscriptionCreateOrConnectWithoutOrganizationInput[]
    createMany?: SubscriptionCreateManyOrganizationInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type OrganizationMemberUncheckedCreateNestedManyWithoutOrganizationInput =
    {
      create?:
        | XOR<
            OrganizationMemberCreateWithoutOrganizationInput,
            OrganizationMemberUncheckedCreateWithoutOrganizationInput
          >
        | OrganizationMemberCreateWithoutOrganizationInput[]
        | OrganizationMemberUncheckedCreateWithoutOrganizationInput[]
      connectOrCreate?:
        | OrganizationMemberCreateOrConnectWithoutOrganizationInput
        | OrganizationMemberCreateOrConnectWithoutOrganizationInput[]
      createMany?: OrganizationMemberCreateManyOrganizationInputEnvelope
      connect?:
        | OrganizationMemberWhereUniqueInput
        | OrganizationMemberWhereUniqueInput[]
    }

  export type SubscriptionUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?:
      | XOR<
          SubscriptionCreateWithoutOrganizationInput,
          SubscriptionUncheckedCreateWithoutOrganizationInput
        >
      | SubscriptionCreateWithoutOrganizationInput[]
      | SubscriptionUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?:
      | SubscriptionCreateOrConnectWithoutOrganizationInput
      | SubscriptionCreateOrConnectWithoutOrganizationInput[]
    createMany?: SubscriptionCreateManyOrganizationInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type OrganizationMemberUpdateManyWithoutOrganizationNestedInput = {
    create?:
      | XOR<
          OrganizationMemberCreateWithoutOrganizationInput,
          OrganizationMemberUncheckedCreateWithoutOrganizationInput
        >
      | OrganizationMemberCreateWithoutOrganizationInput[]
      | OrganizationMemberUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?:
      | OrganizationMemberCreateOrConnectWithoutOrganizationInput
      | OrganizationMemberCreateOrConnectWithoutOrganizationInput[]
    upsert?:
      | OrganizationMemberUpsertWithWhereUniqueWithoutOrganizationInput
      | OrganizationMemberUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: OrganizationMemberCreateManyOrganizationInputEnvelope
    set?:
      | OrganizationMemberWhereUniqueInput
      | OrganizationMemberWhereUniqueInput[]
    disconnect?:
      | OrganizationMemberWhereUniqueInput
      | OrganizationMemberWhereUniqueInput[]
    delete?:
      | OrganizationMemberWhereUniqueInput
      | OrganizationMemberWhereUniqueInput[]
    connect?:
      | OrganizationMemberWhereUniqueInput
      | OrganizationMemberWhereUniqueInput[]
    update?:
      | OrganizationMemberUpdateWithWhereUniqueWithoutOrganizationInput
      | OrganizationMemberUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?:
      | OrganizationMemberUpdateManyWithWhereWithoutOrganizationInput
      | OrganizationMemberUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?:
      | OrganizationMemberScalarWhereInput
      | OrganizationMemberScalarWhereInput[]
  }

  export type UserUpdateOneWithoutOrganizationsNestedInput = {
    create?: XOR<
      UserCreateWithoutOrganizationsInput,
      UserUncheckedCreateWithoutOrganizationsInput
    >
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationsInput
    upsert?: UserUpsertWithoutOrganizationsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutOrganizationsInput,
        UserUpdateWithoutOrganizationsInput
      >,
      UserUncheckedUpdateWithoutOrganizationsInput
    >
  }

  export type SubscriptionUpdateManyWithoutOrganizationNestedInput = {
    create?:
      | XOR<
          SubscriptionCreateWithoutOrganizationInput,
          SubscriptionUncheckedCreateWithoutOrganizationInput
        >
      | SubscriptionCreateWithoutOrganizationInput[]
      | SubscriptionUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?:
      | SubscriptionCreateOrConnectWithoutOrganizationInput
      | SubscriptionCreateOrConnectWithoutOrganizationInput[]
    upsert?:
      | SubscriptionUpsertWithWhereUniqueWithoutOrganizationInput
      | SubscriptionUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: SubscriptionCreateManyOrganizationInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?:
      | SubscriptionUpdateWithWhereUniqueWithoutOrganizationInput
      | SubscriptionUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?:
      | SubscriptionUpdateManyWithWhereWithoutOrganizationInput
      | SubscriptionUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type OrganizationMemberUncheckedUpdateManyWithoutOrganizationNestedInput =
    {
      create?:
        | XOR<
            OrganizationMemberCreateWithoutOrganizationInput,
            OrganizationMemberUncheckedCreateWithoutOrganizationInput
          >
        | OrganizationMemberCreateWithoutOrganizationInput[]
        | OrganizationMemberUncheckedCreateWithoutOrganizationInput[]
      connectOrCreate?:
        | OrganizationMemberCreateOrConnectWithoutOrganizationInput
        | OrganizationMemberCreateOrConnectWithoutOrganizationInput[]
      upsert?:
        | OrganizationMemberUpsertWithWhereUniqueWithoutOrganizationInput
        | OrganizationMemberUpsertWithWhereUniqueWithoutOrganizationInput[]
      createMany?: OrganizationMemberCreateManyOrganizationInputEnvelope
      set?:
        | OrganizationMemberWhereUniqueInput
        | OrganizationMemberWhereUniqueInput[]
      disconnect?:
        | OrganizationMemberWhereUniqueInput
        | OrganizationMemberWhereUniqueInput[]
      delete?:
        | OrganizationMemberWhereUniqueInput
        | OrganizationMemberWhereUniqueInput[]
      connect?:
        | OrganizationMemberWhereUniqueInput
        | OrganizationMemberWhereUniqueInput[]
      update?:
        | OrganizationMemberUpdateWithWhereUniqueWithoutOrganizationInput
        | OrganizationMemberUpdateWithWhereUniqueWithoutOrganizationInput[]
      updateMany?:
        | OrganizationMemberUpdateManyWithWhereWithoutOrganizationInput
        | OrganizationMemberUpdateManyWithWhereWithoutOrganizationInput[]
      deleteMany?:
        | OrganizationMemberScalarWhereInput
        | OrganizationMemberScalarWhereInput[]
    }

  export type SubscriptionUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?:
      | XOR<
          SubscriptionCreateWithoutOrganizationInput,
          SubscriptionUncheckedCreateWithoutOrganizationInput
        >
      | SubscriptionCreateWithoutOrganizationInput[]
      | SubscriptionUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?:
      | SubscriptionCreateOrConnectWithoutOrganizationInput
      | SubscriptionCreateOrConnectWithoutOrganizationInput[]
    upsert?:
      | SubscriptionUpsertWithWhereUniqueWithoutOrganizationInput
      | SubscriptionUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: SubscriptionCreateManyOrganizationInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?:
      | SubscriptionUpdateWithWhereUniqueWithoutOrganizationInput
      | SubscriptionUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?:
      | SubscriptionUpdateManyWithWhereWithoutOrganizationInput
      | SubscriptionUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type OrganizationMemberCreaterolesInput = {
    set: Role[]
  }

  export type UserCreateNestedOneWithoutOrganizationMemberInput = {
    create?: XOR<
      UserCreateWithoutOrganizationMemberInput,
      UserUncheckedCreateWithoutOrganizationMemberInput
    >
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationMemberInput
    connect?: UserWhereUniqueInput
  }

  export type OrganizationCreateNestedOneWithoutMembersInput = {
    create?: XOR<
      OrganizationCreateWithoutMembersInput,
      OrganizationUncheckedCreateWithoutMembersInput
    >
    connectOrCreate?: OrganizationCreateOrConnectWithoutMembersInput
    connect?: OrganizationWhereUniqueInput
  }

  export type OrganizationMemberUpdaterolesInput = {
    set?: Role[]
    push?: Role | Role[]
  }

  export type UserUpdateOneRequiredWithoutOrganizationMemberNestedInput = {
    create?: XOR<
      UserCreateWithoutOrganizationMemberInput,
      UserUncheckedCreateWithoutOrganizationMemberInput
    >
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationMemberInput
    upsert?: UserUpsertWithoutOrganizationMemberInput
    connect?: UserWhereUniqueInput
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutOrganizationMemberInput,
        UserUpdateWithoutOrganizationMemberInput
      >,
      UserUncheckedUpdateWithoutOrganizationMemberInput
    >
  }

  export type OrganizationUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<
      OrganizationCreateWithoutMembersInput,
      OrganizationUncheckedCreateWithoutMembersInput
    >
    connectOrCreate?: OrganizationCreateOrConnectWithoutMembersInput
    upsert?: OrganizationUpsertWithoutMembersInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<
      XOR<
        OrganizationUpdateToOneWithWhereWithoutMembersInput,
        OrganizationUpdateWithoutMembersInput
      >,
      OrganizationUncheckedUpdateWithoutMembersInput
    >
  }

  export type OrganizationCreateNestedOneWithoutSubscriptionInput = {
    create?: XOR<
      OrganizationCreateWithoutSubscriptionInput,
      OrganizationUncheckedCreateWithoutSubscriptionInput
    >
    connectOrCreate?: OrganizationCreateOrConnectWithoutSubscriptionInput
    connect?: OrganizationWhereUniqueInput
  }

  export type EnumSubscriptionStatusFieldUpdateOperationsInput = {
    set?: SubscriptionStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type OrganizationUpdateOneRequiredWithoutSubscriptionNestedInput = {
    create?: XOR<
      OrganizationCreateWithoutSubscriptionInput,
      OrganizationUncheckedCreateWithoutSubscriptionInput
    >
    connectOrCreate?: OrganizationCreateOrConnectWithoutSubscriptionInput
    upsert?: OrganizationUpsertWithoutSubscriptionInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<
      XOR<
        OrganizationUpdateToOneWithWhereWithoutSubscriptionInput,
        OrganizationUpdateWithoutSubscriptionInput
      >,
      OrganizationUncheckedUpdateWithoutSubscriptionInput
    >
  }

  export type ContactCreatetagsInput = {
    set: string[]
  }

  export type ContactUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserCreateNestedOneWithoutActivityInput = {
    create?: XOR<
      UserCreateWithoutActivityInput,
      UserUncheckedCreateWithoutActivityInput
    >
    connectOrCreate?: UserCreateOrConnectWithoutActivityInput
    connect?: UserWhereUniqueInput
  }

  export type EnumActivityTypeFieldUpdateOperationsInput = {
    set?: ActivityType
  }

  export type UserUpdateOneRequiredWithoutActivityNestedInput = {
    create?: XOR<
      UserCreateWithoutActivityInput,
      UserUncheckedCreateWithoutActivityInput
    >
    connectOrCreate?: UserCreateOrConnectWithoutActivityInput
    upsert?: UserUpsertWithoutActivityInput
    connect?: UserWhereUniqueInput
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutActivityInput,
        UserUpdateWithoutActivityInput
      >,
      UserUncheckedUpdateWithoutActivityInput
    >
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?:
      | SubscriptionStatus
      | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?:
      | SubscriptionStatus[]
      | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?:
      | SubscriptionStatus[]
      | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | SubscriptionStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumSubscriptionStatusWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | SubscriptionStatus
      | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?:
      | SubscriptionStatus[]
      | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?:
      | SubscriptionStatus[]
      | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?:
      | NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel>
      | SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
      in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
      notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
      lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
      lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
      gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
      gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
      not?:
        | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
        | Date
        | string
        | null
      _count?: NestedIntNullableFilter<$PrismaModel>
      _min?: NestedDateTimeNullableFilter<$PrismaModel>
      _max?: NestedDateTimeNullableFilter<$PrismaModel>
    }

  export type NestedEnumActivityTypeFilter<$PrismaModel = never> = {
    equals?: ActivityType | EnumActivityTypeFieldRefInput<$PrismaModel>
    in?: ActivityType[] | ListEnumActivityTypeFieldRefInput<$PrismaModel>
    notIn?: ActivityType[] | ListEnumActivityTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumActivityTypeFilter<$PrismaModel> | ActivityType
  }

  export type NestedEnumActivityTypeWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: ActivityType | EnumActivityTypeFieldRefInput<$PrismaModel>
      in?: ActivityType[] | ListEnumActivityTypeFieldRefInput<$PrismaModel>
      notIn?: ActivityType[] | ListEnumActivityTypeFieldRefInput<$PrismaModel>
      not?:
        | NestedEnumActivityTypeWithAggregatesFilter<$PrismaModel>
        | ActivityType
      _count?: NestedIntFilter<$PrismaModel>
      _min?: NestedEnumActivityTypeFilter<$PrismaModel>
      _max?: NestedEnumActivityTypeFilter<$PrismaModel>
    }

  export type OrganizationCreateWithoutUserInput = {
    id?: string
    name: string
    slug: string
    plan?: string | null
    email?: string | null
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: OrganizationMemberCreateNestedManyWithoutOrganizationInput
    Subscription?: SubscriptionCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    slug: string
    plan?: string | null
    email?: string | null
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: OrganizationMemberUncheckedCreateNestedManyWithoutOrganizationInput
    Subscription?: SubscriptionUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutUserInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<
      OrganizationCreateWithoutUserInput,
      OrganizationUncheckedCreateWithoutUserInput
    >
  }

  export type OrganizationCreateManyUserInputEnvelope = {
    data: OrganizationCreateManyUserInput | OrganizationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationMemberCreateWithoutUserInput = {
    id?: string
    roles?: OrganizationMemberCreaterolesInput | Role[]
    organization: OrganizationCreateNestedOneWithoutMembersInput
  }

  export type OrganizationMemberUncheckedCreateWithoutUserInput = {
    id?: string
    organizationId: string
    roles?: OrganizationMemberCreaterolesInput | Role[]
  }

  export type OrganizationMemberCreateOrConnectWithoutUserInput = {
    where: OrganizationMemberWhereUniqueInput
    create: XOR<
      OrganizationMemberCreateWithoutUserInput,
      OrganizationMemberUncheckedCreateWithoutUserInput
    >
  }

  export type OrganizationMemberCreateManyUserInputEnvelope = {
    data:
      | OrganizationMemberCreateManyUserInput
      | OrganizationMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ActivityCreateWithoutUserInput = {
    id?: string
    type: ActivityType
    data: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActivityUncheckedCreateWithoutUserInput = {
    id?: string
    type: ActivityType
    data: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActivityCreateOrConnectWithoutUserInput = {
    where: ActivityWhereUniqueInput
    create: XOR<
      ActivityCreateWithoutUserInput,
      ActivityUncheckedCreateWithoutUserInput
    >
  }

  export type ActivityCreateManyUserInputEnvelope = {
    data: ActivityCreateManyUserInput | ActivityCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithWhereUniqueWithoutUserInput = {
    where: OrganizationWhereUniqueInput
    update: XOR<
      OrganizationUpdateWithoutUserInput,
      OrganizationUncheckedUpdateWithoutUserInput
    >
    create: XOR<
      OrganizationCreateWithoutUserInput,
      OrganizationUncheckedCreateWithoutUserInput
    >
  }

  export type OrganizationUpdateWithWhereUniqueWithoutUserInput = {
    where: OrganizationWhereUniqueInput
    data: XOR<
      OrganizationUpdateWithoutUserInput,
      OrganizationUncheckedUpdateWithoutUserInput
    >
  }

  export type OrganizationUpdateManyWithWhereWithoutUserInput = {
    where: OrganizationScalarWhereInput
    data: XOR<
      OrganizationUpdateManyMutationInput,
      OrganizationUncheckedUpdateManyWithoutUserInput
    >
  }

  export type OrganizationScalarWhereInput = {
    AND?: OrganizationScalarWhereInput | OrganizationScalarWhereInput[]
    OR?: OrganizationScalarWhereInput[]
    NOT?: OrganizationScalarWhereInput | OrganizationScalarWhereInput[]
    id?: StringFilter<'Organization'> | string
    name?: StringFilter<'Organization'> | string
    slug?: StringFilter<'Organization'> | string
    plan?: StringNullableFilter<'Organization'> | string | null
    email?: StringNullableFilter<'Organization'> | string | null
    logo?: StringNullableFilter<'Organization'> | string | null
    createdAt?: DateTimeFilter<'Organization'> | Date | string
    updatedAt?: DateTimeFilter<'Organization'> | Date | string
    userId?: StringNullableFilter<'Organization'> | string | null
  }

  export type OrganizationMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: OrganizationMemberWhereUniqueInput
    update: XOR<
      OrganizationMemberUpdateWithoutUserInput,
      OrganizationMemberUncheckedUpdateWithoutUserInput
    >
    create: XOR<
      OrganizationMemberCreateWithoutUserInput,
      OrganizationMemberUncheckedCreateWithoutUserInput
    >
  }

  export type OrganizationMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: OrganizationMemberWhereUniqueInput
    data: XOR<
      OrganizationMemberUpdateWithoutUserInput,
      OrganizationMemberUncheckedUpdateWithoutUserInput
    >
  }

  export type OrganizationMemberUpdateManyWithWhereWithoutUserInput = {
    where: OrganizationMemberScalarWhereInput
    data: XOR<
      OrganizationMemberUpdateManyMutationInput,
      OrganizationMemberUncheckedUpdateManyWithoutUserInput
    >
  }

  export type OrganizationMemberScalarWhereInput = {
    AND?:
      | OrganizationMemberScalarWhereInput
      | OrganizationMemberScalarWhereInput[]
    OR?: OrganizationMemberScalarWhereInput[]
    NOT?:
      | OrganizationMemberScalarWhereInput
      | OrganizationMemberScalarWhereInput[]
    id?: StringFilter<'OrganizationMember'> | string
    userId?: StringFilter<'OrganizationMember'> | string
    organizationId?: StringFilter<'OrganizationMember'> | string
    roles?: EnumRoleNullableListFilter<'OrganizationMember'>
  }

  export type ActivityUpsertWithWhereUniqueWithoutUserInput = {
    where: ActivityWhereUniqueInput
    update: XOR<
      ActivityUpdateWithoutUserInput,
      ActivityUncheckedUpdateWithoutUserInput
    >
    create: XOR<
      ActivityCreateWithoutUserInput,
      ActivityUncheckedCreateWithoutUserInput
    >
  }

  export type ActivityUpdateWithWhereUniqueWithoutUserInput = {
    where: ActivityWhereUniqueInput
    data: XOR<
      ActivityUpdateWithoutUserInput,
      ActivityUncheckedUpdateWithoutUserInput
    >
  }

  export type ActivityUpdateManyWithWhereWithoutUserInput = {
    where: ActivityScalarWhereInput
    data: XOR<
      ActivityUpdateManyMutationInput,
      ActivityUncheckedUpdateManyWithoutUserInput
    >
  }

  export type ActivityScalarWhereInput = {
    AND?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    OR?: ActivityScalarWhereInput[]
    NOT?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    id?: StringFilter<'Activity'> | string
    userId?: StringFilter<'Activity'> | string
    type?: EnumActivityTypeFilter<'Activity'> | ActivityType
    data?: StringFilter<'Activity'> | string
    date?: DateTimeFilter<'Activity'> | Date | string
    createdAt?: DateTimeFilter<'Activity'> | Date | string
    updatedAt?: DateTimeFilter<'Activity'> | Date | string
  }

  export type OrganizationMemberCreateWithoutOrganizationInput = {
    id?: string
    roles?: OrganizationMemberCreaterolesInput | Role[]
    user: UserCreateNestedOneWithoutOrganizationMemberInput
  }

  export type OrganizationMemberUncheckedCreateWithoutOrganizationInput = {
    id?: string
    userId: string
    roles?: OrganizationMemberCreaterolesInput | Role[]
  }

  export type OrganizationMemberCreateOrConnectWithoutOrganizationInput = {
    where: OrganizationMemberWhereUniqueInput
    create: XOR<
      OrganizationMemberCreateWithoutOrganizationInput,
      OrganizationMemberUncheckedCreateWithoutOrganizationInput
    >
  }

  export type OrganizationMemberCreateManyOrganizationInputEnvelope = {
    data:
      | OrganizationMemberCreateManyOrganizationInput
      | OrganizationMemberCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutOrganizationsInput = {
    id?: string
    email: string
    firstName?: string | null
    lastName?: string | null
    name?: string | null
    status?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    OrganizationMember?: OrganizationMemberCreateNestedManyWithoutUserInput
    Activity?: ActivityCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrganizationsInput = {
    id?: string
    email: string
    firstName?: string | null
    lastName?: string | null
    name?: string | null
    status?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    OrganizationMember?: OrganizationMemberUncheckedCreateNestedManyWithoutUserInput
    Activity?: ActivityUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrganizationsInput = {
    where: UserWhereUniqueInput
    create: XOR<
      UserCreateWithoutOrganizationsInput,
      UserUncheckedCreateWithoutOrganizationsInput
    >
  }

  export type SubscriptionCreateWithoutOrganizationInput = {
    id?: string
    plan: string
    status: SubscriptionStatus
    startedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUncheckedCreateWithoutOrganizationInput = {
    id?: string
    plan: string
    status: SubscriptionStatus
    startedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateOrConnectWithoutOrganizationInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<
      SubscriptionCreateWithoutOrganizationInput,
      SubscriptionUncheckedCreateWithoutOrganizationInput
    >
  }

  export type SubscriptionCreateManyOrganizationInputEnvelope = {
    data:
      | SubscriptionCreateManyOrganizationInput
      | SubscriptionCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationMemberUpsertWithWhereUniqueWithoutOrganizationInput =
    {
      where: OrganizationMemberWhereUniqueInput
      update: XOR<
        OrganizationMemberUpdateWithoutOrganizationInput,
        OrganizationMemberUncheckedUpdateWithoutOrganizationInput
      >
      create: XOR<
        OrganizationMemberCreateWithoutOrganizationInput,
        OrganizationMemberUncheckedCreateWithoutOrganizationInput
      >
    }

  export type OrganizationMemberUpdateWithWhereUniqueWithoutOrganizationInput =
    {
      where: OrganizationMemberWhereUniqueInput
      data: XOR<
        OrganizationMemberUpdateWithoutOrganizationInput,
        OrganizationMemberUncheckedUpdateWithoutOrganizationInput
      >
    }

  export type OrganizationMemberUpdateManyWithWhereWithoutOrganizationInput = {
    where: OrganizationMemberScalarWhereInput
    data: XOR<
      OrganizationMemberUpdateManyMutationInput,
      OrganizationMemberUncheckedUpdateManyWithoutOrganizationInput
    >
  }

  export type UserUpsertWithoutOrganizationsInput = {
    update: XOR<
      UserUpdateWithoutOrganizationsInput,
      UserUncheckedUpdateWithoutOrganizationsInput
    >
    create: XOR<
      UserCreateWithoutOrganizationsInput,
      UserUncheckedCreateWithoutOrganizationsInput
    >
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrganizationsInput = {
    where?: UserWhereInput
    data: XOR<
      UserUpdateWithoutOrganizationsInput,
      UserUncheckedUpdateWithoutOrganizationsInput
    >
  }

  export type UserUpdateWithoutOrganizationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    OrganizationMember?: OrganizationMemberUpdateManyWithoutUserNestedInput
    Activity?: ActivityUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrganizationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    OrganizationMember?: OrganizationMemberUncheckedUpdateManyWithoutUserNestedInput
    Activity?: ActivityUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SubscriptionUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: SubscriptionWhereUniqueInput
    update: XOR<
      SubscriptionUpdateWithoutOrganizationInput,
      SubscriptionUncheckedUpdateWithoutOrganizationInput
    >
    create: XOR<
      SubscriptionCreateWithoutOrganizationInput,
      SubscriptionUncheckedCreateWithoutOrganizationInput
    >
  }

  export type SubscriptionUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: SubscriptionWhereUniqueInput
    data: XOR<
      SubscriptionUpdateWithoutOrganizationInput,
      SubscriptionUncheckedUpdateWithoutOrganizationInput
    >
  }

  export type SubscriptionUpdateManyWithWhereWithoutOrganizationInput = {
    where: SubscriptionScalarWhereInput
    data: XOR<
      SubscriptionUpdateManyMutationInput,
      SubscriptionUncheckedUpdateManyWithoutOrganizationInput
    >
  }

  export type SubscriptionScalarWhereInput = {
    AND?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    OR?: SubscriptionScalarWhereInput[]
    NOT?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    id?: StringFilter<'Subscription'> | string
    organizationId?: StringFilter<'Subscription'> | string
    plan?: StringFilter<'Subscription'> | string
    status?: EnumSubscriptionStatusFilter<'Subscription'> | SubscriptionStatus
    startedAt?: DateTimeNullableFilter<'Subscription'> | Date | string | null
    trialEndsAt?: DateTimeNullableFilter<'Subscription'> | Date | string | null
    createdAt?: DateTimeFilter<'Subscription'> | Date | string
    updatedAt?: DateTimeFilter<'Subscription'> | Date | string
  }

  export type UserCreateWithoutOrganizationMemberInput = {
    id?: string
    email: string
    firstName?: string | null
    lastName?: string | null
    name?: string | null
    status?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizations?: OrganizationCreateNestedManyWithoutUserInput
    Activity?: ActivityCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrganizationMemberInput = {
    id?: string
    email: string
    firstName?: string | null
    lastName?: string | null
    name?: string | null
    status?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizations?: OrganizationUncheckedCreateNestedManyWithoutUserInput
    Activity?: ActivityUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrganizationMemberInput = {
    where: UserWhereUniqueInput
    create: XOR<
      UserCreateWithoutOrganizationMemberInput,
      UserUncheckedCreateWithoutOrganizationMemberInput
    >
  }

  export type OrganizationCreateWithoutMembersInput = {
    id?: string
    name: string
    slug: string
    plan?: string | null
    email?: string | null
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    User?: UserCreateNestedOneWithoutOrganizationsInput
    Subscription?: SubscriptionCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    slug: string
    plan?: string | null
    email?: string | null
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    Subscription?: SubscriptionUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutMembersInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<
      OrganizationCreateWithoutMembersInput,
      OrganizationUncheckedCreateWithoutMembersInput
    >
  }

  export type UserUpsertWithoutOrganizationMemberInput = {
    update: XOR<
      UserUpdateWithoutOrganizationMemberInput,
      UserUncheckedUpdateWithoutOrganizationMemberInput
    >
    create: XOR<
      UserCreateWithoutOrganizationMemberInput,
      UserUncheckedCreateWithoutOrganizationMemberInput
    >
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrganizationMemberInput = {
    where?: UserWhereInput
    data: XOR<
      UserUpdateWithoutOrganizationMemberInput,
      UserUncheckedUpdateWithoutOrganizationMemberInput
    >
  }

  export type UserUpdateWithoutOrganizationMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizations?: OrganizationUpdateManyWithoutUserNestedInput
    Activity?: ActivityUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrganizationMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizations?: OrganizationUncheckedUpdateManyWithoutUserNestedInput
    Activity?: ActivityUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OrganizationUpsertWithoutMembersInput = {
    update: XOR<
      OrganizationUpdateWithoutMembersInput,
      OrganizationUncheckedUpdateWithoutMembersInput
    >
    create: XOR<
      OrganizationCreateWithoutMembersInput,
      OrganizationUncheckedCreateWithoutMembersInput
    >
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutMembersInput = {
    where?: OrganizationWhereInput
    data: XOR<
      OrganizationUpdateWithoutMembersInput,
      OrganizationUncheckedUpdateWithoutMembersInput
    >
  }

  export type OrganizationUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneWithoutOrganizationsNestedInput
    Subscription?: SubscriptionUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    Subscription?: SubscriptionUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateWithoutSubscriptionInput = {
    id?: string
    name: string
    slug: string
    plan?: string | null
    email?: string | null
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: OrganizationMemberCreateNestedManyWithoutOrganizationInput
    User?: UserCreateNestedOneWithoutOrganizationsInput
  }

  export type OrganizationUncheckedCreateWithoutSubscriptionInput = {
    id?: string
    name: string
    slug: string
    plan?: string | null
    email?: string | null
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    members?: OrganizationMemberUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutSubscriptionInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<
      OrganizationCreateWithoutSubscriptionInput,
      OrganizationUncheckedCreateWithoutSubscriptionInput
    >
  }

  export type OrganizationUpsertWithoutSubscriptionInput = {
    update: XOR<
      OrganizationUpdateWithoutSubscriptionInput,
      OrganizationUncheckedUpdateWithoutSubscriptionInput
    >
    create: XOR<
      OrganizationCreateWithoutSubscriptionInput,
      OrganizationUncheckedCreateWithoutSubscriptionInput
    >
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutSubscriptionInput = {
    where?: OrganizationWhereInput
    data: XOR<
      OrganizationUpdateWithoutSubscriptionInput,
      OrganizationUncheckedUpdateWithoutSubscriptionInput
    >
  }

  export type OrganizationUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: OrganizationMemberUpdateManyWithoutOrganizationNestedInput
    User?: UserUpdateOneWithoutOrganizationsNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    members?: OrganizationMemberUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type UserCreateWithoutActivityInput = {
    id?: string
    email: string
    firstName?: string | null
    lastName?: string | null
    name?: string | null
    status?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizations?: OrganizationCreateNestedManyWithoutUserInput
    OrganizationMember?: OrganizationMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutActivityInput = {
    id?: string
    email: string
    firstName?: string | null
    lastName?: string | null
    name?: string | null
    status?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizations?: OrganizationUncheckedCreateNestedManyWithoutUserInput
    OrganizationMember?: OrganizationMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutActivityInput = {
    where: UserWhereUniqueInput
    create: XOR<
      UserCreateWithoutActivityInput,
      UserUncheckedCreateWithoutActivityInput
    >
  }

  export type UserUpsertWithoutActivityInput = {
    update: XOR<
      UserUpdateWithoutActivityInput,
      UserUncheckedUpdateWithoutActivityInput
    >
    create: XOR<
      UserCreateWithoutActivityInput,
      UserUncheckedCreateWithoutActivityInput
    >
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActivityInput = {
    where?: UserWhereInput
    data: XOR<
      UserUpdateWithoutActivityInput,
      UserUncheckedUpdateWithoutActivityInput
    >
  }

  export type UserUpdateWithoutActivityInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizations?: OrganizationUpdateManyWithoutUserNestedInput
    OrganizationMember?: OrganizationMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutActivityInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizations?: OrganizationUncheckedUpdateManyWithoutUserNestedInput
    OrganizationMember?: OrganizationMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OrganizationCreateManyUserInput = {
    id?: string
    name: string
    slug: string
    plan?: string | null
    email?: string | null
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationMemberCreateManyUserInput = {
    id?: string
    organizationId: string
    roles?: OrganizationMemberCreaterolesInput | Role[]
  }

  export type ActivityCreateManyUserInput = {
    id?: string
    type: ActivityType
    data: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: OrganizationMemberUpdateManyWithoutOrganizationNestedInput
    Subscription?: SubscriptionUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: OrganizationMemberUncheckedUpdateManyWithoutOrganizationNestedInput
    Subscription?: SubscriptionUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationMemberUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    roles?: OrganizationMemberUpdaterolesInput | Role[]
    organization?: OrganizationUpdateOneRequiredWithoutMembersNestedInput
  }

  export type OrganizationMemberUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    roles?: OrganizationMemberUpdaterolesInput | Role[]
  }

  export type OrganizationMemberUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    roles?: OrganizationMemberUpdaterolesInput | Role[]
  }

  export type ActivityUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumActivityTypeFieldUpdateOperationsInput | ActivityType
    data?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumActivityTypeFieldUpdateOperationsInput | ActivityType
    data?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumActivityTypeFieldUpdateOperationsInput | ActivityType
    data?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationMemberCreateManyOrganizationInput = {
    id?: string
    userId: string
    roles?: OrganizationMemberCreaterolesInput | Role[]
  }

  export type SubscriptionCreateManyOrganizationInput = {
    id?: string
    plan: string
    status: SubscriptionStatus
    startedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationMemberUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    roles?: OrganizationMemberUpdaterolesInput | Role[]
    user?: UserUpdateOneRequiredWithoutOrganizationMemberNestedInput
  }

  export type OrganizationMemberUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    roles?: OrganizationMemberUpdaterolesInput | Role[]
  }

  export type OrganizationMemberUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    roles?: OrganizationMemberUpdaterolesInput | Role[]
  }

  export type SubscriptionUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?:
      | EnumSubscriptionStatusFieldUpdateOperationsInput
      | SubscriptionStatus
    startedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null
    trialEndsAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?:
      | EnumSubscriptionStatusFieldUpdateOperationsInput
      | SubscriptionStatus
    startedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null
    trialEndsAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?:
      | EnumSubscriptionStatusFieldUpdateOperationsInput
      | SubscriptionStatus
    startedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null
    trialEndsAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
