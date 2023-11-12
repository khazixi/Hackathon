import { Hono } from 'hono'
import { db } from '../db'
import { post, Post } from '../schema'
import { eq } from 'drizzle-orm';

export const content = new Hono();

const toBase64 = (buf: Buffer) => btoa(buf.reduce((data: string, byte: number) => data + String.fromCharCode(byte), ""));

const postContent = (p: Post) => (
    <div hx-get={`/preview/${p.id}`}>
        <h1>{p.title}</h1>
        <p>{`By ${p.author}: ${p.city}, ${p.state}`}</p>
        <p>{p.description}</p>
        {p.image && <img src={"data:image/png;base64," + toBase64(p.image)} alt={`${p.title} Image`}/> }
    </div>
);

content.get("/:id", async (c) => {
    const id = c.req.param('id');
    const result = await db.select().from(post).where(eq(post.id, Number(id)));
    return c.html(result.length ? postContent(result[0]) : "");
})
