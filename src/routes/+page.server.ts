import type { PageServerLoad } from "./$types";
import db from "$lib/server/db";

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

  return {
    systemConfig,
  };
}) satisfies PageServerLoad;
