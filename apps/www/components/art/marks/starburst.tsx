import type { ArtProps } from "../props"

// Ported from business.x.com: basics/intro-x-for-business · Free business promotion.
export function Starburst(props: ArtProps) {
  return (
    <svg
      fill="none"
      shapeRendering="geometricPrecision"
      viewBox="-6 -6 84 84"
      aria-hidden="true"
      {...props}
    >
      <g data-group="rays-solid">
        <path
          d="M35.5 35.5L0.210459 72.1352"
          data-part="ray-solid"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <path
          d="M35.5 39.3491L0.210459 2.71392"
          data-part="ray-solid"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <path
          d="M35.9962 36.0002L72.2076 71.8651"
          data-part="ray-solid"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <path
          d="M35.9962 38.8489L72.2076 2.98401"
          data-part="ray-solid"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <path
          d="M36.25 36L36.25 72"
          data-part="ray-solid"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <path
          d="M36.25 38.8491L36.25 2.84912"
          data-part="ray-solid"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </g>
      <g data-group="rays-dashed">
        <path
          d="M36 36L24 62"
          data-part="ray-dashed"
          stroke="currentColor"
          strokeDasharray="3.2 3.2"
          strokeWidth="0.5"
        />
        <path
          d="M36 38.8491L24 12.8491"
          data-part="ray-dashed"
          stroke="currentColor"
          strokeDasharray="3.2 3.2"
          strokeWidth="0.5"
        />
        <path
          d="M36 36L48 62"
          data-part="ray-dashed"
          stroke="currentColor"
          strokeDasharray="3.2 3.2"
          strokeWidth="0.5"
        />
        <path
          d="M36 38.8491L48 12.8491"
          data-part="ray-dashed"
          stroke="currentColor"
          strokeDasharray="3.2 3.2"
          strokeWidth="0.5"
        />
      </g>
      <g data-group="node">
        <circle
          cx="36"
          cy="36"
          data-part="node-ring"
          fill="var(--ds-background-100)"
          r="10"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <circle
          cx="36"
          cy="36"
          data-part="node-core"
          fill="currentColor"
          r="2"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </g>
    </svg>
  )
}
