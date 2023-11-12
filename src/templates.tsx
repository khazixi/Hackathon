import { FC } from 'hono/jsx'
export const Layout: FC = (props) => (
  <html>
    <head>
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
