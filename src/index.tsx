import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.html(
  <html>
    <head>
      <script src="https://unpkg.com/htmx.org@1.9.8" integrity="sha384-rgjA7mptc2ETQqXoYC3/zJvkU7K/aP44Y+z7xQuJiVnB/422P/Ak+F/AqFR7E4Wr" crossorigin="anonymous"></script>
      <title> HI </title>
    </head>
    <body>
      <main>
        <h1> HI </h1>
        <h2> Hello UMASS </h2>
      </main>
    </body>
  </html>
))

export default app
