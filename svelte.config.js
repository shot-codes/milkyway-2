import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/kit/vite";
import seqPreprocessor from "svelte-sequential-preprocessor";
import { preprocessThrelte } from "@threlte/preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: seqPreprocessor([vitePreprocess(), preprocessThrelte()]),

  kit: {
    adapter: adapter(),
    alias: {
      $assets: "src/lib/assets",
      $app3d: "src/lib/client/app",
      $admin: "src/lib/client/admin",
    },
  },
};

export default config;
