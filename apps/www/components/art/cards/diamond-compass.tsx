import type { ArtProps } from "../props"

// Ported from business.x.com: products/x-spaces · Connect in real time.
export function DiamondCompass(props: ArtProps) {
  return (
    <svg
      fill="none"
      shapeRendering="geometricPrecision"
      viewBox="0 0 264 280"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M132.4 73.4L199.4 140.4L132.4 207.4L65.4 140.4Z"
        data-part="diamond"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle
        cx="132.4"
        cy="140.4"
        data-part="disc"
        fill="var(--ds-background-100)"
        r="47.2"
        stroke="currentColor"
        strokeWidth="1"
      />
      <g>
        <g data-group="spokes">
          <line
            data-part="spoke"
            data-pos="north"
            stroke="currentColor"
            strokeDasharray="4 4"
            strokeWidth="1"
            x1="132.4"
            x2="132.4"
            y1="140.4"
            y2="73.4"
          />
          <line
            data-part="spoke"
            data-pos="east"
            stroke="currentColor"
            strokeDasharray="4 4"
            strokeWidth="1"
            x1="132.4"
            x2="199.4"
            y1="140.4"
            y2="140.4"
          />
          <line
            data-part="spoke"
            data-pos="south"
            stroke="currentColor"
            strokeDasharray="4 4"
            strokeWidth="1"
            x1="132.4"
            x2="132.4"
            y1="140.4"
            y2="207.4"
          />
          <line
            data-part="spoke"
            data-pos="west"
            stroke="currentColor"
            strokeDasharray="4 4"
            strokeWidth="1"
            x1="132.4"
            x2="65.4"
            y1="140.4"
            y2="140.4"
          />
        </g>
        <g data-group="beams">
          <line
            data-part="beam"
            data-pos="north-east"
            stroke="currentColor"
            strokeWidth="1"
            x1="132.4"
            x2="197.625"
            y1="140.4"
            y2="75.175"
          />
          <line
            data-part="beam"
            data-pos="south-east"
            stroke="currentColor"
            strokeWidth="1"
            x1="132.4"
            x2="197.625"
            y1="140.4"
            y2="205.625"
          />
          <line
            data-part="beam"
            data-pos="south-west"
            stroke="currentColor"
            strokeWidth="1"
            x1="132.4"
            x2="67.175"
            y1="140.4"
            y2="205.625"
          />
          <line
            data-part="beam"
            data-pos="north-west"
            stroke="currentColor"
            strokeWidth="1"
            x1="132.4"
            x2="67.175"
            y1="140.4"
            y2="75.175"
          />
        </g>
        <g data-group="hub">
          <g
            data-part="hub"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <circle
              cx="132.4"
              cy="140.4"
              data-state="hollow"
              fill="var(--ds-background-100)"
              r="4"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle
              cx="132.4"
              cy="140.4"
              data-state="charged"
              fill="currentColor"
              r="4"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0"
            />
          </g>
        </g>
        <g data-group="marks">
          <path
            d="M200.1 69.2L203.6 72.7L200.1 76.2L196.6 72.7Z"
            data-part="mark"
            data-pos="north-east"
            fill="currentColor"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <path
            d="M200.1 204.6L203.6 208.1L200.1 211.6L196.6 208.1Z"
            data-part="mark"
            data-pos="south-east"
            fill="currentColor"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <path
            d="M64.7 204.6L68.2 208.1L64.7 211.6L61.2 208.1Z"
            data-part="mark"
            data-pos="south-west"
            fill="currentColor"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <path
            d="M64.7 69.2L68.2 72.7L64.7 76.2L61.2 72.7Z"
            data-part="mark"
            data-pos="north-west"
            fill="currentColor"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
        </g>
      </g>
    </svg>
  )
}
