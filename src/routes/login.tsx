import { Hono } from "hono";
import { auth } from "../lucia";
import { LuciaError } from "lucia";
import { Layout } from "../templates";

export const login = new Hono()

login.get("/", (c) => {
  return c.html(
    <Layout>
      <div class="bg-white text-black rounded-lg p-2 w-64">
        <form method="post" action="/login" class="flex flex-col justify-center gap-4">
          <h1> Log In </h1>
          <label> Username </label>
          <input type="text" name="username" class="border border-gray-300" />

          <label> Password </label>
          <input type="password" name="password" class="border border-gray-300" />

          <button type="submit" class="border-gray-300 border"> Submit </button>
        </form>
      </div>
    </Layout>
  )
})

login.post("/", async (c) => {
  try {
    const { username, password } = await c.req.parseBody();

    if (
      typeof username !== "string" ||
      username.length < 8 ||
      username.length > 64
    ) {
      return c.text("Invalid username", 400);
    }
    if (
      typeof password !== "string" ||
      password.length < 8 ||
      password.length > 64
    ) {
      return c.text("Invalid password", 400);
    }
    // find user by key
    // and validate password
    const key = await auth.useKey("username", username.toLowerCase(), password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {}
    });
    const authRequest = auth.handleRequest(c);
    authRequest.setSession(session);
    // redirect to profile page
    return c.redirect("/");
    console.log('completed')
  } catch (e) {
    // check for unique constraint error in user table
    if (
      e instanceof LuciaError &&
      (e.message === "AUTH_INVALID_KEY_ID" ||
        e.message === "AUTH_INVALID_PASSWORD")
    ) {
      // user does not exist
      // or invalid password
      return c.text("Incorrect username or password", 400);
    }

    return c.text("An unknown error occurred", 500);
  }
});
