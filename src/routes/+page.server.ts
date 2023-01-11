import type { PageServerLoad } from "./$types";
import db from "$lib/server/db";
import type { SystemConfig } from "$app3d/utils/types";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export const load = (async () => {
  const systemConfig = await db.systemConfig.findUnique({
    where: {
      id: "systemConfig1",
    },
    // Prisma doesn't support recursive includes so we have to specify a level explicitly.
    include: {
      system: {
        include: {
          planet: {
            include: {
              material: true,
            },
          },
          children: {
            include: {
              planet: {
                include: {
                  material: true,
                },
              },
              children: {
                include: {
                  planet: {
                    include: {
                      material: true,
                    },
                  },
                  children: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (systemConfig) {
    console.log(systemConfig satisfies SystemConfig);
  }

  return {
    systemConfig,
  };
}) satisfies PageServerLoad;
