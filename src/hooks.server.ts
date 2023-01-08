import { auth } from "$lib/server/auth/lucia";
import { handleHooks } from "@lucia-auth/sveltekit";

export const handle = handleHooks(auth);
