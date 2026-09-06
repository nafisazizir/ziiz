import { defineConfig, defineDocs } from "fumadocs-mdx/config"

import { contentFrontmatterSchema } from "./lib/content-schema"
import { shikiConfig } from "./lib/shiki"

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: contentFrontmatterSchema,
  },
})

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: shikiConfig,
  },
})
