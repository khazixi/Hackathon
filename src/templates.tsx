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
)

export const Preview = (props: Post) => (
  <div class='bg-white text-black p-4 m-4 rounded-lg' hx-get={`/content/${props.id}`}>
    <h2 class='text-2xl'> {props.title} </h2>
    <h3 class='text-lg text-gray-300'> By {props.author} </h3>
    <p> {props.description} </p>
  </div>
)
