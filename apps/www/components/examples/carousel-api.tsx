"use client"

import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

// Embla owns the slide position, so it is read as an external store rather
// than mirrored into state from an effect.
function useCarouselPosition(api: CarouselApi | undefined) {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      if (!api) return () => {}
      api.on("select", onChange)
      api.on("reInit", onChange)
      return () => {
        api.off("select", onChange)
        api.off("reInit", onChange)
      }
    },
    [api]
  )

  const current = React.useSyncExternalStore(
    subscribe,
    () => (api ? api.selectedScrollSnap() + 1 : 0),
    () => 0
  )

  const count = React.useSyncExternalStore(
    subscribe,
    () => (api ? api.scrollSnapList().length : 0),
    () => 0
  )

  return { current, count }
}

export default function CarouselApiDemo() {
  const [api, setApi] = React.useState<CarouselApi>()
  const { current, count } = useCarouselPosition(api)

  return (
    <div className="mx-auto max-w-[10rem] sm:max-w-xs">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card className="m-px">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-heading-32">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-copy-14 text-gray-900">
        Slide {current} of {count}
      </div>
    </div>
  )
}
