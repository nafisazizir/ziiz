import { doubleStroke } from "@/lib/letters/double-stroke"

self.onmessage = ({
  data,
}: MessageEvent<{ bandWidth: number; lineWeight: number }>) => {
  self.postMessage(
    Object.fromEntries(
      [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map((letter) => [
        letter,
        doubleStroke(letter, data.bandWidth, data.lineWeight),
      ])
    )
  )
}
