import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { post } from "../schema";
import { db } from "../db";
import { Preview } from "../templates";

export const preview = new Hono()

preview.get('/:id', async (c) => {
    const id = c.req.param('id');
    const result = await db.select().from(post).where(eq(post.id, Number(id)));
    return c.html(result.length ? Preview(result[0]) : "");
})
