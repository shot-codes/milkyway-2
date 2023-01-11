import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";

/// <reference types="vitest" />
const config: UserConfig = {
  plugins: [sveltekit()],
  test: {
    include: [
      "src/**/*.{test,spec}.{js,ts}",
      "prisma/**/*.{test,spec}.{js,ts}",
    ],
  },
  ssr: {
    noExternal: [
      "three",
      "troika-three-text",
      // "lamina",
      // "three-custom-shader-material",
    ],
  },
};

export default config;
