import { Hono } from 'hono'
import { db } from '../db'
import { post } from '../schema'
import { eq } from 'drizzle-orm';
import { PostContent } from '../templates';

export const content = new Hono();

content.get("/:id", async (c) => {
  const id = c.req.param('id');
  const result = await db.select().from(post).where(eq(post.id, Number(id)));
  return c.html(result.length ? PostContent(result[0]) : "");
})
