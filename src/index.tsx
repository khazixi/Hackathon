import { Hono } from 'hono'
import { db } from './db'
import { Post, post } from './schema'

import { create } from './routes/create'
import { serveStatic } from 'hono/bun'
import { content } from './routes/content'

import { Layout } from './templates'

const app = new Hono()

app.get('/static/*', serveStatic({ root: './src' }))
app.route('/create', create)
app.route('/content', content)

// TODO: Find out how to work with blobs and images
const preview = (props: Post) => (
  <div class='bg-white text-black p-4 m-4 rounded-lg' hx-get={`/content/${props.id}`}>
    <h2 class='text-2xl'> {props.title} </h2>
    <h3 class='text-lg text-gray-300'> By {props.author} </h3>
    <p> {props.description} </p>
  </div>
)

app.get('/', async (c) => {
  const posts = await db.select().from(post)
  return c.html(
    <Layout>
      <div class='flex flex-col items-center'>
        <h1 class='text-4xl text-white font-bold text-center'> News </h1>
        {posts.map(v => preview(v))}
        <a href='/create' class='bg-white text-black p-4'> + </a>
      </div>
    </Layout>

  )
})


// TODO: Replace with an HX-BOOST?

export default app
