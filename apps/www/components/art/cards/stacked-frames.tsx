import type { ArtProps } from "../props"

// Ported from business.x.com — advertising/creative-best-practices.
export function StackedFrames(props: ArtProps) {
  return (
    <svg
      viewBox="0 0 362.667 214"
      fill="none"
      shapeRendering="geometricPrecision"
      aria-hidden="true"
      {...props}
    >
      <g data-group="guides">
        <line
          data-part="rule"
          data-pos="horizontal"
          x1="109.332"
          y1="51"
          x2="240.332"
          y2="51"
          stroke="currentColor"
          strokeOpacity="0.6"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          data-part="rule"
          data-pos="horizontal"
          x1="109.332"
          y1="99"
          x2="240.332"
          y2="99"
          stroke="currentColor"
          strokeOpacity="0.6"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          data-part="rule"
          data-pos="horizontal"
          x1="109.332"
          y1="115"
          x2="240.332"
          y2="115"
          stroke="currentColor"
          strokeOpacity="0.6"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          data-part="rule"
          data-pos="horizontal"
          x1="109.332"
          y1="163"
          x2="240.332"
          y2="163"
          stroke="currentColor"
          strokeOpacity="0.6"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          data-part="rule"
          data-pos="vertical"
          x1="122.332"
          y1="35"
          x2="122.332"
          y2="179"
          stroke="currentColor"
          strokeOpacity="0.6"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          data-part="rule"
          data-pos="vertical"
          x1="227.332"
          y1="35"
          x2="227.332"
          y2="179"
          stroke="currentColor"
          strokeOpacity="0.6"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </g>
      <g data-group="boxes">
        <rect
          data-part="box"
          data-pos="top"
          x="122.332"
          y="51"
          width="105"
          height="48"
          fill="var(--ds-background-100)"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          data-part="box"
          data-pos="bottom"
          x="122.332"
          y="115"
          width="105"
          height="48"
          stroke="currentColor"
          strokeWidth="1"
        />
      </g>
      <g data-group="circles">
        <g style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}>
          <circle
            data-part="circle"
            data-pos="top"
            cx="147.332"
            cy="75"
            r="20"
            fill="var(--ds-background-100)"
            stroke="currentColor"
            strokeWidth="1"
          />
        </g>
        <g style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}>
          <circle
            data-part="circle"
            data-pos="bottom"
            cx="203.332"
            cy="139"
            r="20"
            stroke="currentColor"
            strokeWidth="1"
          />
        </g>
      </g>
    </svg>
  )
}
