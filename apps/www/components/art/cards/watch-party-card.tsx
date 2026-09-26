import type { ArtProps } from "../props"

// Ported from business.x.com: products/x-spaces · Create and share clips.
export function WatchPartyCard(props: ArtProps) {
  return (
    <svg
      fill="none"
      shapeRendering="geometricPrecision"
      viewBox="0 0 264 280"
      aria-hidden="true"
      {...props}
    >
      <g data-group="stack">
        <rect
          data-part="stack-layer"
          data-pos="back"
          fill="var(--ds-gray-100)"
          height="37"
          stroke="currentColor"
          strokeDasharray="4 4"
          strokeWidth="1"
          width="136"
          x="64"
          y="77"
        />
        <rect
          data-part="stack-layer"
          data-pos="middle"
          fill="var(--ds-gray-100)"
          height="37"
          stroke="currentColor"
          strokeDasharray="4 4"
          strokeWidth="1"
          width="156"
          x="54"
          y="86"
        />
      </g>
      <rect
        data-part="card"
        fill="var(--ds-gray-100)"
        height="92.564"
        stroke="currentColor"
        strokeWidth="0.9"
        width="173.317"
        x="45.13"
        y="93.642"
      />
      <g data-group="head">
        <rect
          data-part="head-bar"
          height="7.2"
          stroke="currentColor"
          strokeWidth="0.9"
          width="67.544"
          x="57.766"
          y="104.568"
        />
        <circle
          cx="130.112"
          cy="108.63"
          data-part="head-dot"
          fill="currentColor"
          r="0.56"
        />
        <rect
          data-part="head-tag"
          height="7.2"
          stroke="currentColor"
          strokeWidth="0.9"
          width="16.2"
          x="135.031"
          y="104.568"
        />
      </g>
      <g data-group="name">
        <text
          data-part="name-line"
          fill="currentColor"
          fontSize="10.8"
          fontWeight="500"
          x="57.766"
          y="128.654"
        >
          {"Watch party,"}
        </text>
        <text
          data-part="name-line"
          fill="currentColor"
          fontSize="10.8"
          fontWeight="500"
          x="57.766"
          y="140.654"
        >
          {"let’s go"}
        </text>
      </g>
      <g data-group="button">
        <rect
          data-part="button"
          fill="var(--ds-background-100)"
          height="20.036"
          stroke="currentColor"
          strokeWidth="0.9"
          width="150.138"
          x="56.72"
          y="154.958"
        />
        <text
          data-part="button-label"
          fill="currentColor"
          fontSize="8.5"
          fontWeight="400"
          textAnchor="middle"
          x="131.789"
          y="167.976"
        >
          {"Play recording"}
        </text>
      </g>
      <g data-group="avatars">
        <circle
          cx="184.122"
          cy="135.633"
          data-part="avatar"
          data-pos="small"
          fill="var(--ds-background-100)"
          r="9.84"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle
          cx="199.1"
          cy="125.245"
          data-part="avatar"
          data-pos="medium"
          fill="var(--ds-background-100)"
          r="10.799"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle
          cx="185.805"
          cy="115.365"
          data-part="avatar"
          data-pos="large"
          fill="var(--ds-background-100)"
          r="14.192"
          stroke="currentColor"
          strokeWidth="1"
        />
      </g>
    </svg>
  )
}
