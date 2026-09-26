import * as React from "react"

import type { ArtProps } from "../props"

// Ported from business.x.com: blog card pattern 06.
export function BlogBowl(props: ArtProps) {
  const id = React.useId()
  return (
    <svg viewBox="0 0 398 245" fill="none" aria-hidden="true" {...props}>
      <g clipPath={`url(#${id}-blog-card-light-06)`}>
        <rect width="398" height="245" fill="var(--ds-gray-100)" />
        <rect
          x="-0.5"
          y="-0.5"
          width="269"
          height="361"
          transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 379 118)"
          stroke="currentColor"
          strokeDasharray="4 4"
        />
        <rect
          x="-0.486226"
          y="-0.486226"
          width="869.372"
          height="352.028"
          rx="176.014"
          transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 374.028 105.7)"
          fill="var(--ds-background-100)"
          stroke="currentColor"
          strokeWidth="0.972452"
        />
      </g>
      <defs>
        <clipPath id={`${id}-blog-card-light-06`}>
          <rect width="398" height="245" fill="var(--ds-background-100)" />
        </clipPath>
      </defs>
    </svg>
  )
}
