// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// --- Deploy-target detection -------------------------------------------------
// Inside Lovable's own build infra none of these env flags are set, so Nitro keeps
// its default Cloudflare target and the app builds/serves exactly as usual.

// Netlify sets NETLIFY=true during its builds -> full SSR via the Netlify preset.
const isNetlify = Boolean(process.env.NETLIFY);

// The GitHub Actions workflow (.github/workflows/deploy.yml) sets GITHUB_PAGES=true.
// GitHub Pages is static-only hosting (no server), so we prerender the whole app to
// static HTML, disable Nitro, and serve it from the repo subpath:
//   https://<user>.github.io/science-made-easy/
const isGithubPages = Boolean(process.env.GITHUB_PAGES);
const githubPagesBase = "/science-made-easy/";

const baseStart = { server: { entry: "server" } } as Record<string, unknown>;

const targetConfig: Record<string, unknown> = isGithubPages
  ? {
      tanstackStart: {
        ...baseStart,
        // Prerender every page to static HTML so GitHub Pages can serve it.
        prerender: { enabled: true, crawlLinks: true },
        pages: [{ path: "/" }, { path: "/booking" }],
      },
      vite: { base: githubPagesBase },
      // No server runtime on GitHub Pages -> skip Nitro and emit a pure static build.
      nitro: false,
    }
  : isNetlify
    ? {
        tanstackStart: baseStart,
        nitro: {
          preset: "netlify",
          output: {
            dir: ".netlify/functions-internal",
            serverDir: ".netlify/functions-internal/server",
            publicDir: "dist",
          },
        },
      }
    : {
        // Default: Lovable infra (Cloudflare). Nitro is auto-enabled in the sandbox.
        tanstackStart: baseStart,
      };

export default defineConfig(targetConfig);
