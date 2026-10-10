// node:sqlite ships with Node 22.5+; the repo's @types/node predates it.
declare module "node:sqlite" {
  export class DatabaseSync {
    constructor(path: string, options?: { readOnly?: boolean })
    prepare(sql: string): {
      get(...params: unknown[]): unknown
      all(...params: unknown[]): unknown[]
    }
  }
}
