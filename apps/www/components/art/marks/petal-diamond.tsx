import type { ArtProps } from "../props"

// Ported from business.x.com: advertising, spotlight-takeovers.
export function PetalDiamond(props: ArtProps) {
  return (
    <svg
      viewBox="-6 -6 82 82"
      fill="none"
      shapeRendering="geometricPrecision"
      aria-hidden="true"
      {...props}
    >
      <g>
        <g data-group="dashed-petals">
          <circle
            data-part="dashed-circle"
            data-pos="top"
            cx="36"
            cy="17.25"
            r="17.22"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="3 3"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <circle
            data-part="dashed-circle"
            data-pos="right"
            cx="54.75"
            cy="36"
            r="17.22"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="3.2 3.2"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <circle
            data-part="dashed-circle"
            data-pos="bottom"
            cx="36"
            cy="54.75"
            r="17.22"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="3 3"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <circle
            data-part="dashed-circle"
            data-pos="left"
            cx="17.25"
            cy="36"
            r="17.22"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="3.2 3.2"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        </g>
        <path
          data-part="diamond"
          d="M36 17.25 L54.75 36 L36 54.75 L17.25 36 Z"
          fill="var(--ds-background-100)"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <g data-group="nodes">
          <g data-group="node" data-pos="left">
            <circle
              data-part="node"
              data-state="hollow"
              data-pos="left"
              cx="17.25"
              cy="36"
              r="2"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <circle
              data-part="node"
              data-state="lit"
              data-pos="left"
              cx="17.25"
              cy="36"
              r="2"
              fill="currentColor"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            />
          </g>
          <g data-group="node" data-pos="top">
            <circle
              data-part="node"
              data-state="hollow"
              data-pos="top"
              cx="36"
              cy="17.25"
              r="2"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <circle
              data-part="node"
              data-state="lit"
              data-pos="top"
              cx="36"
              cy="17.25"
              r="2"
              fill="currentColor"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              opacity="0"
            />
          </g>
          <g data-group="node" data-pos="right">
            <circle
              data-part="node"
              data-state="hollow"
              data-pos="right"
              cx="54.75"
              cy="36"
              r="2"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <circle
              data-part="node"
              data-state="lit"
              data-pos="right"
              cx="54.75"
              cy="36"
              r="2"
              fill="currentColor"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              opacity="0"
            />
          </g>
          <g data-group="node" data-pos="bottom">
            <circle
              data-part="node"
              data-state="hollow"
              data-pos="bottom"
              cx="36"
              cy="54.75"
              r="2"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <circle
              data-part="node"
              data-state="lit"
              data-pos="bottom"
              cx="36"
              cy="54.75"
              r="2"
              fill="currentColor"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              opacity="0"
            />
          </g>
        </g>
        <rect
          data-group="core"
          data-part="center-square"
          x="34"
          y="34"
          width="4"
          height="4"
          fill="currentColor"
          style={{
            transformBox: "fill-box",
            transformOrigin: "50% 50%",
            transform: "scale(1.02756)",
          }}
        />
      </g>
    </svg>
  )
}
