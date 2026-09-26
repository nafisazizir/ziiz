import * as React from "react"

import type { ArtProps } from "../props"

// Ported from business.x.com — blog card pattern 02.
export function BlogWedge(props: ArtProps) {
  const id = React.useId()
  return (
    <svg viewBox="0 0 398 245" fill="none" aria-hidden="true" {...props}>
      <g clipPath={`url(#${id}-blog-card-light-02)`}>
        <rect width="398" height="245" fill="var(--ds-gray-100)" />
        <rect
          x="20"
          y="121"
          width="157"
          height="143"
          transform="rotate(-90 20 121)"
          stroke="currentColor"
          strokeDasharray="4 4"
        />
        <path d="M20.0001 120L378.5 -2.99982" stroke="currentColor" />
        <path d="M163 120L380.375 -5.5004" stroke="currentColor" />
        <path
          d="M160.242 117.242H166.242V123.242H160.242V117.242Z"
          fill="var(--ds-background-100)"
          stroke="currentColor"
        />
        <path
          d="M23.2422 117.242L23.2422 123.242L17.2422 123.242L17.2422 117.242L23.2422 117.242Z"
          fill="var(--ds-background-100)"
          stroke="currentColor"
        />
        <path
          d="M159.812 117.5L160 75.9999L35.5 117.5L159.812 117.5Z"
          fill="var(--ds-background-100)"
        />
      </g>
      <defs>
        <clipPath id={`${id}-blog-card-light-02`}>
          <rect width="398" height="245" fill="var(--ds-background-100)" />
        </clipPath>
      </defs>
    </svg>
  )
}
