import type { ArtProps } from "../props"

// Ported from business.x.com — products/x-spaces · Edit and customize recordings.
export function RecordingPanels(props: ArtProps) {
  return (
    <svg
      viewBox="0 0 358 222"
      fill="none"
      shapeRendering="geometricPrecision"
      aria-hidden="true"
      {...props}
    >
      <g data-part="mic-tile">
        <rect
          x="105"
          y="50"
          width="72"
          height="72"
          fill="var(--ds-background-100)"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          data-part="mic"
          d="M140.8346 94.033V91.5736M140.8346 91.5736C135.9167 91.5736 134.2773 86.6556 134.2773 86.6556M140.8346 91.5736C145.753 91.5736 147.392 86.6556 147.392 86.6556M144.113 81.7376V85.0163C144.113 86.827 142.6454 88.2949 140.8346 88.2949C139.0239 88.2949 137.556 86.827 137.556 85.0163V81.7376C137.556 79.9269 139.0239 78.459 140.8346 78.459C142.6454 78.459 144.113 79.9269 144.113 81.7376Z"
          stroke="currentColor"
          strokeWidth="1"
        />
      </g>
      <rect
        data-part="card"
        x="189"
        y="134"
        width="82"
        height="37.4857"
        fill="var(--ds-background-100)"
        stroke="currentColor"
        strokeWidth="1"
      />
      <g>
        <rect
          data-part="preview"
          x="189"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
          width="52px"
          height="42px"
          style={{
            transform: "translateY(80px)",
            transformOrigin: "50% 50%",
            transformBox: "fill-box",
          }}
        />
        <g style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}>
          <g data-part="thumb" transform="translate(238 139)">
            <rect
              x="0.5"
              y="0.5"
              width="27"
              height="27"
              rx="13.5"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="1"
            />
            <g
              data-part="thumb-glyph"
              transform="translate(6 6)"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <rect
                x="2.3333"
                y="2.3333"
                width="11.3333"
                height="11.3333"
                rx="2.6667"
              />
              <path d="M2.6667 5.6667H13.3333" />
              <path d="M5.1667 6L6.8333 2.6667" />
              <path d="M8.8333 6L10.5 2.6667" />
            </g>
          </g>
        </g>
        <g data-group="row">
          <rect
            data-part="slot"
            data-slot="0"
            y="134"
            height="37"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            width="43px"
            strokeDasharray="400 0"
            style={{
              transform: "translateX(88px)",
              transformOrigin: "50% 50%",
              transformBox: "fill-box",
            }}
          />
          <rect
            data-part="slot"
            data-slot="1"
            y="134"
            height="37"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            width="17px"
            strokeDasharray="4 4"
            style={{
              transform: "translateX(137px)",
              transformOrigin: "50% 50%",
              transformBox: "fill-box",
            }}
          />
          <rect
            data-part="slot"
            data-slot="2"
            y="134"
            height="37"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            width="17px"
            strokeDasharray="4 4"
            style={{
              transform: "translateX(160px)",
              transformOrigin: "50% 50%",
              transformBox: "fill-box",
            }}
          />
        </g>
      </g>
    </svg>
  )
}
