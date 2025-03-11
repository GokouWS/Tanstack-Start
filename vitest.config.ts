import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths({
      projects: ["./tsconfig.json"],
      root: "./",
    }) as any,
  ],
  test: {
    globals: true,
    environment: "jsdom",
    // environment: "edge-runtime",
    // server: { deps: { inline: ["convex-test"] } },
  },
});
