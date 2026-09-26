import type { ArtProps } from "../props"

// Ported from business.x.com — advertising/creative-best-practices.
export function MediaFrames(props: ArtProps) {
  return (
    <svg
      viewBox="0 0 362.667 214"
      fill="none"
      shapeRendering="geometricPrecision"
      aria-hidden="true"
      {...props}
    >
      <rect
        data-part="frame"
        width="362.667"
        height="214"
        fill="var(--ds-gray-100)"
      />
      <g data-part="video-card">
        <rect
          x="97"
          y="32"
          width="72"
          height="72"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          data-part="play"
          d="M127 73.86V62.0031C127 60.4401 128.712 59.4812 130.045 60.2979L139.718 66.2264C140.991 67.0067 140.991 68.8565 139.718 69.6368L130.045 75.5652C128.712 76.382 127 75.423 127 73.86Z"
          fill="var(--ds-background-100)"
          stroke="currentColor"
          strokeWidth="1"
        />
      </g>
      <g data-part="panel">
        <rect
          x="181"
          y="116"
          width="111"
          height="65"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          data-part="panel-bar"
          x="189"
          y="165"
          width="30"
          height="8"
          fill="var(--ds-background-100)"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          data-part="panel-bar"
          x="223"
          y="165"
          width="60"
          height="8"
          fill="var(--ds-background-100)"
          stroke="currentColor"
          strokeWidth="1"
        />
      </g>
      <g>
        <rect
          data-part="canvas-placeholder"
          x="181"
          y="52"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.6"
          strokeWidth="1"
          strokeDasharray="4 4"
          width="64px"
          height="52px"
        />
        <g data-group="row">
          <rect
            data-part="slot"
            data-slot="0"
            y="116"
            height="46"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            width="53px"
            strokeDasharray="400 0"
            strokeOpacity="1"
            style={{
              transform: "translateX(70px)",
              transformOrigin: "50% 50%",
              transformBox: "fill-box",
            }}
          />
          <rect
            data-part="slot"
            data-slot="1"
            y="116"
            height="46"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            width="17px"
            strokeDasharray="4 4"
            strokeOpacity="0.6"
            style={{
              transform: "translateX(129px)",
              transformOrigin: "50% 50%",
              transformBox: "fill-box",
            }}
          />
          <rect
            data-part="slot"
            data-slot="2"
            y="116"
            height="46"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            width="17px"
            strokeDasharray="4 4"
            strokeOpacity="0.6"
            style={{
              transform: "translateX(152px)",
              transformOrigin: "50% 50%",
              transformBox: "fill-box",
            }}
          />
        </g>
      </g>
    </svg>
  )
}
