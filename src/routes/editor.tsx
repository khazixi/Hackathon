import { Hono } from "hono";
import { db } from "../db";
import { post } from "../schema";
import { auth } from "../lucia";
import { entityKind, eq } from "drizzle-orm";
import { EditorPreview, Layout, ManagePreview } from "../templates";

export const editor = new Hono()

editor.get('/', async c => {
  const authRequest = auth.handleRequest(c)
  const session = await authRequest.validate()

  if (!session) {
    return c.redirect('/login')
  }

  const posts = await db
    .select()
    .from(post)
    .where(eq(session.user.username, post.author))

  return c.html(
    <Layout>
      {
        posts.map(v => ManagePreview(v))
      }
    </Layout>
  )
})

editor.get('/:id', async c => {
  const id = parseInt(c.req.param('id'))
  const poste = await db.select().from(post).where(eq(post.id, id))
  return c.html(EditorPreview(poste[0]))
})

editor.get('/original/:id', async c => {
  const id = parseInt(c.req.param('id'))
  const poste = await db.select().from(post).where(eq(post.id, id))
  return c.html(ManagePreview(poste[0]))
})

editor.patch('/:id', async c => {
  const id = parseInt(c.req.param('id'))
  const data = await c.req.parseBody()

  const poste = await db.update(post).set({
    author: data['author'] as string,
    description: data['description'] as string,
    category: data['category'] as string,
    city: data['city'] as string,
    state: data['state'] as string,
    title: data['title'] as string,
  })
    .where(eq(post.id, id))
    .returning()

  return c.html(ManagePreview(poste[0]))
})

editor.delete('/:id', async c => {
  const id = parseInt(c.req.param('id'))
  const res = await db.delete(post)
    .where(eq(post.id, id))
  if (res)
    return c.html("Delted Successfully")
  else
    return c.html("Fuck")
})
