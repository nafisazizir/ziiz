import { NextResponse } from "next/server"

import { llmsFull } from "@/lib/llms"

export const dynamic = "force-static"

export async function GET() {
  return new NextResponse(await llmsFull(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
