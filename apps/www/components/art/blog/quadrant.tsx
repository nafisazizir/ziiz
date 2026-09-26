import * as React from "react"

import type { ArtProps } from "../props"

// Ported from business.x.com: blog card pattern 09.
export function BlogQuadrant(props: ArtProps) {
  const id = React.useId()
  return (
    <svg viewBox="0 0 398 245" fill="none" aria-hidden="true" {...props}>
      <g clipPath={`url(#${id}-blog-card-light-09)`}>
        <rect width="398" height="245" fill="var(--ds-gray-100)" />
        <path
          d="M199.003 121L16 -1.5"
          stroke="currentColor"
          strokeDasharray="4 4"
        />
        <g>
          <rect
            width="6"
            height="6"
            transform="matrix(-1 0 0 -1 202 124)"
            fill="currentColor"
          />
        </g>
        <path d="M198.5 -3.50002L198.5 121L407.5 121" stroke="currentColor" />
        <rect
          x="-0.5"
          y="-0.5"
          width="588"
          height="194"
          rx="97"
          transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 401 112)"
          fill="var(--ds-background-100)"
          stroke="currentColor"
        />
      </g>
      <defs>
        <clipPath id={`${id}-blog-card-light-09`}>
          <rect width="398" height="245" fill="var(--ds-background-100)" />
        </clipPath>
      </defs>
    </svg>
  )
}
