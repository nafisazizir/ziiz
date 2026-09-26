import type { ArtProps } from "../props"

// Ported from business.x.com: products/x-spaces · Replay recorded Spaces.
export function TimerBars(props: ArtProps) {
  return (
    <svg
      viewBox="0 0 264 280"
      fill="none"
      shapeRendering="geometricPrecision"
      aria-hidden="true"
      {...props}
    >
      <g data-group="track">
        <line
          data-part="track-line"
          x1="36"
          y1="161"
          x2="228"
          y2="161"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4.9 4.9"
        />
        <circle
          data-part="track-cap"
          data-pos="min"
          cx="35.939"
          cy="160.939"
          r="2.43855"
          fill="var(--ds-background-100)"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          data-part="track-cap"
          data-pos="max"
          x1="230"
          y1="151"
          x2="230"
          y2="171"
          stroke="currentColor"
          strokeWidth="1"
        />
      </g>
      <rect
        data-part="bounds"
        x="133"
        y="128"
        height="67"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 4"
        style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
        width="97px"
      />
      <rect
        data-part="range-fill"
        x="133"
        y="157"
        height="8"
        fill="var(--ds-background-100)"
        stroke="currentColor"
        strokeWidth="1"
        style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
        width="97px"
      />
      <g
        data-group="stop"
        style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
      >
        <line
          data-part="handle"
          x1="133"
          y1="123"
          x2="133"
          y2="195"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          data-part="caret"
          data-pos="top"
          d="M133.156 124.707L136.604 128.156L133.156 131.604L129.707 128.156L133.156 124.707Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          data-part="caret"
          data-pos="bottom"
          d="M133.013 192.194L136.038 195H130.207L133.013 192.194Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          data-part="value-box"
          x="108"
          y="80"
          width="50"
          height="48"
          fill="var(--ds-background-100)"
          stroke="currentColor"
          strokeWidth="1"
        />
        <text
          data-part="value"
          x="133"
          y="104"
          fill="currentColor"
          fontSize="24"
          fontWeight="500"
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontVariationSettings: '"opsz" 48',
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {"30"}
        </text>
      </g>
    </svg>
  )
}
