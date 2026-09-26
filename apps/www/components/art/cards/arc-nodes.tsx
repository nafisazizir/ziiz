import type { ArtProps } from "../props"

// Ported from business.x.com — products/x-spaces · Stay in control.
export function ArcNodes(props: ArtProps) {
  return (
    <svg
      fill="none"
      shapeRendering="geometricPrecision"
      viewBox="0 0 264 280"
      aria-hidden="true"
      {...props}
    >
      <g data-group="links">
        <line
          data-part="link"
          data-pos="top-upper"
          stroke="currentColor"
          strokeDasharray="4.4 4.4"
          strokeWidth="1"
          x1="131.85"
          x2="131.85"
          y1="55.3"
          y2="111.4"
        />
        <line
          data-part="link"
          data-pos="upper-lower"
          stroke="currentColor"
          strokeDasharray="4.4 4.4"
          strokeWidth="1"
          x1="131.85"
          x2="131.85"
          y1="111.4"
          y2="168.6"
        />
        <line
          data-part="link"
          data-pos="lower-bottom"
          stroke="currentColor"
          strokeDasharray="4.4 4.4"
          strokeWidth="1"
          x1="131.85"
          x2="131.85"
          y1="168.6"
          y2="224.7"
        />
      </g>
      <g data-group="arcs">
        <path
          d="M131.85 55.3A56.65 56.65 0 0 0 131.85 168.6"
          data-part="arc"
          data-pos="upper"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M131.85 224.7A56.65 56.65 0 0 0 131.85 111.4"
          data-part="arc"
          data-pos="lower"
          stroke="currentColor"
          strokeWidth="1"
        />
      </g>
      <g data-group="nodes">
        <g data-part="node" data-pos="top">
          <circle
            cx="131.85"
            cy="55.3"
            data-state="hollow"
            fill="var(--ds-background-100)"
            r="3.85"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="131.85"
            cy="55.3"
            data-state="lit"
            fill="currentColor"
            r="3.85"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0"
          />
        </g>
        <g data-part="node" data-pos="upper">
          <circle
            cx="131.85"
            cy="111.4"
            data-state="hollow"
            fill="var(--ds-background-100)"
            r="3.85"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="131.85"
            cy="111.4"
            data-state="lit"
            fill="currentColor"
            r="3.85"
            stroke="currentColor"
            strokeWidth="1"
          />
        </g>
        <g data-part="node" data-pos="lower">
          <circle
            cx="131.85"
            cy="168.6"
            data-state="hollow"
            fill="var(--ds-background-100)"
            r="3.85"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="131.85"
            cy="168.6"
            data-state="lit"
            fill="currentColor"
            r="3.85"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0"
          />
        </g>
        <g data-part="node" data-pos="bottom">
          <circle
            cx="131.85"
            cy="224.7"
            data-state="hollow"
            fill="var(--ds-background-100)"
            r="3.85"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="131.85"
            cy="224.7"
            data-state="lit"
            fill="currentColor"
            r="3.85"
            stroke="currentColor"
            strokeWidth="1"
          />
        </g>
      </g>
      <g data-group="badges">
        <g data-part="badge" data-pos="left">
          <circle
            cx="77.95"
            cy="111.4"
            data-state="shell"
            fill="var(--ds-background-100)"
            r="12.1"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="77.95"
            cy="111.4"
            data-state="ring"
            r="7.7"
            stroke="currentColor"
            strokeDasharray="4.4 4.4"
            strokeWidth="1"
            style={{
              transformBox: "fill-box",
              transformOrigin: "50% 50%",
              transform: "rotate(-360deg)",
            }}
          />
        </g>
        <g data-part="badge" data-pos="right">
          <circle
            cx="189.05"
            cy="168.6"
            data-state="shell"
            fill="var(--ds-background-100)"
            r="12.1"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="189.05"
            cy="168.6"
            data-state="ring"
            r="7.7"
            stroke="currentColor"
            strokeDasharray="4.4 4.4"
            strokeWidth="1"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
        </g>
      </g>
    </svg>
  )
}
