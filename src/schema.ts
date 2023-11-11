import { InferSelectModel } from "drizzle-orm";
import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const post = sqliteTable('post', {
  id: integer('id').primaryKey(),
  date: text('date').notNull(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  description: text('description').notNull(),
  author: text('author').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  image: blob('image', { mode: 'buffer' })
})

export type Post = InferSelectModel<typeof post>



