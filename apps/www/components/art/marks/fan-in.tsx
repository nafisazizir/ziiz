import type { ArtProps } from "../props"

// Ported from business.x.com: advertising, spotlight-takeovers.
export function FanIn(props: ArtProps) {
  return (
    <svg
      viewBox="6 6 67 67"
      fill="none"
      shapeRendering="geometricPrecision"
      aria-hidden="true"
      {...props}
    >
      <g>
        <g data-group="connectors">
          <path
            data-part="connector"
            d="M9 62.75C26.8976 62.75 38.1218 62.75 54 62.75C56.8307 62.75 59.8093 62.75 63 62.75"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="3.2 3.2"
          />
          <path
            data-part="connector"
            d="M9.11328 35.7764C27.3422 44.8908 38.6484 50.5439 55 58.7197C57.5649 60.0022 60.2539 61.3467 63.1133 62.7764"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="3.2 3.2"
          />
          <path
            data-part="connector"
            d="M36.2227 8.88818L59.2786 55L63.2227 62.8882"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="3.2 3.2"
          />
          <path
            data-part="connector"
            d="M63 63L56.7521 56.7521L9 9"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="3.2 3.2"
          />
          <path
            data-part="connector"
            d="M63 63L63 54L63 9"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="3.2 3.2"
          />
        </g>
        <g data-group="audience-node-1" data-phase="a">
          <circle
            data-part="marker-dot"
            data-state="hollow"
            cx="9"
            cy="9"
            r="2"
            fill="var(--ds-background-100)"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            data-part="marker-dot"
            data-state="filled"
            cx="9"
            cy="9"
            r="2"
            fill="currentColor"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        </g>
        <g data-group="audience-node-2" data-phase="b">
          <rect
            data-part="marker-square"
            data-state="hollow"
            x="34"
            y="7"
            width="4"
            height="4"
            fill="var(--ds-background-100)"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <rect
            data-part="marker-square"
            data-state="filled"
            x="34"
            y="7"
            width="4"
            height="4"
            fill="currentColor"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            opacity="0"
          />
        </g>
        <g data-group="audience-node-3" data-phase="b">
          <rect
            data-part="marker-square"
            data-state="hollow"
            x="61"
            y="7"
            width="4"
            height="4"
            fill="var(--ds-background-100)"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <rect
            data-part="marker-square"
            data-state="filled"
            x="61"
            y="7"
            width="4"
            height="4"
            fill="currentColor"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            opacity="0"
          />
        </g>
        <g data-group="audience-node-4" data-phase="b">
          <rect
            data-part="marker-square"
            data-state="hollow"
            x="7"
            y="34"
            width="4"
            height="4"
            fill="var(--ds-background-100)"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <rect
            data-part="marker-square"
            data-state="filled"
            x="7"
            y="34"
            width="4"
            height="4"
            fill="currentColor"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            opacity="0"
          />
        </g>
        <g data-group="audience-node-5" data-phase="b">
          <rect
            data-part="marker-square"
            data-state="hollow"
            x="34"
            y="34"
            width="4"
            height="4"
            fill="var(--ds-background-100)"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <rect
            data-part="marker-square"
            data-state="filled"
            x="34"
            y="34"
            width="4"
            height="4"
            fill="currentColor"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            opacity="0"
          />
        </g>
        <g data-group="audience-node-6" data-phase="a">
          <circle
            data-part="marker-dot"
            data-state="hollow"
            cx="63"
            cy="36"
            r="2"
            fill="var(--ds-background-100)"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            data-part="marker-dot"
            data-state="filled"
            cx="63"
            cy="36"
            r="2"
            fill="currentColor"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        </g>
        <g data-group="audience-node-7" data-phase="a">
          <circle
            data-part="marker-dot"
            data-state="hollow"
            cx="9"
            cy="63"
            r="2"
            fill="var(--ds-background-100)"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            data-part="marker-dot"
            data-state="filled"
            cx="9"
            cy="63"
            r="2"
            fill="currentColor"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        </g>
        <g data-group="hub">
          <circle
            data-part="ring"
            cx="63"
            cy="63"
            r="9"
            fill="var(--ds-background-100)"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            data-part="hub-indicator"
            data-shape="dot"
            cx="63"
            cy="63"
            r="2"
            fill="currentColor"
          />
          <rect
            data-part="hub-indicator"
            data-shape="square"
            x="61"
            y="61"
            width="4"
            height="4"
            fill="currentColor"
            opacity="0"
          />
        </g>
      </g>
    </svg>
  )
}
