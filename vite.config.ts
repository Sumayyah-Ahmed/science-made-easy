import { defineConfig } from "@lovable.dev/vite-tanstack-config";
export default defineConfig({
  tanstackStart: { server: { entry: "server" } },
  nitro: {
    preset: "github_pages",
    output: { dir: ".output", serverDir: ".output/server", publicDir: ".output/public" },
  },
});
