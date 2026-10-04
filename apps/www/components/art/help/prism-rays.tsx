import type { ArtProps } from "../props"

// Ported from help.x.com: business-and-advertising.
export function PrismRays(props: ArtProps) {
  return (
    <svg
      fill="none"
      shapeRendering="geometricPrecision"
      viewBox="0 0 320 224"
      aria-hidden="true"
      {...props}
    >
      <g data-group="spokes">
        <g data-pos="west-east">
          <line
            data-part="spoke"
            data-pos="west"
            data-state="dashed"
            stroke="currentColor"
            strokeDasharray="4 4"
            strokeWidth="0.8"
            x1="32"
            x2="161.342"
            y1="111.983"
            y2="111.983"
          />
          <line
            data-part="spoke"
            data-pos="east"
            data-state="solid"
            stroke="currentColor"
            strokeWidth="0.8"
            x1="158.631"
            x2="290.5"
            y1="111.996"
            y2="111.996"
          />
        </g>
        <g data-pos="north-west-south-east">
          <line
            data-part="spoke"
            data-pos="north-west"
            data-state="dashed"
            stroke="currentColor"
            strokeDasharray="4 4"
            strokeWidth="0.8"
            x1="68.929"
            x2="165.967"
            y1="22"
            y2="119.039"
          />
          <line
            data-part="spoke"
            data-pos="south-east"
            data-state="solid"
            stroke="currentColor"
            strokeWidth="0.8"
            x1="163.626"
            x2="254.336"
            y1="116.791"
            y2="207.5"
          />
        </g>
        <g data-pos="west-up-east-down">
          <line
            data-part="spoke"
            data-pos="west-up"
            data-state="dashed"
            stroke="currentColor"
            strokeDasharray="4 4"
            strokeWidth="0.8"
            x1="156.487"
            x2="46.5"
            y1="112.105"
            y2="82.634"
          />
          <line
            data-part="spoke"
            data-pos="east-down"
            data-state="solid"
            stroke="currentColor"
            strokeWidth="0.8"
            x1="159.884"
            x2="246"
            y1="112.061"
            y2="135.136"
          />
        </g>
        <g data-pos="south-west-north-east">
          <line
            data-part="spoke"
            data-pos="south-west"
            data-state="dashed"
            stroke="currentColor"
            strokeDasharray="4 4"
            strokeWidth="0.8"
            x1="156.494"
            x2="30"
            y1="112.061"
            y2="185.092"
          />
          <line
            data-part="spoke"
            data-pos="north-east"
            data-state="solid"
            stroke="currentColor"
            strokeWidth="0.8"
            x1="158.19"
            x2="269.224"
            y1="112.105"
            y2="48"
          />
        </g>
      </g>
      <g data-group="riders">
        <g
          data-part="rider"
          data-pos="west-east"
          opacity="0.9588737092968034"
          style={{
            transform: "translateX(19.8295px) translateY(0.0009972px)",
            transformOrigin: "50% 50%",
            transformBox: "fill-box",
          }}
        >
          <circle
            cx="32"
            cy="111.983"
            data-state="hollow"
            fill="var(--ds-background-100)"
            r="2.5"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <circle
            cx="32"
            cy="111.983"
            data-state="filled"
            fill="currentColor"
            r="2.5"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0"
          />
        </g>
        <g
          data-part="rider"
          data-pos="north-west-south-east"
          opacity="0"
          style={{
            transform: "translateX(185.407px) translateY(185.5px)",
            transformOrigin: "50% 50%",
            transformBox: "fill-box",
          }}
        >
          <circle
            cx="68.929"
            cy="22"
            data-state="hollow"
            fill="var(--ds-background-100)"
            r="2.5"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0"
          />
          <circle
            cx="68.929"
            cy="22"
            data-state="filled"
            fill="currentColor"
            r="2.5"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </g>
        <g
          data-part="rider"
          data-pos="west-up-east-down"
          opacity="0"
          style={{
            transform: "translateX(199.5px) translateY(52.502px)",
            transformOrigin: "50% 50%",
            transformBox: "fill-box",
          }}
        >
          <circle
            cx="46.5"
            cy="82.634"
            data-state="hollow"
            fill="var(--ds-background-100)"
            r="2.5"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0"
          />
          <circle
            cx="46.5"
            cy="82.634"
            data-state="filled"
            fill="currentColor"
            r="2.5"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </g>
        <g
          data-part="rider"
          data-pos="south-west-north-east"
          style={{
            transform: "translateX(102.429px) translateY(-58.6989px)",
            transformOrigin: "50% 50%",
            transformBox: "fill-box",
          }}
        >
          <circle
            cx="30"
            cy="185.092"
            data-state="hollow"
            fill="var(--ds-background-100)"
            r="2.5"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <circle
            cx="30"
            cy="185.092"
            data-state="filled"
            fill="currentColor"
            r="2.5"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0"
          />
        </g>
      </g>
      <rect
        data-part="panel"
        fill="var(--ds-background-100)"
        height="87"
        stroke="currentColor"
        strokeWidth="0.8"
        width="31"
        x="144.5"
        y="68.5"
      />
    </svg>
  )
}
