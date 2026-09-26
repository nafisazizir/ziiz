import * as React from "react"

import type { ArtProps } from "../props"

// Ported from business.x.com: blog card pattern 11.
export function BlogColumns(props: ArtProps) {
  const id = React.useId()
  return (
    <svg viewBox="0 0 398 245" fill="none" aria-hidden="true" {...props}>
      <g clipPath={`url(#${id}-blog-card-light-11)`}>
        <rect width="398" height="245" fill="var(--ds-gray-100)" />
        <rect
          x="-0.5"
          y="0.5"
          width="59"
          height="136"
          transform="matrix(-1 8.74228e-08 8.74228e-08 1 175 -16)"
          fill="var(--ds-background-100)"
          stroke="currentColor"
        />
        <rect
          x="-0.5"
          y="0.5"
          width="142"
          height="59"
          transform="matrix(-1 8.74228e-08 8.74228e-08 1 91 61)"
          stroke="currentColor"
          strokeDasharray="4 4"
        />
        <rect
          x="0.5"
          y="0.5"
          width="142"
          height="59"
          transform="matrix(-4.37114e-08 1 1 4.37114e-08 200 -22)"
          stroke="currentColor"
          strokeDasharray="4 4"
        />
        <rect
          x="0.5"
          y="0.5"
          width="142"
          height="59"
          transform="matrix(-4.37114e-08 1 1 4.37114e-08 284 -22)"
          stroke="currentColor"
          strokeDasharray="4 4"
        />
        <rect
          x="0.5"
          y="0.5"
          width="142"
          height="59"
          transform="matrix(-4.37114e-08 1 1 4.37114e-08 368 -22)"
          stroke="currentColor"
          strokeDasharray="4 4"
        />
      </g>
      <defs>
        <clipPath id={`${id}-blog-card-light-11`}>
          <rect width="398" height="245" fill="var(--ds-background-100)" />
        </clipPath>
      </defs>
    </svg>
  )
}
