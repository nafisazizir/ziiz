import { ziizShikiOptions } from "@ziiz/theme/shiki"
import { defineConfig, defineDocs } from "fumadocs-mdx/config"

import { contentFrontmatterSchema } from "./lib/content-schema"

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: contentFrontmatterSchema,
  },
})

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: ziizShikiOptions,
  },
})
