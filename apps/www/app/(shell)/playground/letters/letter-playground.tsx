"use client"

import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { doubleStroke, letterSvg } from "@/lib/letters/double-stroke"
import { letterStyles, type LetterStyle } from "@/lib/letters/glyphs"
import { cn } from "@/lib/utils"

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

function Glyph({ path, className }: { path: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 1000"
      fill="currentColor"
      className={cn("size-full", className)}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  )
}

function Catalogue({
  style,
  selected,
  onSelect,
}: {
  style: LetterStyle
  selected: string
  onSelect: (letter: string) => void
}) {
  const [lowercase, setLowercase] = useState(false)
  const letters = alphabet.map((letter) =>
    lowercase ? letter.toLowerCase() : letter
  )
  const supportsLowercase = Object.keys(style.glyphs).some((letter) =>
    /^[a-z]$/.test(letter)
  )
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-heading-20 text-gray-1000">{style.label}</h3>
        {style.id !== "double-stroke" && (
          <div
            className="flex gap-1"
            role="group"
            aria-label={`${style.label} letter case`}
          >
            <Button
              variant={lowercase ? "ghost" : "secondary"}
              size="sm"
              aria-pressed={!lowercase}
              onClick={() => setLowercase(false)}
            >
              Uppercase
            </Button>
            <Button
              variant={lowercase ? "secondary" : "ghost"}
              size="sm"
              aria-pressed={lowercase}
              disabled={!supportsLowercase}
              onClick={() => setLowercase(true)}
            >
              Lowercase
            </Button>
          </div>
        )}
      </div>
      <ul className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-13">
        {letters.map((letter) => (
          <li key={letter}>
            <button
              type="button"
              aria-label={`Select ${letter} in ${style.label}`}
              aria-pressed={selected === letter}
              disabled={!style.glyphs[letter]}
              onClick={() => onSelect(letter)}
              className={cn(
                "flex w-full flex-col border border-transparent bg-gray-100 p-2 text-gray-1000 transition-colors outline-none hover:bg-gray-200 focus-visible:border-gray-600 focus-visible:ring-3 focus-visible:ring-gray-600/50 disabled:opacity-50",
                selected === letter && "border-gray-600 bg-gray-200"
              )}
            >
              <span className="aspect-square w-full">
                {style.glyphs[letter] ? (
                  <Glyph path={style.glyphs[letter]} />
                ) : (
                  <span className="flex size-full items-center justify-center text-label-14">
                    —
                  </span>
                )}
              </span>
              <span className="text-label-12 text-gray-900">{letter}</span>
            </button>
          </li>
        ))}
      </ul>
      {lowercase && style.id.startsWith("ds") && (
        <p className="text-copy-13 text-gray-900">
          The original dsfont includes h and k; its a slot holds an alternate
          capital A. Unavailable glyphs are left empty.
        </p>
      )}
    </div>
  )
}

export function LetterPlayground() {
  const [selected, setSelected] = useState("Z")
  const [bandWidth, setBandWidth] = useState(90)
  const [lineWeight, setLineWeight] = useState(9)
  const [message, setMessage] = useState("")
  const constructed = useMemo<LetterStyle>(
    () => ({
      id: "double-stroke",
      label: "Double stroke",
      family: "Double stroke",
      glyphs: Object.fromEntries(
        alphabet.map((letter) => [
          letter,
          doubleStroke(letter, bandWidth, lineWeight),
        ])
      ),
    }),
    [bandWidth, lineWeight]
  )
  const styles = [constructed, ...letterStyles]

  async function copy(style: LetterStyle) {
    try {
      await navigator.clipboard.writeText(letterSvg(style.glyphs[selected]))
      setMessage(`Copied ${selected} · ${style.label}`)
    } catch {
      setMessage("Clipboard unavailable. Please use Download SVG instead.")
    }
  }

  function download(style: LetterStyle) {
    const url = URL.createObjectURL(
      new Blob([letterSvg(style.glyphs[selected])], { type: "image/svg+xml" })
    )
    const link = document.createElement("a")
    link.href = url
    link.download = `ziiz-letter-${selected.toLowerCase()}-${style.id}${selected === selected.toLowerCase() ? "-lowercase" : ""}.svg`
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setMessage(`Downloaded ${selected} · ${style.label}`)
  }

  return (
    <div className="flex flex-col gap-20 py-10 lg:gap-30 lg:py-20">
      <section
        aria-labelledby="compare-title"
        className="flex flex-col gap-6"
        id="compare"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="compare-title" className="text-heading-32 text-gray-1000">
            Compare <span className="text-gray-900">/ {selected}</span>
          </h2>
          <p className="max-w-80 text-copy-13 text-gray-900">
            Select any tile below to compare the same letter across every cut.
            Empty means the font has no glyph.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 xl:grid-cols-7">
          {styles.map((style) => (
            <div key={style.id} className="flex min-w-0 flex-col gap-3">
              <div className="aspect-square bg-gray-100 text-gray-1000">
                {style.glyphs[selected] ? (
                  <Glyph path={style.glyphs[selected]} />
                ) : (
                  <span className="flex size-full items-center justify-center text-label-12 text-gray-900">
                    Not available
                  </span>
                )}
              </div>
              <div>
                <p className="text-label-12 text-gray-900">{style.family}</p>
                <h3 className="text-heading-16 text-gray-1000">
                  {style.label}
                </h3>
              </div>
              <div className="mt-auto flex flex-col items-start gap-1">
                <Button
                  variant="outline"
                  size="xs"
                  disabled={!style.glyphs[selected]}
                  onClick={() => copy(style)}
                >
                  Copy SVG
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  disabled={!style.glyphs[selected]}
                  onClick={() => download(style)}
                >
                  Download SVG
                </Button>
              </div>
            </div>
          ))}
        </div>
        <p role="status" className="min-h-5 text-copy-13 text-gray-900">
          {message || "One path. Current colour. A square 1000 × 1000 viewBox."}
        </p>
      </section>
      <section
        className="flex flex-col gap-8"
        aria-labelledby="double-stroke-title"
      >
        <SectionTitle
          id="double-stroke-title"
          number="01"
          title="Double stroke"
          note="X-logo construction · hollow bands and interrupted hairlines"
        />
        <div className="grid max-w-2xl gap-8 sm:grid-cols-2">
          <div className="flex flex-col gap-4">
            <label id="band-label" className="text-label-14 text-gray-1000">
              Band width <span className="text-gray-900">/ {bandWidth}</span>
            </label>
            <Slider
              aria-labelledby="band-label"
              value={[bandWidth]}
              min={60}
              max={130}
              step={1}
              onValueChange={(value) =>
                setBandWidth(Array.isArray(value) ? value[0] : value)
              }
            />
          </div>
          <div className="flex flex-col gap-4">
            <label id="weight-label" className="text-label-14 text-gray-1000">
              Line weight <span className="text-gray-900">/ {lineWeight}</span>
            </label>
            <Slider
              aria-labelledby="weight-label"
              value={[lineWeight]}
              min={4}
              max={18}
              step={1}
              onValueChange={(value) =>
                setLineWeight(Array.isArray(value) ? value[0] : value)
              }
            />
          </div>
        </div>
        <Catalogue
          style={constructed}
          selected={selected}
          onSelect={setSelected}
        />
      </section>
      <section className="flex flex-col gap-10" aria-labelledby="cm-title">
        <SectionTitle
          id="cm-title"
          number="02"
          title="Computer Modern"
          note="Latin Modern · the familiar language of TeX, in real outlines"
        />
        {letterStyles
          .filter((style) => style.family === "Computer Modern")
          .map((style) => (
            <Catalogue
              key={style.id}
              style={style}
              selected={selected}
              onSelect={setSelected}
            />
          ))}
      </section>
      <section
        className="flex flex-col gap-10"
        aria-labelledby="blackboard-title"
      >
        <SectionTitle
          id="blackboard-title"
          number="03"
          title="Computer Modern double stroke"
          note="Math blackboard and dsfont · two approaches to a doubled line"
        />
        {letterStyles
          .filter((style) => style.family === "Computer Modern double stroke")
          .map((style) => (
            <Catalogue
              key={style.id}
              style={style}
              selected={selected}
              onSelect={setSelected}
            />
          ))}
      </section>
      <p className="max-w-2xl text-copy-13 text-gray-900">
        Latin Modern and Latin Modern Math are by the GUST e-foundry, under the
        GUST Font License. The dsfont Roman and Sans outlines are from Olaf
        Kummer’s doublestroke package. These are letterform starting points, not
        exclusive marks or trademark clearance.
      </p>
    </div>
  )
}

function SectionTitle({
  id,
  number,
  title,
  note,
}: {
  id: string
  number: string
  title: string
  note: string
}) {
  return (
    <h2 id={id} className="text-heading-32 text-gray-1000">
      <span className="me-3 text-label-12 text-gray-900">{number}</span>
      {title}
      <span className="block text-gray-900">{note}</span>
    </h2>
  )
}
