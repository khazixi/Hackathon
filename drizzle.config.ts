import type { Config } from 'drizzle-kit'

export default {
  schema: './src/schema.ts',
  driver: 'better-sqlite',
  out: './drizzle',
  dbCredentials: {
    url: './town.db'
  }
} satisfies Config
