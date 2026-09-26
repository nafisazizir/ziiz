import type { ArtProps } from "../props"

// Ported from business.x.com: advertising (ad credit).
export function CreditEllipse(props: ArtProps) {
  return (
    <svg
      viewBox="345 -35 430 530"
      fill="none"
      shapeRendering="geometricPrecision"
      aria-hidden="true"
      {...props}
    >
      <g style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
          <circle
            cx="560"
            cy="242"
            r="200"
            fill="var(--ds-background-100)"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="15.707963267948966 15.707963267948966"
          />
        </g>
      </g>
      <g style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
          <path
            d="M208.319 28.251C315.978 -17.448 392.242 34.878 378.714 145.05C365.187 255.223 266.981 381.607 159.321 427.306C51.66 473.005 -24.603 420.679 -11.076 310.507C2.451 200.335 100.658 73.95 208.319 28.251Z"
            transform="translate(376 2)"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </g>
      <g
        style={{
          transformBox: "fill-box",
          transformOrigin: "50% 50%",
          transform: "rotate(-24.1503deg)",
        }}
      >
        <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
          <circle
            cx="718.24"
            cy="119.68"
            r="6"
            fill="var(--ds-background-100)"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx="401.76"
            cy="364.32"
            r="6"
            fill="var(--ds-background-100)"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </g>
    </svg>
  )
}
