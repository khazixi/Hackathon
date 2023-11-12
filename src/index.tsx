import { Hono } from 'hono'
import { db } from './db'
import { post } from './schema'
import { Layout, Navbar, Preview } from './templates'
import { create } from './routes/create'
import { serveStatic } from 'hono/bun'
import { content } from './routes/content'
import { preview } from './routes/preview'
import { signup } from './routes/signup'
import { login } from './routes/login'
import { editor } from './routes/editor'

const app = new Hono()

app.get('/static/*', serveStatic({ root: './src' }))
app.route('/create', create)
app.route('/content', content)
app.route('/preview', preview)
app.route('/signup', signup)
app.route('/login', login)
app.route('/editor', editor)

app.onError((err, c) => {
  console.error(`${err}`)
  return c.text('Custom Error Message', 500)
})

app.get('/', async (c) => {
  const posts = await db.select().from(post)
  return c.html(
    <Layout>
      <Navbar />
      <div class='flex flex-col items-center'>
        <h1 class='text-4xl text-white font-bold text-center'> News </h1>
        {posts.map(v => Preview(v))}
        <a href='/create' class='bg-white text-black p-4'> + </a>
      </div>
    </Layout>
  )
})

export default app
