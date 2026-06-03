import { defineConfig } from "@lovable.dev/vite-tanstack-config";
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    prerender: { enabled: true, crawlLinks: true },
    pages: [{ path: "/" }, { path: "/booking" }],
  },
  vite: { base: "/science-made-easy/" },
  nitro: false,
});
