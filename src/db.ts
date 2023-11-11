import { drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { Database } from 'bun:sqlite'

export const sqlite = new Database('town.db', { create: true });
export const db = drizzle(sqlite)

await (
  async () => {
    migrate(db, { migrationsFolder: './drizzle' })
  }
)()

console.log('finished')
