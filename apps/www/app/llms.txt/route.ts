import { NextResponse } from "next/server"

import { llmsIndex } from "@/lib/llms"

export const dynamic = "force-static"

export function GET() {
  return new NextResponse(llmsIndex(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
