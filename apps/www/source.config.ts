import { ziizShikiOptions } from "@ziiz/theme/shiki"
import { defineConfig, defineDocs } from "fumadocs-mdx/config"

import {
  blogFrontmatterSchema,
  contentFrontmatterSchema,
} from "./lib/content-schema"

// One pipeline for both collections: the same MDX options, highlighter and
// component map. The blog differs only in its schema (a required date) and
// in how the app sorts and lays it out.
export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: contentFrontmatterSchema,
  },
})

export const blog = defineDocs({
  dir: "content/blog",
  docs: {
    schema: blogFrontmatterSchema,
  },
})

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: ziizShikiOptions,
  },
})
