import db from "$lib/server/db";
import lucia from "lucia-auth";
import prisma from "@lucia-auth/adapter-prisma";
import { dev } from "$app/environment";

export const auth = lucia({
  adapter: prisma(db),
  env: dev ? "DEV" : "PROD",
  transformUserData: (userData) => {
    return {
      userId: userData.id,
      username: userData.username,
      avatar_url: userData.avatar_url,
    };
  },
});

export type Auth = typeof auth;
