import { PrismaClient } from "@prisma/client";
import lucia from "lucia-auth";
import prisma from "@lucia-auth/adapter-prisma";
import { dev } from "$app/environment";

export const auth = lucia({
  adapter: prisma(new PrismaClient()),
  env: dev ? "DEV" : "PROD",
  transformUserData: (userData) => {
    return {
      userId: userData.id,
      username: userData.username,
    };
  },
});

export type Auth = typeof auth;
