import { Hono } from 'hono'
import { db } from '../db'
import { post } from '../schema'
import { Layout } from '../templates'
import { auth } from '../lucia'

export const create = new Hono()

create.get('/', (c) => {
  return c.html(
    <Layout>
      <form hx-post="/create" hx-encoding='multipart/form-data' class='bg-white flex flex-col m-4 rounded py-4 px-16 gap-4'>
        <h1 class='text-center text-4xl col-span-2'> Create Post</h1>

        <div class=''>
          <label for='title' class='bg-gray-300 py-2 px-1'> Title </label>
          <input class='border solid border-gray-300 p-1' type='text' name='title' placeholder='Title' />
        </div>

        <label> Image </label>
        <input class='border solid border-gray-300 py-2 ' type='file' accept='image/png, image/jpeg, image/gif' name='image' />

        <div>
          <label class='bg-gray-300 py-2 px-1'> Category </label>
          <input class='border solid border-gray-300 p-1' type='text' name='category' placeholder='Category' />
        </div>

        <label> Description </label>
        <textarea placeholder='Description' name='description' class='border solid border-black '>

        </textarea>

        <div>
          <label class='bg-gray-300 py-2 px-1'> City </label>
          <input class='border solid border-gray-300 p-1' type='text' name='city' placeholder='City' />
        </div>

        <div>
          <label class='bg-gray-300 py-2 px-1'> State </label>
          <input class='border solid border-gray-300 p-1' type='text' name='state' placeholder='State' />
        </div>

        <button type='submit' class='p-4 border border-gray-200 w-32 self-center'> Submit </button>
        <a href='/'> Back </a>
      </form>
    </Layout>
  )
})

// TODO: Add Validation Logic?
create.post('/', async (c) => {
  const data = await c.req.parseBody()
  const date = new Date()

  const authRequest = auth.handleRequest(c)
  const session = await authRequest.validate()

  if (!session) {
    return c.html(
      <div class='bg-red-300'>
        <h1 class='text-3xl text-red-900'> You Must Be logged In to Post!</h1>
      </div>
    )
  }

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
      author: session.user.username,
      city: data['city'] as string,
      state: data['state'] as string,
      image: image,
    })

  return c.html(
    <a href='/'> Back </a>
  )
})
