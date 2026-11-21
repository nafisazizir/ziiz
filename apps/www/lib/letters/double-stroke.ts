import * as clipping from "polyclip-ts"

type MultiPolygon = ReturnType<typeof clipping.union>

clipping.setPrecision(1e-7)

type Point = [number, number]
type Stroke = { points: Point[]; band: boolean; closed?: boolean }
const line = (band: boolean, ...points: Point[]): Stroke => ({ band, points })
const B = (...points: Point[]) => line(true, ...points)
const H = (...points: Point[]) => line(false, ...points)

function curve(band: boolean, points: Point[], closed = false): Stroke {
  const sampled: Point[] = [points[0]]
  for (let i = 1; i < points.length; i += 3) {
    const [p, a, b, q] = [
      points[i - 1],
      points[i],
      points[i + 1],
      points[i + 2],
    ]
    for (let j = 1; j <= 24; j++) {
      const t = j / 24
      const s = 1 - t
      sampled.push([
        s ** 3 * p[0] +
          3 * s ** 2 * t * a[0] +
          3 * s * t ** 2 * b[0] +
          t ** 3 * q[0],
        s ** 3 * p[1] +
          3 * s ** 2 * t * a[1] +
          3 * s * t ** 2 * b[1] +
          t ** 3 * q[1],
      ])
    }
  }
  return { band, points: sampled, closed }
}

const bowl = (x: number, y: number, w: number, h: number) =>
  curve(
    true,
    [
      [x, y - h],
      [x + w * 0.56, y - h],
      [x + w, y - h * 0.56],
      [x + w, y],
      [x + w, y + h * 0.56],
      [x + w * 0.56, y + h],
      [x, y + h],
      [x - w * 0.56, y + h],
      [x - w, y + h * 0.56],
      [x - w, y],
      [x - w, y - h * 0.56],
      [x - w * 0.56, y - h],
      [x, y - h],
    ],
    true
  )

// A common cap line (200) and baseline (800), with serif contrast, not serifs.
export const skeletons: Record<string, Stroke[]> = {
  A: [
    H([230, 800], [500, 200]),
    B([500, 200], [770, 800]),
    H([340, 560], [660, 560]),
  ],
  B: [
    B([280, 200], [280, 800]),
    curve(true, [
      [280, 200],
      [820, 160],
      [810, 490],
      [300, 490],
      [850, 450],
      [850, 850],
      [280, 800],
    ]),
  ],
  C: [
    curve(true, [
      [760, 270],
      [440, 40],
      [220, 230],
      [220, 500],
      [220, 770],
      [440, 960],
      [760, 730],
    ]),
  ],
  D: [
    B([270, 200], [270, 800]),
    curve(true, [
      [270, 200],
      [940, 130],
      [940, 870],
      [270, 800],
    ]),
  ],
  E: [
    B([300, 200], [300, 800]),
    H([300, 200], [760, 200]),
    H([300, 490], [660, 490]),
    H([300, 800], [760, 800]),
  ],
  F: [
    B([300, 200], [300, 800]),
    H([300, 200], [760, 200]),
    H([300, 490], [670, 490]),
  ],
  G: [
    curve(true, [
      [760, 270],
      [440, 40],
      [220, 230],
      [220, 500],
      [220, 770],
      [440, 960],
      [760, 730],
    ]),
    B([760, 540], [760, 730]),
    H([560, 540], [810, 540]),
  ],
  H: [
    B([250, 200], [250, 800]),
    B([750, 200], [750, 800]),
    H([250, 500], [750, 500]),
  ],
  I: [
    B([500, 200], [500, 800]),
    H([330, 200], [670, 200]),
    H([330, 800], [670, 800]),
  ],
  J: [
    B([690, 200], [690, 640]),
    curve(true, [
      [690, 640],
      [690, 870],
      [280, 870],
      [280, 650],
    ]),
    H([480, 200], [800, 200]),
  ],
  K: [
    B([270, 200], [270, 800]),
    H([750, 200], [270, 570]),
    B([440, 440], [770, 800]),
  ],
  L: [B([300, 200], [300, 800]), H([300, 800], [770, 800])],
  M: [
    B([210, 200], [210, 800]),
    B([210, 200], [500, 800]),
    H([500, 800], [790, 200]),
    B([790, 200], [790, 800]),
  ],
  N: [
    H([250, 800], [250, 200]),
    B([250, 200], [750, 800]),
    H([750, 800], [750, 200]),
  ],
  O: [bowl(500, 500, 270, 300)],
  P: [
    B([280, 200], [280, 800]),
    curve(true, [
      [280, 200],
      [940, 130],
      [940, 570],
      [280, 520],
    ]),
  ],
  Q: [bowl(500, 500, 270, 300), B([550, 640], [810, 870])],
  R: [
    B([280, 200], [280, 800]),
    curve(true, [
      [280, 200],
      [930, 130],
      [930, 560],
      [280, 510],
    ]),
    B([490, 510], [790, 800]),
  ],
  S: [
    curve(true, [
      [750, 270],
      [580, 120],
      [260, 160],
      [260, 360],
      [260, 540],
      [750, 450],
      [750, 650],
      [750, 850],
      [410, 880],
      [240, 730],
    ]),
  ],
  T: [H([180, 200], [820, 200]), B([500, 200], [500, 800])],
  U: [
    B([240, 200], [240, 600]),
    curve(true, [
      [240, 600],
      [240, 880],
      [760, 880],
      [760, 600],
    ]),
    H([760, 600], [760, 200]),
  ],
  V: [B([220, 200], [500, 800]), H([500, 800], [780, 200])],
  W: [
    B([150, 200], [330, 800]),
    H([330, 800], [500, 250]),
    B([500, 250], [670, 800]),
    H([670, 800], [850, 200]),
  ],
  X: [B([240, 200], [760, 800]), H([760, 200], [240, 800])],
  Y: [
    B([230, 200], [500, 510]),
    H([770, 200], [500, 510]),
    B([500, 510], [500, 800]),
  ],
  Z: [
    H([240, 200], [760, 200]),
    B([760, 200], [240, 800]),
    H([240, 800], [760, 800]),
  ],
}

function offset(points: Point[], distance: number, closed: boolean): Point[] {
  return points.map((point, i) => {
    const previous = points[i === 0 ? (closed ? points.length - 1 : 0) : i - 1]
    const next = points[i === points.length - 1 ? (closed ? 0 : i) : i + 1]
    const normal = (a: Point, b: Point): Point => {
      const length = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1
      return [-(b[1] - a[1]) / length, (b[0] - a[0]) / length]
    }
    const n1 = normal(previous, point)
    const n2 = normal(point, next)
    if (!closed && i === 0)
      return [point[0] + n2[0] * distance, point[1] + n2[1] * distance]
    if (!closed && i === points.length - 1)
      return [point[0] + n1[0] * distance, point[1] + n1[1] * distance]
    const factor = distance / Math.max(0.2, 1 + n1[0] * n2[0] + n1[1] * n2[1])
    return [
      point[0] + (n1[0] + n2[0]) * factor,
      point[1] + (n1[1] + n2[1]) * factor,
    ]
  })
}

function ribbon(stroke: Stroke, width: number, inset = 0): MultiPolygon {
  const points = (
    stroke.closed ? stroke.points.slice(0, -1) : stroke.points
  ).map((p): Point => [...p])
  if (!stroke.closed) {
    const horizontal = points.every((p) => p[1] === points[0][1])
    if (horizontal && [200, 800].includes(points[0][1])) {
      const shift = points[0][1] === 200 ? width / 2 : -width / 2
      for (const point of points) point[1] += shift
    }
    for (const [i, next] of [
      [0, 1],
      [points.length - 1, points.length - 2],
    ]) {
      const dx = points[next][0] - points[i][0]
      const dy = points[next][1] - points[i][1]
      if (
        (points[i][1] === 200 && dy > 0) ||
        (points[i][1] === 800 && dy < 0)
      ) {
        const extension = width * Math.max(1, Math.abs(dx / dy))
        const length = Math.hypot(dx, dy)
        points[i] = [
          points[i][0] - (dx / length) * extension,
          points[i][1] - (dy / length) * extension,
        ]
      }
    }
  }
  if (inset && !stroke.closed) {
    for (const [i, next] of [
      [0, 1],
      [points.length - 1, points.length - 2],
    ]) {
      const dx = points[next][0] - points[i][0]
      const dy = points[next][1] - points[i][1]
      const length = Math.hypot(dx, dy)
      points[i] = [
        points[i][0] + (dx / length) * inset,
        points[i][1] + (dy / length) * inset,
      ]
    }
  }
  const a = offset(points, width / 2, !!stroke.closed)
  const b = offset(points, -width / 2, !!stroke.closed)
  const ring = (p: Point[]) =>
    [...p, p[0]].map(([x, y]): Point => [
      Math.round(x * 1e6) / 1e6,
      Math.round(y * 1e6) / 1e6,
    ])
  if (stroke.closed) return clipping.difference([[ring(b)]], [[ring(a)]])
  const polygon: MultiPolygon = [[ring([...a, ...b.reverse()])]]
  if (!inset) return polygon
  const ends = [stroke.points[0][1], stroke.points.at(-1)![1]]
  const top = ends.includes(200) ? 200 + inset : -1000
  const bottom = ends.includes(800) ? 800 - inset : 2000
  return clipping.intersection(polygon, [
    [
      [
        [0, top],
        [1000, top],
        [1000, bottom],
        [0, bottom],
        [0, top],
      ],
    ],
  ])
}

export function doubleStroke(
  letter: string,
  bandWidth = 90,
  lineWeight = 9
): string {
  const strokes = skeletons[letter]
  if (!strokes) return ""
  if (
    !Number.isFinite(bandWidth) ||
    !Number.isFinite(lineWeight) ||
    bandWidth <= lineWeight * 2 ||
    lineWeight <= 0
  )
    throw new RangeError(
      "Band width must exceed twice the positive line weight"
    )
  const bands = strokes.filter((stroke) => stroke.band)
  const interiors = clipping.union(
    ...(bands.map((stroke) =>
      ribbon(stroke, bandWidth - 2 * lineWeight, lineWeight)
    ) as [MultiPolygon, ...MultiPolygon[]])
  )
  const outlines = bands.map((stroke) =>
    clipping.difference(
      ribbon(stroke, bandWidth),
      ribbon(stroke, bandWidth - 2 * lineWeight, lineWeight)
    )
  )
  const hairs = strokes
    .filter((stroke) => !stroke.band)
    .map((stroke) => clipping.difference(ribbon(stroke, lineWeight), interiors))
  const merged = clipping.union(
    ...([...outlines, ...hairs] as [MultiPolygon, ...MultiPolygon[]])
  )
  const bottom = letter === "Q" ? 880 : 800
  const clipped = clipping.intersection(merged, [
    [
      [
        [80, 200],
        [920, 200],
        [920, bottom],
        [80, bottom],
        [80, 200],
      ],
    ],
  ])
  return clipped
    .flatMap((polygon) =>
      polygon.map(
        (ring) =>
          `M${ring
            .slice(0, -1)
            .map(([x, y]) => `${+x.toFixed(3)},${+y.toFixed(3)}`)
            .join("L")}Z`
      )
    )
    .join("")
}

export function letterSvg(path: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" fill="currentColor"><path d="${path}"/></svg>`
}
