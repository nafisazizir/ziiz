import * as React from "react"

import type { ArtProps } from "../props"

// Ported from business.x.com: blog card pattern 03.
export function BlogNotch(props: ArtProps) {
  const id = React.useId()
  return (
    <svg viewBox="0 0 398 245" fill="none" aria-hidden="true" {...props}>
      <g clipPath={`url(#${id}-blog-card-light-03)`}>
        <rect width="398" height="245" fill="var(--ds-gray-100)" />
        <path
          d="M5.5 121L213 121L213 -24.5"
          stroke="currentColor"
          strokeDasharray="4 4"
        />
        <g>
          <rect
            width="6"
            height="6"
            transform="matrix(-1 0 0 1 215 116.5)"
            fill="currentColor"
          />
        </g>
        <path
          d="M212.5 57.5L292 57.5L417.5 57.5"
          stroke="currentColor"
          strokeDasharray="4 4"
        />
        <g>
          <rect
            width="6"
            height="6"
            transform="matrix(-1 0 0 -1 216 61)"
            fill="currentColor"
          />
        </g>
        <rect
          x="-0.5"
          y="0.5"
          width="210"
          height="114"
          rx="57"
          transform="matrix(-1 0 0 1 431 -65)"
          fill="var(--ds-background-100)"
          stroke="currentColor"
        />
        <rect
          x="-0.5"
          y="0.5"
          width="268"
          height="121"
          transform="matrix(-1 0 0 1 204 -9)"
          fill="var(--ds-background-100)"
          stroke="currentColor"
        />
      </g>
      <defs>
        <clipPath id={`${id}-blog-card-light-03`}>
          <rect width="398" height="245" fill="var(--ds-background-100)" />
        </clipPath>
      </defs>
    </svg>
  )
}
