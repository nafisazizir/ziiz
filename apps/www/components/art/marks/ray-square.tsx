import type { ArtProps } from "../props"

// Ported from business.x.com — advertising.
export function RaySquare(props: ArtProps) {
  return (
    <svg
      viewBox="-6 -6 84 84"
      fill="none"
      shapeRendering="geometricPrecision"
      aria-hidden="true"
      {...props}
    >
      <g>
        <g data-group="connectors-dashed">
          <line
            data-part="connector-dashed"
            x1="0"
            y1="0"
            x2="36"
            y2="36"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="3.2 3.2"
          />
          <line
            data-part="connector-dashed"
            x1="0"
            y1="20"
            x2="36"
            y2="36"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="3.2 3.2"
          />
          <line
            data-part="connector-dashed"
            x1="0"
            y1="36"
            x2="36"
            y2="36"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="3.2 3.2"
          />
          <line
            data-part="connector-dashed"
            x1="0"
            y1="52"
            x2="36"
            y2="36"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="3.2 3.2"
          />
          <line
            data-part="connector-dashed"
            x1="0"
            y1="72"
            x2="36"
            y2="36"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="3.2 3.2"
          />
        </g>
        <g data-group="connectors-solid">
          <line
            data-part="connector-solid"
            x1="36"
            y1="36"
            x2="72"
            y2="0"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            data-part="connector-solid"
            x1="36"
            y1="36"
            x2="72"
            y2="20"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            data-part="connector-solid"
            x1="36"
            y1="36"
            x2="72"
            y2="36"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            data-part="connector-solid"
            x1="36"
            y1="36"
            x2="72"
            y2="52"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            data-part="connector-solid"
            x1="36"
            y1="36"
            x2="72"
            y2="72"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </g>
        <g data-group="signals">
          <circle
            data-part="signal-dot"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            cx="47.949971270165406"
            cy="24.050028729834594"
            r="1.25"
          />
          <circle
            data-part="signal-dot"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            cx="44.04548922122922"
            cy="32.424227012787014"
            r="1.25"
          />
          <circle
            data-part="signal-dot"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            cx="40.82709365745541"
            cy="36"
            r="1.25"
          />
          <circle
            data-part="signal-dot"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            cx="38.41094304446597"
            cy="37.071530241984874"
            r="1.25"
          />
          <circle
            data-part="signal-dot"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            cx="36.84999373939354"
            cy="36.84999373939354"
            r="1.25"
            opacity="0.8997685945068952"
          />
        </g>
        <g data-group="node">
          <rect
            data-part="node-body"
            x="24"
            y="24"
            width="24"
            height="24"
            fill="var(--ds-background-100)"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            data-part="node-dot"
            cx="36"
            cy="36"
            r="2"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </g>
      </g>
    </svg>
  )
}
