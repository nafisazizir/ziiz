import * as React from "react"

import type { ArtProps } from "../props"

// Ported from business.x.com: blog card pattern 08.
export function BlogSpread(props: ArtProps) {
  const id = React.useId()
  return (
    <svg viewBox="0 0 398 245" fill="none" aria-hidden="true" {...props}>
      <g clipPath={`url(#${id}-blog-card-light-08)`}>
        <rect width="398" height="245" fill="var(--ds-gray-100)" />
        <g>
          <rect
            width="6"
            height="6"
            transform="matrix(-1 0 0 -1 202 124)"
            fill="currentColor"
          />
        </g>
        <path
          d="M199.003 121L17 -0.5"
          stroke="currentColor"
          strokeDasharray="4 4"
        />
        <path d="M199 121L199.003 0.5" stroke="currentColor" />
        <path d="M199 121L381 -0.999878" stroke="currentColor" />
        <path
          d="M199 121L401 48.5004"
          stroke="currentColor"
          strokeDasharray="4 4"
        />
        <path
          d="M199 121L404.5 121"
          stroke="currentColor"
          strokeDasharray="4 4"
        />
        <path
          d="M202 114.608V-3L377 -2.99997L202 114.608Z"
          fill="var(--ds-background-100)"
        />
      </g>
      <defs>
        <clipPath id={`${id}-blog-card-light-08`}>
          <rect width="398" height="245" fill="var(--ds-background-100)" />
        </clipPath>
      </defs>
    </svg>
  )
}
