import * as React from "react"

import type { ArtProps } from "../props"

// Ported from business.x.com: basics (sign-in mock).
export function XAppTile(props: ArtProps) {
  const id = React.useId()
  return (
    <svg fill="none" viewBox="0 0 33.3 33.3" aria-hidden="true" {...props}>
      <rect
        fill="currentColor"
        height="32.85"
        rx="8.775"
        width="32.85"
        x="0.225"
        y="0.225"
      />
      <rect
        height="32.85"
        rx="8.775"
        stroke={`url(#${id}-cp-R4qqav5tadpfivb)`}
        strokeWidth="0.45"
        width="32.85"
        x="0.225"
        y="0.225"
      />
      <path
        d="M26.2047 26.2125L18.8308 15.313L25.7104 7.19998H23.3158L17.7671 13.7461L13.3406 7.19998H7.30632L14.4141 17.7066L7.20004 26.2125H9.59464L15.4788 19.2724L20.1763 26.2125H26.2125H26.2047ZM12.5518 8.72878L23.346 24.6837H20.9602L10.164 8.72878H12.5499H12.5518Z"
        fill="var(--ds-background-100)"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-cp-R4qqav5tadpfivb`}
          x1="4.5"
          x2="29.25"
          y1="0"
          y2="34.65"
        >
          <stop stopColor="var(--ds-background-100)" stopOpacity="0.6" />
          <stop
            offset="0.460243"
            stopColor="var(--ds-background-100)"
            stopOpacity="0"
          />
          <stop
            offset="1"
            stopColor="var(--ds-background-100)"
            stopOpacity="0.6"
          />
        </linearGradient>
      </defs>
    </svg>
  )
}
