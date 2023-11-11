import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.html(
  <html>
    <head>
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
