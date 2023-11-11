import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'

export const sqlite = new Database('town.db', { create: true });
export const db = drizzle(sqlite)
