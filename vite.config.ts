// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// --- Deploy-target detection -------------------------------------------------
// Inside Lovable's own build infra, none of these env flags are set, so Nitro
// keeps its default Cloudflare target and the app builds/serves as usual.

// Netlify sets NETLIFY=true during its builds -> use the Netlify SSR preset.
const isNetlify = Boolean(process.env.NETLIFY);

// The GitHub Actions workflow (.github/workflows/deploy.yml) sets GITHUB_PAGES=true.
// GitHub Pages is static-only, so we prerender the whole app to static HTML and
// serve it from the repo subpath (https://<user>.github.io/science-made-easy/).
const isGithubPages = Boolean(process.env.GITHUB_PAGES);
const githubPagesBase = "/science-made-easy/";

const targetConfig = isGithubPages
  ? {
      vite: { base: githubPagesBase },
      nitro: {
        preset: "github_pages",
        baseURL: githubPagesBase,
        output: {
          dir: ".output",
          serverDir: ".output/server",
          publicDir: ".output/public",
        },
      },
    }
  : isNetlify
    ? {
        nitro: {
          preset: "netlify",
          output: {
            dir: ".netlify/functions-internal",
            serverDir: ".netlify/functions-internal/server",
            publicDir: "dist",
          },
        },
      }
    : {};

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Spread the deploy-target-specific overrides (Netlify / GitHub Pages / none).
  ...(targetConfig as Record<string, unknown>),
});
