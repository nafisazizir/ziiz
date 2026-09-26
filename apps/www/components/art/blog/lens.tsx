import * as React from "react"

import type { ArtProps } from "../props"

// Ported from business.x.com: blog card pattern 07.
export function BlogLens(props: ArtProps) {
  const id = React.useId()
  return (
    <svg viewBox="0 0 398 245" fill="none" aria-hidden="true" {...props}>
      <g clipPath={`url(#${id}-blog-card-light-07)`}>
        <rect width="398" height="245" fill="var(--ds-gray-100)" />
        <rect
          x="-0.5"
          y="0.5"
          width="588"
          height="106"
          transform="matrix(-1 0 0 1 196 14)"
          stroke="currentColor"
        />
        <path d="M649.812 66.5L165.5 66.5" stroke="currentColor" />
        <line
          x1="-58.8672"
          y1="66.5"
          x2="141.309"
          y2="66.5"
          stroke="currentColor"
          strokeDasharray="4 4"
        />
        <circle cx="195.5" cy="67.5" r="53" stroke="currentColor" />
        <circle cx="168" cy="66.5" r="3" fill="currentColor" />
        <g>
          <rect
            x="180.5"
            y="51.5"
            width="31"
            height="31"
            rx="15.5"
            fill="var(--ds-background-100)"
          />
          <rect
            x="180.5"
            y="51.5"
            width="31"
            height="31"
            rx="15.5"
            stroke="currentColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id={`${id}-blog-card-light-07`}>
          <rect width="398" height="245" fill="var(--ds-background-100)" />
        </clipPath>
      </defs>
    </svg>
  )
}
