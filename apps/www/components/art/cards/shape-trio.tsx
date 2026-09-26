import type { ArtProps } from "../props"

// Ported from business.x.com — advertising/creative-best-practices.
export function ShapeTrio(props: ArtProps) {
  return (
    <svg
      viewBox="0 0 362.667 214"
      fill="none"
      shapeRendering="geometricPrecision"
      aria-hidden="true"
      {...props}
    >
      <g>
        <g data-part="column" data-col="left">
          <path
            data-part="bar"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
            d="M96.668 127L146.668 127L146.668 168L96.668 168Z"
          />
          <g
            data-part="node"
            style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
          >
            <circle
              data-part="ring"
              cx="121.668"
              cy="92"
              r="25"
              stroke="currentColor"
              strokeWidth="1"
            />
            <rect
              data-part="glyph"
              data-shape="square"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="1"
              x="115.668"
              y="86"
              width="12"
              height="12"
            />
          </g>
        </g>
        <g data-part="column" data-col="center">
          <path
            data-part="bar"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
            d="M158.668 104L208.668 104L208.668 168L158.668 168Z"
          />
          <g
            data-part="node"
            style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
          >
            <circle
              data-part="ring"
              cx="183.668"
              cy="70"
              r="25"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle
              data-part="glyph"
              data-shape="circle"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="1"
              cx="183.668"
              cy="70"
              r="6"
            />
          </g>
        </g>
        <g data-part="column" data-col="right">
          <path
            data-part="bar"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
            d="M220.668 139L270.668 139L270.668 168L220.668 168Z"
          />
          <g
            data-part="node"
            style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
          >
            <circle
              data-part="ring"
              cx="245.668"
              cy="104"
              r="25"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              data-part="glyph"
              data-shape="diamond"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="1"
              d="M245.668 95.51471862576143L254.1532813742386 104L245.668 112.48528137423857L237.18271862576142 104Z"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}
