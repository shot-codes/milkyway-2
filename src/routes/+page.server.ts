import type { PageServerLoad } from "./$types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const load = (async () => {
  const systemConfig = await prisma.systemConfig.findUnique({
    where: {
      id: "systemConfig1",
    },
    // Prisma doesn't support recursive includes so we have to specify a level explicitly.
    include: {
      system: {
        include: {
          children: {
            include: {
              children: {
                include: {
                  children: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return {
    systemConfig,
  };
}) satisfies PageServerLoad;
