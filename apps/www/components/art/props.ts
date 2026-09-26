import type * as React from "react"

// Every piece is a bare <svg>: strokes take currentColor, fills take ziiz
// surface tokens, size comes from the parent. Pass className, role or an
// aria-label the way you would on any svg.
export type ArtProps = React.SVGProps<SVGSVGElement>
