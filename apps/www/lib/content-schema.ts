import { pageSchema } from "fumadocs-core/source/schema"
import { z } from "zod"

export const contentFrontmatterSchema = pageSchema.extend({
  description: z.string(),
  date: z.iso.date().optional(),
})
