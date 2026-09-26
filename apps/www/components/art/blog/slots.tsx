import * as React from "react"

import type { ArtProps } from "../props"

// Ported from business.x.com — blog card pattern 10.
export function BlogSlots(props: ArtProps) {
  const id = React.useId()
  return (
    <svg viewBox="0 0 398 245" fill="none" aria-hidden="true" {...props}>
      <g clipPath={`url(#${id}-blog-card-light-10)`}>
        <rect width="398" height="245" fill="var(--ds-gray-100)" />
        <rect
          x="-0.5"
          y="-0.5"
          width="243"
          height="154"
          transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 120 60)"
          stroke="currentColor"
          strokeDasharray="4 4"
        />
        <rect
          x="-0.5"
          y="-0.5"
          width="243"
          height="106"
          transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 382 60)"
          stroke="currentColor"
          strokeDasharray="4 4"
        />
        <line
          x1="-1"
          y1="120.5"
          x2="399"
          y2="120.5"
          stroke="currentColor"
          strokeDasharray="4 4"
        />
        <rect
          x="-0.5"
          y="-0.5"
          width="276"
          height="106"
          transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 251 93)"
          fill="var(--ds-background-100)"
          stroke="currentColor"
        />
      </g>
      <defs>
        <clipPath id={`${id}-blog-card-light-10`}>
          <rect width="398" height="245" fill="var(--ds-background-100)" />
        </clipPath>
      </defs>
    </svg>
  )
}
