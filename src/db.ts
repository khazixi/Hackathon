import { drizzle } from 'drizzle-orm/libsql'
import { migrate } from 'drizzle-orm/libsql/migrator'
import { createClient } from "@libsql/client";


// import { Database } from 'bun:sqlite'

// export const sqlite = new Database('town.db', { create: true });
export const sqlite = createClient({
  url: 'file:town.db'
})
export const db = drizzle(sqlite)

await (
  async () => {
    migrate(db, { migrationsFolder: './drizzle' })
  }
)()
