import { Hono } from 'hono'
import { db } from './db'
import { Post, post } from './schema'
import { FC } from 'hono/jsx'
import { create } from './routes/create'
import { serveStatic } from 'hono/bun'
import { content } from './routes/content'

const app = new Hono()

app.get('/static/*', serveStatic({ root: './src' }))
app.route('/create', create)
app.route('/content', content)

const Layout: FC = (props) => (
  <html>
    <head>
      {/*
      <script src="https://cdn.tailwindcss.com"></script>
      */}
      <title> HI </title>
      <script src="https://unpkg.com/htmx.org@1.9.8" integrity="sha384-rgjA7mptc2ETQqXoYC3/zJvkU7K/aP44Y+z7xQuJiVnB/422P/Ak+F/AqFR7E4Wr" crossorigin="anonymous"></script>
      <link href='/static/styles.css' rel='stylesheet' />

    </head>
    <body class='bg-[#2A2727]'>
      <main>
        {props.children}
      </main>
    </body>
  </html>
)

// TODO: Find out how to work with blobs and images
const preview = (props: Post) => (
  <div class='bg-white text-black p-4 m-4 rounded-lg'>
    <h2 class='text-2xl'> {props.title} </h2>
    <h3 class='text-lg text-gray-300'> By {props.author} </h3>
    <p> {props.description} </p>
  </div>
)

app.get('/', async (c) => {
  const posts = await db.select().from(post)
  return c.html(
    <Layout>
      <h1 class='text-4xl text-white font-bold text-center'> News </h1>
      {posts.map(v => preview(v))}
      <p class='text-purple-50'> why</p>
    </Layout>

  )
})


// TODO: Replace with an HX-BOOST?

export default app
