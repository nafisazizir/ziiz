import type { ArtProps } from "../props"

// Ported from help.x.com: rules-and-policies.
export function SweepRings(props: ArtProps) {
  return (
    <svg
      fill="none"
      shapeRendering="geometricPrecision"
      viewBox="0 0 320 224"
      aria-hidden="true"
      {...props}
    >
      <g
        data-group="sweep"
        style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
      >
        <circle
          cx="159"
          cy="110.357"
          data-part="balancer"
          fill="none"
          r="81.5476"
          stroke="none"
        />
        <path
          d="M159 110.357L234.548 110.357A75.5476 75.5476 0 0 1 159 185.905Z"
          data-part="sweep"
          fill="var(--ds-background-100)"
        />
      </g>
      <g data-group="rings">
        <circle
          cx="159"
          cy="110.357"
          data-part="ring"
          data-pos="r17.643"
          fill="none"
          r="17.643"
          stroke="currentColor"
          strokeDasharray="4.52 4.52"
          strokeWidth="0.904762"
          style={{
            transformBox: "fill-box",
            transformOrigin: "50% 50%",
            transform: "rotate(-52.0898deg)",
          }}
        />
        <circle
          cx="159"
          cy="110.357"
          data-part="ring"
          data-pos="r46.5952"
          fill="none"
          r="46.5952"
          stroke="currentColor"
          strokeDasharray="4.52 4.52"
          strokeWidth="0.904762"
          style={{
            transformBox: "fill-box",
            transformOrigin: "50% 50%",
            transform: "rotate(-47.5117deg)",
          }}
        />
        <circle
          cx="159"
          cy="110.357"
          data-part="ring"
          data-pos="r75.5476"
          fill="none"
          r="75.5476"
          stroke="currentColor"
          strokeDasharray="4.52 4.52"
          strokeWidth="0.904762"
          style={{
            transformBox: "fill-box",
            transformOrigin: "50% 50%",
            transform: "rotate(-29.3036deg)",
          }}
        />
      </g>
      <g
        data-group="mechanism"
        style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
      >
        <circle
          cx="159"
          cy="110.357"
          data-part="balancer"
          fill="none"
          r="81.5476"
          stroke="none"
        />
        <g data-group="arms">
          <line
            data-part="arm"
            data-pos="right"
            stroke="currentColor"
            strokeWidth="1"
            x1="159"
            x2="234.548"
            y1="110.357"
            y2="110.357"
          />
          <line
            data-part="arm"
            data-pos="down"
            stroke="currentColor"
            strokeWidth="1"
            x1="159"
            x2="159"
            y1="110.357"
            y2="185.905"
          />
          <line
            data-part="arm"
            data-pos="up-left"
            stroke="currentColor"
            strokeWidth="1"
            x1="159"
            x2="105.58"
            y1="110.357"
            y2="56.937"
          />
        </g>
        <g data-group="caps">
          <rect
            data-part="cap"
            data-pos="right"
            fill="currentColor"
            height="6"
            width="6"
            x="231.548"
            y="107.357"
          />
          <rect
            data-part="cap"
            data-pos="down"
            fill="currentColor"
            height="6"
            width="6"
            x="156"
            y="182.905"
          />
          <rect
            data-part="cap"
            data-pos="up-left"
            fill="currentColor"
            height="6"
            width="6"
            x="102.58"
            y="53.937"
          />
        </g>
      </g>
      <rect
        data-part="hub"
        fill="currentColor"
        height="5.42857"
        width="5.42857"
        x="156.285715"
        y="107.642715"
      />
    </svg>
  )
}
