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


// XXX: Add Name?
export const user = sqliteTable("user", {
	id: text("id").primaryKey()
	// other user attributes
});

export const session = sqliteTable("user_session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	activeExpires: blob("active_expires", {
		mode: "bigint"
	}).notNull(),
	idleExpires: blob("idle_expires", {
		mode: "bigint"
	}).notNull()
});

export const key = sqliteTable("user_key", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	hashedPassword: text("hashed_password")
});

export type Post = InferSelectModel<typeof post>



