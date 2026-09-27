import { cacheLife } from "next/cache"
import { NextResponse } from "next/server"

import { llmsIndex } from "@/lib/llms"

async function getLlmsIndex() {
  "use cache"
  cacheLife("max")
  return llmsIndex()
}

export async function GET() {
  return new NextResponse(await getLlmsIndex(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
