import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    // environment: "edge-runtime",
    // server: { deps: { inline: ["convex-test"] } },
  },
});
