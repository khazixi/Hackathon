import { Hono } from 'hono'
import { db } from './db'
import { Post, post } from './schema'
import { FC } from 'hono/jsx'
import { type } from 'os'

const app = new Hono()

const Layout: FC = (props) => (
  <html>
    <head>
      <script src="https://unpkg.com/htmx.org@1.9.8" integrity="sha384-rgjA7mptc2ETQqXoYC3/zJvkU7K/aP44Y+z7xQuJiVnB/422P/Ak+F/AqFR7E4Wr" crossorigin="anonymous"></script>
      <title> HI </title>
    </head>
    <body>
      <main>
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
      <h1> News </h1>
      {posts.map(v => preview(v))}
    </Layout>
  )
})

// TODO: Replace with an HX-BOOST?
app.get('/create', (c) => {
  return c.html(
    <Layout>
      <h1> Create Post</h1>
      <form hx-post="/create" hx-encoding='multipart/form-data'>
        <label for='title'> Title </label>
        <input type='text' name='title' placeholder='Title' />
        <br />

        <label> Image </label>
        <input type='file' accept='image/png, image/jpeg, image/gif' name='image' />
        <br />

        <label> Category </label>
        <input type='text' name='category' placeholder='Category' />
        <br />

        <label> Description </label>
        <input type='text' name='description' placeholder='Description' />
        <br />

        <label> Author </label>
        <input type='text' name='author' placeholder='Author' />
        <br />

        <label> City </label>
        <input type='text' name='city' placeholder='City' />
        <br />

        <label> State </label>
        <input type='text' name='state' placeholder='State' />
        <br />

        <button type='submit'> Submit </button>
      </form>
    </Layout>
  )
})

// TODO: Add Validation Logic?
app.post('/create', async (c) => {
  const data = await c.req.parseBody()
  const date = new Date()

  let image
  if (data['image'] && typeof data['image'] == 'object') {
    const temp = data['image'] as Blob
    image = Buffer.from(await temp.arrayBuffer())
  } else {
    image = null
  }

  await db
  .insert(post)
  .values({
    date: date.toISOString(),
    title: data['title'] as string,
    category: data['category'] as string,
    description: data['description'] as string,
    author: data['author'] as string,
    city: data['city'] as string,
    state: data['state'] as string,
    image: image,
  })

  return c.text(
    JSON.stringify('Thanks')
  )
})

// app.get('/preview', (c) =>
//   c.text(db.filename)
// )

export default app
