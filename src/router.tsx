import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  // BASE_URL comes from Vite's `base` config. It is "/" by default (Lovable /
  // Netlify) and "/science-made-easy/" for the GitHub Pages build. TanStack
  // Router wants the basepath without a trailing slash.
  const basepath = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "") || "/";

  const router = createRouter({
    routeTree,
    context: { queryClient },
    basepath,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
