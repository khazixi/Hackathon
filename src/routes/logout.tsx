import { Hono } from "hono";
import { auth } from '../lucia'
import { ErrorLogin } from "../templates";

export const logout = new Hono()

logout.get('/', async c => {
  const authRequest = auth.handleRequest(c)
  const session = await authRequest.validate()

  if (!session) {
    return c.html(ErrorLogin('Invalid'))
  }

  await auth.invalidateSession(session.sessionId)

  authRequest.setSession(null)

  return c.redirect('/', 302)
})
