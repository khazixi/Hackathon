import { Hono } from 'hono'
import { db } from '../db'
import { post } from '../schema'
import { FC } from 'hono/jsx'

export const create = new Hono()

const Layout: FC = (props) => (
  <html>
    <head>
      <script src="https://unpkg.com/htmx.org@1.9.8" integrity="sha384-rgjA7mptc2ETQqXoYC3/zJvkU7K/aP44Y+z7xQuJiVnB/422P/Ak+F/AqFR7E4Wr" crossorigin="anonymous"></script>
      <link href='styles.css' rel='stylesheet' />
      <title> HI </title>
    </head>
    <body>
      <main class='bg-black'>
        {props.children}
      </main>
    </body>
  </html>
)

create.get('/', (c) => {
  return c.html(
    <Layout>
      <h1> Create Post</h1>
      <form hx-post="/create" hx-encoding='multipart/form-data' class='bg-red-50'>
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
create.post('/', async (c) => {
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
