import type { ArtProps } from "../props"

// Ported from business.x.com: basics/intro-x-for-business · Start a conversation; takeovers.
export function ConversationPair(props: ArtProps) {
  return (
    <svg
      viewBox="-6 -6 84 84"
      fill="none"
      shapeRendering="geometricPrecision"
      aria-hidden="true"
      {...props}
    >
      <g data-group="conduits">
        <line
          data-part="conduit"
          data-pos="down"
          x1="32.2578"
          y1="12.2499"
          x2="60.7578"
          y2="42.7499"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="5 5"
        />
        <line
          data-part="conduit"
          data-pos="up"
          x1="43.7578"
          y1="61.7499"
          x2="13.7578"
          y2="29.7499"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="5 5"
        />
      </g>
      <g data-group="payloads">
        <circle
          data-part="payload"
          data-pos="down"
          cx="32.2578"
          cy="12.2499"
          r="2"
          fill="var(--ds-background-100)"
          stroke="currentColor"
          strokeWidth="0.5"
          style={{
            transform: "translateX(3.01787px) translateY(3.22965px)",
            transformOrigin: "50% 50%",
            transformBox: "fill-box",
          }}
        />
        <circle
          data-part="payload"
          data-pos="up"
          cx="43.7578"
          cy="61.7499"
          r="2"
          fill="var(--ds-background-100)"
          stroke="currentColor"
          strokeWidth="0.5"
          style={{
            transform: "translateX(-6.06225px) translateY(-6.4664px)",
            transformOrigin: "50% 50%",
            transformBox: "fill-box",
          }}
        />
      </g>
      <g data-group="nodes">
        <rect
          data-part="node"
          data-pos="top"
          x="9.2578"
          y="7.2499"
          width="26"
          height="26"
          rx="13"
          fill="var(--ds-background-100)"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <rect
          data-part="figure"
          data-pos="top"
          x="20.2578"
          y="18.2499"
          width="4"
          height="4"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.5"
          rx="0"
          ry="0"
        />
        <rect
          data-part="node"
          data-pos="bottom"
          x="38.2578"
          y="38.2499"
          width="26"
          height="26"
          rx="13"
          fill="var(--ds-background-100)"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <rect
          data-part="figure"
          data-pos="bottom"
          x="49.2578"
          y="49.2499"
          width="4"
          height="4"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.5"
          rx="2"
          ry="2"
        />
      </g>
      <g data-group="frame">
        <path
          data-part="corner"
          d="M8.25 0.25H0.25V8.25"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="5 5"
        />
        <path
          data-part="corner"
          d="M72.25 8.25V0.25H64.25"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="5 5"
        />
        <path
          data-part="corner"
          d="M64.25 72.25H72.25V64.25"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="5 5"
        />
        <path
          data-part="corner"
          d="M0.25 64.25V72.25H8.25"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="5 5"
        />
      </g>
    </svg>
  )
}
