import * as React from "react"

import type { ArtProps } from "../props"

// Ported from business.x.com — blog card pattern 05.
export function BlogCornerNotch(props: ArtProps) {
  const id = React.useId()
  return (
    <svg viewBox="0 0 398 245" fill="none" aria-hidden="true" {...props}>
      <g clipPath={`url(#${id}-blog-card-light-05)`}>
        <rect width="398" height="245" fill="var(--ds-gray-100)" />
        <path
          d="M18 -4L212.997 124L212.997 -21.5"
          stroke="currentColor"
          strokeDasharray="4 4"
        />
        <path
          d="M212.5 66.5L292 66.5L419.5 66.5"
          stroke="currentColor"
          strokeDasharray="4 4"
        />
        <g>
          <rect
            width="6"
            height="6"
            transform="matrix(-1 0 0 -1 216 70)"
            fill="currentColor"
          />
        </g>
        <g>
          <rect
            width="6"
            height="6"
            transform="matrix(-1 0 0 -1 216 125)"
            fill="currentColor"
          />
        </g>
        <rect
          x="-0.5"
          y="0.5"
          width="210"
          height="114"
          rx="57"
          transform="matrix(-1 0 0 1 431 -62)"
          fill="var(--ds-background-100)"
          stroke="currentColor"
        />
        <path d="M21.5029 -3.00032L213.003 67.0001" stroke="currentColor" />
      </g>
      <defs>
        <clipPath id={`${id}-blog-card-light-05`}>
          <rect width="398" height="245" fill="var(--ds-background-100)" />
        </clipPath>
      </defs>
    </svg>
  )
}
