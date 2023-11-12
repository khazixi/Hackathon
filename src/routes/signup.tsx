import { Hono } from "hono";
import { Layout } from "../templates";
import { auth } from "../lucia";

export const signup = new Hono()

signup.get('/', (c) => c.html(
  <Layout>
    <div class="bg-white text-black mx-auto rounded-lg w-64">
      <form method="post" action="/signup" class="flex flex-col justify-center gap-4">
        <h1> Sign Up </h1>
        <label> Username </label>
        <input type="text" name="username" />

        <label> Password </label>
        <input type="password" name="password" />

        <button type="submit" class="border-gray-300 border"> Submit </button>
      </form>
    </div>
  </Layout>
));

signup.post("/", async (c) => {
  console.log('started')
  console.log(c.req)
  const { username, password } = await c.req.parseBody();
  console.log(username, password)
  // basic check
  if (
    typeof username !== "string" ||
    username.length < 4 ||
    username.length > 31
  ) {
    return c.text("Invalid username", 400);
  }
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return c.text("Invalid password", 400);
  }
  console.log('validated')
  try {
    const user = await auth.createUser({
      key: {
        providerId: "username", // auth method
        providerUserId: username.toLowerCase(), // unique id when using "username" auth method
        password // hashed by Lucia
      },
      attributes: {
        username
      }
    });
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {}
    });
    const authRequest = auth.handleRequest(c);
    authRequest.setSession(session);
    // redirect to profile page
    console.log('redirecting')
    return c.redirect("/login");
  } catch (e) {
    // this part depends on the database you're using
    // check for unique constraint error in user table
    if (e instanceof Error) {
      return c.text("Username already taken", 400);
    }
    return c.text("An unknown error occurred", 500);
  }
});
