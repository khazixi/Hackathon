import { Hono } from "hono";
import { ErrorLogin, Layout } from "../templates";
import { auth } from "../lucia";

export const signup = new Hono()



signup.post("/", async (c) => {
  const { username, password } = await c.req.parseBody();

  if (typeof username !== 'string' ||
    typeof password !== 'string'
  ) {
    return c.html(ErrorLogin(
      { reason: 'Invalid Username/Password Submission' }
    ))
  }

  // TODO: This should be a string by this time
  username as string
  password as string

  if (8 > username.length || 8 > password.length) {
    return c.html(ErrorLogin(
      { reason: 'Username/Password to short' }
    ), 400)
  }

  if (64 < username.length || 64 < password.length) {
    return c.html(ErrorLogin(
      { reason: 'Username/Password to long' }
    ), 400)
  }

  try {
    const user = await auth.createUser({
      key: {
        providerId: 'username',
        providerUserId: username.toLowerCase(),
        password: password,
      },
      attributes: {
        username
      }
    })

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {}
    })

    const authRequest = auth.handleRequest(c)
    authRequest.setSession(session)

    return c.redirect('/login', 302);
  } catch (e) {
    if (e instanceof Error) {
      return c.html(ErrorLogin({ reason: e.message }), 400)
    }
    return c.html(ErrorLogin({ reason: 'Unknown Error' }), 400)
  }
});

signup.get('/', (c) => c.html(
  <Layout>
    <div>
      <form hx-post="/signup">
        <label> Username </label>
        <input type="text" name="username" />

        <label> Password </label>
        <input type="password" name="password" />
      </form>
    </div>
  </Layout>
));
