import type { ArtProps } from "../props"

// Ported from help.x.com: using-x.
export function EclipsePair(props: ArtProps) {
  return (
    <svg
      fill="none"
      shapeRendering="geometricPrecision"
      viewBox="0 0 320 224"
      aria-hidden="true"
      {...props}
    >
      <circle
        data-part="satellite"
        fill="var(--ds-background-100)"
        r="27.5"
        stroke="currentColor"
        strokeWidth="1"
        cx="214.938"
        cy="126.675"
      />
      <line
        data-part="diagonal"
        stroke="currentColor"
        strokeDasharray="4 4"
        strokeWidth="1"
        x1="82.354"
        x2="223.775"
        y1="41.325"
        y2="182.747"
      />
      <g data-group="terminals">
        <rect
          data-part="terminal"
          data-pos="start"
          fill="currentColor"
          height="6"
          width="6"
          x="79"
          y="38.679"
        />
        <rect
          data-part="terminal"
          data-pos="end"
          fill="currentColor"
          height="6"
          width="6"
          x="221"
          y="179.679"
        />
      </g>
      <circle
        cx="153"
        cy="112.679"
        data-part="ring"
        r="63.5"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle
        cx="153"
        cy="112.679"
        data-part="hub"
        fill="var(--ds-gray-100)"
        r="16"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle
        data-part="dot"
        fill="var(--ds-background-100)"
        r="3"
        stroke="currentColor"
        strokeWidth="1"
        cx="214.938"
        cy="126.675"
      />
    </svg>
  )
}
