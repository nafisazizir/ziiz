import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/shiki.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  target: "es2022",
  treeshake: true,
})
