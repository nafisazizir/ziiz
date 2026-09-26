import * as React from "react"

import type { ArtProps } from "../props"

// Ported from business.x.com — basics/intro-x-for-business · Stay in the know.
export function OrbitMark(props: ArtProps) {
  const id = React.useId()
  return (
    <svg
      fill="none"
      shapeRendering="geometricPrecision"
      viewBox="-6 -6 84 84"
      aria-hidden="true"
      {...props}
    >
      <defs>
        <mask
          id={`${id}-satellite-orbit-weave-R-sjqav5tadpfivb`}
          maskUnits="userSpaceOnUse"
        >
          <rect
            fill="var(--ds-background-100)"
            height="38.5084"
            transform="rotate(-45 11 55.8405)"
            width="62"
            x="11"
            y="55.8405"
          />
        </mask>
      </defs>
      <line
        data-part="diagonal"
        stroke="currentColor"
        strokeDasharray="3.2 3.2"
        strokeWidth="0.5"
        x1="0.176777"
        x2="72.1768"
        y1="-0.176899"
        y2="71.8231"
      />
      <circle
        cx="36.5"
        cy="36.4999"
        data-part="disc"
        fill="var(--ds-background-100)"
        r="28.25"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <g data-group="satellites">
        <circle
          data-part="satellite"
          data-pos="east"
          fill="currentColor"
          r="2"
          cx="14.277"
          cy="28.937"
        />
        <circle
          data-part="satellite"
          data-pos="south"
          fill="currentColor"
          r="2"
          cx="46.849"
          cy="1.007"
        />
        <circle
          data-part="satellite"
          data-pos="west"
          fill="currentColor"
          r="2"
          cx="54.113"
          cy="45.84"
        />
        <circle
          data-part="satellite"
          data-pos="north"
          fill="currentColor"
          r="2"
          cx="26.378"
          cy="70.076"
        />
      </g>
      <g data-group="corners">
        <rect
          data-part="corner"
          data-pos="top-left"
          fill="var(--ds-background-100)"
          height="3.5"
          stroke="currentColor"
          strokeWidth="0.5"
          width="3.5"
          x="0.25"
          y="0.249878"
        />
        <rect
          data-part="corner"
          data-pos="bottom-right"
          fill="var(--ds-background-100)"
          height="3.5"
          stroke="currentColor"
          strokeWidth="0.5"
          width="3.5"
          x="68.25"
          y="68.2499"
        />
      </g>
      <ellipse
        cx="35.069"
        cy="35.728"
        data-part="orbit"
        rx="38.124"
        ry="21.553"
        stroke="currentColor"
        strokeWidth="0.5"
        transform="rotate(-60 35.069 35.728)"
      />
      <circle
        cx="36.5"
        cy="36.4999"
        data-part="disc"
        fill="var(--ds-background-100)"
        mask={`url(#${id}-satellite-orbit-weave-R-sjqav5tadpfivb)`}
        r="28.25"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <circle
        cx="36"
        cy="35.9999"
        data-part="hub"
        r="8"
        stroke="currentColor"
        strokeDasharray="3.2 3.2"
        strokeWidth="0.5"
      />
    </svg>
  )
}
