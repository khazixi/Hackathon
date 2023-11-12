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
  <nav class='mb-2'>
    <ul class='list-none'>
      <li class='ml-auto bg-white p-2 mr-2 rounded-sm w-20 text-center'> Sign In </li>
    </ul>
  </nav>
);

type ErrorLoginProps = {
  reason: string
}

export const ErrorLogin = (props: ErrorLoginProps) => (
  <div class='bg-red-300'>
    <h1 class='text-red-700 font-bold'> There was an error </h1>
    <h3 class='text-red-600 font-semibold'> Reason {props.reason} </h3>
  </div>
)
