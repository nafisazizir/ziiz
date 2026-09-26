import { cacheLife } from "next/cache"
import { NextResponse } from "next/server"

import { llmsFull } from "@/lib/llms"

async function getLlmsFull() {
  "use cache"
  cacheLife("max")
  return llmsFull()
}

export async function GET() {
  return new NextResponse(await getLlmsFull(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
