import { defineConfig } from "$fresh/server.ts";
import { plugins } from "deco/plugins/deco.ts";
import manifest from "./manifest.gen.ts";

export default defineConfig({
  plugins: plugins({
    manifest,
  }),
  render: (ctx, render) => {
    ctx.lang = "pt-BR";
    render();
  },
});