import * as React from "react"

import type { ArtProps } from "../props"

// Ported from business.x.com — blog card pattern 04.
export function BlogWedgeMirror(props: ArtProps) {
  const id = React.useId()
  return (
    <svg viewBox="0 0 398 245" fill="none" aria-hidden="true" {...props}>
      <g clipPath={`url(#${id}-blog-card-light-04)`}>
        <rect
          width="398"
          height="245"
          transform="matrix(-1 0 0 1 398 0)"
          fill="var(--ds-gray-100)"
        />
        <rect
          width="157"
          height="143"
          transform="matrix(2.18557e-08 -1 -1 -2.18557e-08 378 121)"
          stroke="currentColor"
          strokeDasharray="4 4"
        />
        <path d="M378 120L19.5 -2.99982" stroke="currentColor" />
        <path d="M235 120L17.6248 -5.5004" stroke="currentColor" />
        <path
          d="M237.758 117.242H231.758V123.242H237.758V117.242Z"
          fill="var(--ds-background-100)"
          stroke="currentColor"
        />
        <path
          d="M374.758 117.242L374.758 123.242L380.758 123.242L380.758 117.242L374.758 117.242Z"
          fill="var(--ds-background-100)"
          stroke="currentColor"
        />
        <path
          d="M238.188 117.5L238 75.9999L362.5 117.5L238.188 117.5Z"
          fill="var(--ds-background-100)"
        />
      </g>
      <defs>
        <clipPath id={`${id}-blog-card-light-04`}>
          <rect width="398" height="245" fill="var(--ds-background-100)" />
        </clipPath>
      </defs>
    </svg>
  )
}
