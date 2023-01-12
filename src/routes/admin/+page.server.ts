import type { PageServerLoad, Actions } from "./$types";
import { redirect, fail } from "@sveltejs/kit";
import db from "$lib/server/db";
import type { BackgroundKey } from "@prisma/client";

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.validate();
  if (!session) throw redirect(302, "/signin");

  const systemConfig = await db.systemConfig.findUnique({
    where: {
      id: "systemConfig1",
    },
  });

  return { systemConfig };
};

export const actions: Actions = {
  update: async ({ request }) => {
    const data = await request.formData();
    const background = data.get("background") as BackgroundKey;
    const systemId = data.get("systemId") as string;

    if (!systemId) {
      return fail(400, { systemId, missing: true });
    }

    try {
      await db.systemConfig.update({
        where: {
          id: systemId,
        },
        data: {
          background: background,
        },
      });
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: "Error updating config." };
    }
  },
};
