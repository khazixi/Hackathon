import { Hono } from 'hono'
import { db } from './db'
import { Post, post } from './schema'
import { FC } from 'hono/jsx'
import { create } from './routes/create'
import { serveStatic } from 'hono/bun'
import { content } from './routes/content'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))
app.route('/create', create)
app.route('/content', content)

const Layout: FC = (props) => (
  <html>
    <head>
      {/*
      <link href='styles.css' rel='stylesheet' />
      */}
      <title> HI </title>
      <script src="https://unpkg.com/htmx.org@1.9.8" integrity="sha384-rgjA7mptc2ETQqXoYC3/zJvkU7K/aP44Y+z7xQuJiVnB/422P/Ak+F/AqFR7E4Wr" crossorigin="anonymous"></script>
      <script src="https://cdn.tailwindcss.com"></script>

    </head>
    <body>
      <main class='h-screen bg-[#2A2727]'>
        {props.children}
      </main>
    </body>
  </html>
)

// TODO: Find out how to work with blobs and images
const preview = (props: Post) => (
  <div>
    <h2> {props.title} </h2>
    <h3> By {props.author} </h3>
    <p> {props.description} </p>
  </div>
)

app.get('/', async (c) => {
  const posts = await db.select().from(post)
  return c.html(
    <Layout>
      <h1 class='text-lg'> News </h1>
      {posts.map(v => preview(v))}
    </Layout>
  )
})


// TODO: Replace with an HX-BOOST?

export default app
