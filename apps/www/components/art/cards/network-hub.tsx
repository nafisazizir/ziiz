import type { ArtProps } from "../props"

// Ported from business.x.com: products/x-spaces · Expand your reach.
export function NetworkHub(props: ArtProps) {
  return (
    <svg
      fill="none"
      shapeRendering="geometricPrecision"
      viewBox="56 42.5 256 303"
      aria-hidden="true"
      {...props}
    >
      <circle
        cx="288"
        cy="314"
        data-part="node-solid"
        data-pos="down-right"
        fill="var(--ds-background-100)"
        r="24"
        stroke="currentColor"
        strokeWidth="1"
      />
      <g data-group="rings">
        <circle
          cx="70"
          cy="78"
          data-part="ring"
          data-pos="up-left"
          r="13"
          stroke="currentColor"
          strokeDasharray="4 4"
          strokeWidth="1"
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
        />
        <circle
          cx="215"
          cy="93"
          data-part="ring"
          data-pos="up"
          r="15"
          stroke="currentColor"
          strokeDasharray="4 4"
          strokeWidth="1"
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
        />
        <circle
          cx="303"
          cy="118"
          data-part="ring"
          data-pos="up-right"
          r="15"
          stroke="currentColor"
          strokeDasharray="4 4"
          strokeWidth="1"
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
        />
        <circle
          cx="95"
          cy="314"
          data-part="ring"
          data-pos="down-left"
          r="15"
          stroke="currentColor"
          strokeDasharray="4 4"
          strokeWidth="1"
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
        />
      </g>
      <g data-group="dots">
        <circle
          cx="70"
          cy="78"
          data-part="node-dot"
          data-pos="up-left"
          fill="currentColor"
          r="2.5"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle
          cx="215"
          cy="93"
          data-part="node-dot"
          data-pos="up"
          fill="currentColor"
          r="2.5"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle
          cx="303"
          cy="118"
          data-part="node-dot"
          data-pos="up-right"
          fill="currentColor"
          r="2.5"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle
          cx="95"
          cy="314"
          data-part="node-dot"
          data-pos="down-left"
          fill="currentColor"
          r="2.5"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle
          cx="288"
          cy="314"
          data-part="node-dot"
          data-pos="down-right"
          fill="currentColor"
          r="2.5"
          stroke="currentColor"
          strokeWidth="1"
        />
      </g>
      <circle
        cx="184"
        cy="194"
        data-part="disc"
        fill="var(--ds-gray-200)"
        r="65.5"
        stroke="currentColor"
        strokeDasharray="4 4"
        strokeWidth="1"
        style={{
          transformBox: "fill-box",
          transformOrigin: "50% 50%",
          transform: "rotate(-7.05882deg)",
        }}
      />
      <g data-group="rays">
        <line
          data-part="ray"
          data-pos="up-left"
          stroke="currentColor"
          strokeWidth="1"
          x1="184"
          x2="70"
          y1="194"
          y2="78"
        />
        <line
          data-part="ray"
          data-pos="up"
          stroke="currentColor"
          strokeWidth="1"
          x1="184"
          x2="215"
          y1="194"
          y2="93"
        />
        <line
          data-part="ray"
          data-pos="up-right"
          stroke="currentColor"
          strokeWidth="1"
          x1="184"
          x2="303"
          y1="194"
          y2="118"
        />
        <line
          data-part="ray"
          data-pos="down-left"
          stroke="currentColor"
          strokeWidth="1"
          x1="184"
          x2="95"
          y1="194"
          y2="314"
        />
        <line
          data-part="ray"
          data-pos="down-right"
          stroke="currentColor"
          strokeWidth="1"
          x1="184"
          x2="288"
          y1="194"
          y2="314"
        />
      </g>
      <g data-group="hub">
        <circle
          cx="184"
          cy="194"
          data-part="hub-ring"
          fill="var(--ds-background-100)"
          r="16"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle
          cx="184"
          cy="194"
          data-part="hub-core"
          r="3.5"
          stroke="currentColor"
          strokeWidth="1"
        />
      </g>
    </svg>
  )
}
