"use client"

import * as React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// business.x.com/en/products/x-spaces keeps two bodies behind the tabs in
// its floating bar, Overview and Recorded Spaces. The clone puts the strip
// at the top of the article and swaps the sections under the hero.
export function SpacesTabs({
  overview,
  recorded,
}: {
  overview: React.ReactNode
  recorded: React.ReactNode
}) {
  return (
    <Tabs defaultValue="overview" className="gap-0">
      <TabsList variant="line" className="mt-2 w-full justify-start gap-6 p-0">
        <TabsTrigger value="overview" className="h-auto flex-none px-0 pb-2">
          Overview
        </TabsTrigger>
        <TabsTrigger value="recorded" className="h-auto flex-none px-0 pb-2">
          Recorded Spaces
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="flex flex-col">
        {overview}
      </TabsContent>
      <TabsContent value="recorded" className="flex flex-col">
        {recorded}
      </TabsContent>
    </Tabs>
  )
}
