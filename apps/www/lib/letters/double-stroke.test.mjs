import assert from "node:assert/strict"
import test from "node:test"

import { doubleStroke, letterSvg, skeletons } from "./double-stroke.ts"

test("all capitals have a band and produce finite, closed polygon paths at slider extremes", () => {
  assert.equal(Object.keys(skeletons).join(""), "ABCDEFGHIJKLMNOPQRSTUVWXYZ")
  for (const letter of Object.keys(skeletons)) {
    assert.ok(
      skeletons[letter].some((stroke) => stroke.band),
      letter
    )
    for (const width of [60, 90, 130]) {
      for (const weight of [4, 9, 18]) {
        const path = doubleStroke(letter, width, weight)
        assert.match(path, /^M[\d.,LZM-]+Z$/)
        assert.ok(!path.includes("NaN"), letter)
      }
    }
  }
})

test("unknown and empty glyphs are empty", () => {
  assert.equal(doubleStroke(""), "")
  assert.equal(doubleStroke("a"), "")
})

test("invalid construction parameters fail explicitly", () => {
  for (const [width, weight] of [
    [0, 9],
    [10, 9],
    [90, 0],
    [NaN, 9],
    [90, Infinity],
  ]) {
    assert.throws(() => doubleStroke("X", width, weight), RangeError)
  }
})

test("X uses a descending band and ascending hair; export is one standalone filled path", () => {
  assert.deepEqual(
    skeletons.X.map((stroke) => stroke.band),
    [true, false]
  )
  assert.notEqual(doubleStroke("X", 60), doubleStroke("X", 130))
  const svg = letterSvg(doubleStroke("Z"))
  assert.match(svg, /xmlns="http:\/\/www.w3.org\/2000\/svg"/)
  assert.match(svg, /viewBox="0 0 1000 1000" fill="currentColor"/)
  assert.equal((svg.match(/<path /g) || []).length, 1)
  assert.ok(!svg.includes("stroke="))
})

test("X band has filled flush caps and a hollow crossing with interrupted hair", () => {
  const path = doubleStroke("X")
  const rings = [...path.matchAll(/M([^Z]+)Z/g)].map((match) =>
    match[1].split("L").map((pair) => pair.split(",").map(Number))
  )
  function contains(x, y) {
    let inside = false
    for (const ring of rings) {
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const [xi, yi] = ring[i]
        const [xj, yj] = ring[j]
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
          inside = !inside
      }
    }
    return inside
  }
  assert.ok(contains(243.5, 204), "top cap")
  assert.ok(contains(190, 204), "top cap is flush across the full band width")
  assert.ok(contains(756.5, 796), "bottom cap")
  assert.ok(!contains(260, 223), "hollow band")
  assert.ok(!contains(500, 500), "hair must not fill the crossing")
})
