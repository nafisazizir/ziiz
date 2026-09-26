import type { ArtProps } from "../props"

// Ported from business.x.com — advertising, spotlight-takeovers.
export function RadarRing(props: ArtProps) {
  return (
    <svg
      viewBox="-6 -6 84 84"
      fill="none"
      shapeRendering="geometricPrecision"
      aria-hidden="true"
      {...props}
    >
      <g>
        <circle
          data-group="rings"
          data-part="dashed-ring"
          cx="36"
          cy="36"
          r="35"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="3.2 3.2"
          style={{
            transformBox: "fill-box",
            transformOrigin: "50% 50%",
            transform: "rotate(-19.129deg)",
          }}
        />
        <circle
          data-group="rings"
          data-part="solid-ring"
          cx="36"
          cy="36"
          r="23"
          fill="var(--ds-background-100)"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <g
          data-group="mechanism"
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
        >
          <circle
            data-part="balancer"
            cx="36"
            cy="36"
            r="42"
            fill="none"
            stroke="none"
          />
          <g data-group="arms">
            <line
              data-part="arm"
              data-pos="up"
              x1="36"
              y1="36"
              x2="35.99999999999999"
              y2="13"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <line
              data-part="arm"
              data-pos="down-right"
              x1="36"
              y1="36"
              x2="66.31088913245536"
              y2="53.5"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <line
              data-part="arm"
              data-pos="down-left"
              x1="36"
              y1="36"
              x2="5.689110867544645"
              y2="53.5"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </g>
          <g data-group="markers">
            <rect
              data-part="marker"
              data-pos="up"
              x="33.99999999999999"
              y="11"
              width="4"
              height="4"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="0.5"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
            <rect
              data-part="marker"
              data-pos="down-right"
              x="64.31088913245536"
              y="51.5"
              width="4"
              height="4"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="0.5"
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                transform: "rotate(-15deg) scale(1)",
              }}
            />
            <rect
              data-part="marker"
              data-pos="down-left"
              x="3.6891108675446453"
              y="51.5"
              width="4"
              height="4"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="0.5"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          </g>
        </g>
        <circle
          data-group="hub"
          data-part="hub-ring"
          cx="36"
          cy="36"
          r="9"
          fill="var(--ds-background-100)"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <circle
          data-group="hub"
          data-part="center-dot"
          cx="36"
          cy="36"
          r="2"
          fill="currentColor"
        />
      </g>
    </svg>
  )
}
