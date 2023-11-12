import { libsql } from "@lucia-auth/adapter-sqlite";
import { lucia } from "lucia";
import { hono } from "lucia/middleware";
import { sqlite } from "./db";

// expect error (see next section)
export const auth = lucia({
	env: "DEV", // "PROD" if deployed to HTTPS
	middleware: hono(),
  adapter: libsql(
    sqlite, {
      user: 'user',
      session: 'user_session',
      key: 'user_key'
    }
  )
});

export type Auth = typeof auth;
