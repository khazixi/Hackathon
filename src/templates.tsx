import { FC } from 'hono/jsx'
import { Post } from './schema'

export const Layout: FC = (props) => (
  <html>
    <head>
      <title> HI </title>
      <script src="https://unpkg.com/htmx.org@1.9.8" integrity="sha384-rgjA7mptc2ETQqXoYC3/zJvkU7K/aP44Y+z7xQuJiVnB/422P/Ak+F/AqFR7E4Wr" crossorigin="anonymous"></script>
      <link href='/static/styles.css' rel='stylesheet' />
      <link href='/static/animations.css' rel='stylesheet' />

    </head>
    <body class='bg-[#2A2727]'>
      <main>
        {props.children}
      </main>
    </body>
  </html>
);

export const Preview = (props: Post) => (
  <div class='bg-white text-black p-4 m-4 rounded-lg min-w-[384px]'
    hx-get={`/content/${props.id}`}
    hx-swap="outerHTML"
    hx-target="this"
  >
    <h2 class='text-2xl'> {props.title} </h2>
    <h3 class='text-lg text-gray-300'> By {props.author} </h3>
    <p> {props.description} </p>
  </div>
);

export const ManagePreview = (props: Post) => (
  <div class='bg-white text-black p-4 m-4 rounded-lg min-w-[384px]'
    hx-target="this"
  >
    <h2 class='text-2xl'> {props.title} </h2>
    <h3 class='text-lg text-gray-300'> By {props.author} </h3>
    <p> {props.description} </p>

    <button hx-get={`/editor/${props.id}`} hx-swap="outerHTML"> Edit </button>
    <button hx-delete={`/editor/${props.id}`}> Delete </button>
  </div>
);

export const EditorPreview = (props: Post) => (
  <form class='bg-white text-black p-4 m-4 rounded-lg min-w-[384px]'
    hx-patch={`/editor/${props.id}`}
    hx-target="this"
    hx-swap="outerHTML"
  >
    <div class=''>
      <label for='title' class='bg-gray-300 py-2 px-1'> Title </label>
      <input class='border solid border-gray-300 p-1' type='text' name='title' placeholder='Title' />
    </div>

    <label> Image </label>
    <br/>
    <input class='border solid border-gray-300 py-2 ' type='file' accept='image/png, image/jpeg, image/gif' name='image' />

    <div>
      <label class='bg-gray-300 py-2 px-1'> Category </label>
      <input class='border solid border-gray-300 p-1' type='text' name='category' placeholder='Category' />
    </div>

    <label> Description </label>
    <br/>
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

    <button type='submit'> Save </button>
    <button hx-get={`/editor/original/${props.id}`}> Cancel </button>
  </form>
);

const toBase64 = (buf: Buffer) => btoa(buf.reduce((data: string, byte: number) => data + String.fromCharCode(byte), ""));

export const PostContent = (props: Post) => (
  <div class='bg-white text-black p-4 m-4 rounded-lg min-w-[384px]'
    hx-get={`/preview/${props.id}`}
    hx-swap="outerHTML"
    hx-target="this"
  >
    <h1>{props.title}</h1>
    <p>{`By ${props.author}: ${props.city}, ${props.state}`}</p>
    <p>{props.description}</p>
    {props.image && <img src={"data:image/png;base64," + toBase64(props.image)} class='slide-it' alt={`${props.title} Image`} />}
  </div>
);

export const Navbar = () => (
  <nav class='m-2 flex gap-2 w-fit'>
    <a href='/login' class='bg-white p-2 mr-2 rounded-sm w-20 text-center'>
      Log In
    </a>
    <a href='/signup' class='bg-white p-2 mr-2 rounded-sm w-20 text-center'>
      Sign In
    </a>
  </nav>
);

export const ErrorLogin = (prop: string) => (
  <div class='bg-red-300'>
    <h1 class='text-red-700 font-bold'> There was an error </h1>
    <h3 class='text-red-600 font-semibold'> Reason {prop} </h3>
  </div>
)
