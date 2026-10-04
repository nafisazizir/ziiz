import * as React from "react"

import type { ArtProps } from "../props"

// Ported from help.x.com: home · the shelf of categories.
export function Shelf({
  variant = "wide",
  ...props
}: ArtProps & { variant?: "wide" | "narrow" }) {
  const id = React.useId()
  if (variant === "wide")
    return (
      <svg
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="geometricPrecision"
        viewBox="0 0 982 450"
        aria-hidden="true"
        {...props}
      >
        <defs>
          <clipPath id={`${id}-shelf-0`}>
            <path d="M20.458 20.458L961.541 20.458L961.541 226.405L20.458 226.405Z" />
          </clipPath>
          <clipPath id={`${id}-shelf-1`}>
            <path d="M20.458 226.405L961.541 226.405L961.541 450L20.458 450Z" />
          </clipPath>
        </defs>
        <g data-group="shell">
          <rect
            fill="var(--ds-background-100)"
            height="450"
            width="982"
            x="0"
            y="0"
          />
          <path
            d="M20.458 13.639L152.21 72.013L152.21 366.613L20.458 436.444Z"
            fill="var(--ds-gray-100)"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M961.541 13.639L829.79 72.013L829.79 366.613L961.541 436.444Z"
            fill="var(--ds-gray-100)"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M20.458 20.459L961.541 20.459L829.79 72.013L152.21 72.013Z"
            fill="var(--ds-gray-100)"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M152.21 72.013L829.79 72.013L829.79 366.613L152.21 366.613Z"
            fill="var(--ds-background-100)"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M20.458 429.625L961.541 429.625L829.79 366.613L152.21 366.613Z"
            fill="var(--ds-background-100)"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <line
            stroke="currentColor"
            x1="20.458"
            x2="152.21"
            y1="20.459"
            y2="72.013"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <line
            stroke="currentColor"
            x1="961.5409999999999"
            x2="829.7900000000001"
            y1="20.459"
            y2="72.013"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <line
            stroke="currentColor"
            x1="20.458"
            x2="152.21"
            y1="429.625"
            y2="366.61300000000006"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <line
            stroke="currentColor"
            x1="961.5409999999999"
            x2="829.7900000000001"
            y1="429.625"
            y2="366.61300000000006"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M20.458 219.586L961.541 219.586L829.79 215.39L152.21 215.39Z"
            fill="var(--ds-background-100)"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </g>
        <g clipPath={`url(#${id}-shelf-0)`}>
          <g>
            <g>
              <path
                d="M413 53L413 219.5L428.99 216.446L428.99 84.078Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M428.99 84.078L428.99 216.446"
                fill="none"
                stroke="currentColor"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M428.99 84.078L413 53M428.99 216.446L413 219.5"
                fill="none"
                stroke="currentColor"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <path
              d="M356 53L413 53L413 219.5L356 219.5Z"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
          <g>
            <g>
              <path
                d="M877 94L877 219.5L822.96 217.414L822.96 109.484Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M822.96 109.484L822.96 217.414"
                fill="none"
                stroke="currentColor"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M822.96 109.484L877 94M822.96 217.414L877 219.5"
                fill="none"
                stroke="currentColor"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <path
              d="M877 94L927 94L927 219.5L877 219.5Z"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
          <g
            data-group="monolith"
            style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
          >
            <g
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 100% 0",
              }}
            >
              <path
                d="M843.43 223.21L816.67 184.11L841.61 155L832.93 155L812.81 178.49L796.76 155L774.89 155L800.66 192.7L774.5 223.21L783.18 223.21L804.52 198.31L821.55 223.21ZM793.9 160.49L833.04 217.73L824.39 217.73L785.25 160.49Z"
                fill="none"
                stroke="currentColor"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M846.11 155L837.43 155L832.93 155L841.61 155Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M826.05 223.21L847.93 223.21L843.43 223.21L821.55 223.21Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M847.93 223.21L821.17 184.11L816.67 184.11L843.43 223.21Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M821.17 184.11L846.11 155L841.61 155L816.67 184.11Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M837.54 217.73L828.89 217.73L824.39 217.73L833.04 217.73Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M837.43 155L817.31 178.49L812.81 178.49L832.93 155Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M798.4 160.49L837.54 217.73L833.04 217.73L793.9 160.49Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M809.02 198.31L826.05 223.21L821.55 223.21L804.52 198.31Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M828.89 217.73L789.75 160.49L785.25 160.49L824.39 217.73Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M817.31 178.49L801.26 155L796.76 155L812.81 178.49Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M787.68 223.21L809.02 198.31L804.52 198.31L783.18 223.21Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M789.75 160.49L798.4 160.49L793.9 160.49L785.25 160.49Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M779.39 155L805.16 192.7L800.66 192.7L774.89 155Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M805.16 192.7L779 223.21L774.5 223.21L800.66 192.7Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M801.26 155L779.39 155L774.89 155L796.76 155Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M779 223.21L787.68 223.21L783.18 223.21L774.5 223.21Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M847.93 223.21L821.17 184.11L846.11 155L837.43 155L817.31 178.49L801.26 155L779.39 155L805.16 192.7L779 223.21L787.68 223.21L809.02 198.31L826.05 223.21ZM798.4 160.49L837.54 217.73L828.89 217.73L789.75 160.49Z"
                fill="var(--ds-gray-100)"
                fillRule="evenodd"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </g>
        </g>
        <g clipPath={`url(#${id}-shelf-1)`}>
          <g>
            <g>
              <path
                d="M35 299.374L92.283 299.374L156.078 284.21L107.96 284.21Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M107.96 284.21L156.078 284.21"
                fill="none"
                stroke="currentColor"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M107.96 284.21L35 299.374"
                fill="none"
                stroke="currentColor"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <g>
              <path
                d="M92.283 299.374L92.283 429.625L156.078 393.621L156.078 284.21Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M156.078 284.21L156.078 393.621"
                fill="none"
                stroke="currentColor"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M156.078 284.21L92.283 299.374M156.078 393.621L92.283 429.625"
                fill="none"
                stroke="currentColor"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <path
              d="M35 299.374L92.283 299.374L92.283 429.625L35 429.625Z"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
          <g>
            <g>
              <path
                d="M625 272L674 272L648.014 262.429L605.972 262.429Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M605.972 262.429L648.014 262.429"
                fill="none"
                stroke="currentColor"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M648.014 262.429L674 272"
                fill="none"
                stroke="currentColor"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <g>
              <path
                d="M625 272L625 430L605.972 397.993L605.972 262.429Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M605.972 262.429L605.972 397.993"
                fill="none"
                stroke="currentColor"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M605.972 262.429L625 272M605.972 397.993L625 430"
                fill="none"
                stroke="currentColor"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <path
              d="M625 272L674 272L674 430L625 430Z"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </g>
        <g data-group="shelves">
          <rect
            fill="var(--ds-background-100)"
            height="6.819"
            stroke="currentColor"
            width="941.083"
            x="20.458"
            y="13.639"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <rect
            fill="var(--ds-background-100)"
            height="6.819"
            stroke="currentColor"
            width="941.083"
            x="20.458"
            y="219.586"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <rect
            fill="var(--ds-background-100)"
            height="6.819"
            stroke="currentColor"
            width="941.083"
            x="20.458"
            y="429.625"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </g>
        <g data-group="frame">
          <rect
            fill="var(--ds-background-100)"
            height="422.805"
            stroke="currentColor"
            width="6.819"
            x="13.639"
            y="13.639"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <rect
            fill="var(--ds-background-100)"
            height="422.805"
            stroke="currentColor"
            width="6.819"
            x="961.5409999999999"
            y="13.639"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </g>
        <g>
          <g
            data-part="faces-rules"
            style={{
              stroke: "currentColor",
              transition: "stroke 0.3s cubic-bezier(0.45,0,0.55,1)",
            }}
          >
            <g>
              <path
                d="M293 146L293 219L309.038 217.834L309.038 150.747Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M309.038 150.747L309.038 217.834"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M309.038 150.747L293 146M309.038 217.834L293 219"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </g>
          <g
            data-part="faces-account"
            style={{
              stroke: "currentColor",
              transition: "stroke 0.3s cubic-bezier(0.45,0,0.55,1)",
            }}
          >
            <g>
              <path
                d="M525 107L525 172L519.016 177.738L519.016 124.178Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M519.016 124.178L519.016 177.738"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M519.016 124.178L525 107M519.016 177.738L525 172"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M502 172L502 219.5L497.996 214.076L497.996 183.866Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M497.996 183.866L497.996 214.076"
                fill="none"
                stroke="currentColor"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M497.996 183.866L502 172M497.996 214.076L502 219.5"
                fill="none"
                stroke="currentColor"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <path
              d="M502 172L750 172L750 219.5L502 219.5Z"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
          <g
            data-part="topic-rules"
            style={{
              stroke: "currentColor",
              transition: "stroke 0.3s cubic-bezier(0.45,0,0.55,1)",
            }}
          >
            <clipPath id={`${id}-belly`}>
              <path d="M70 0L293 0L293 219L70 219Z" />
            </clipPath>
            <g clipPath={`url(#${id}-belly)`}>
              <g data-advance="" transform="translate(0 0) scale(1)">
                <g data-part="document">
                  <mask id={`${id}-ink`}>
                    <path
                      d="M0.7 19.9C2.2 16.9 4.2 12.6 5.4 10.2C4 8.6 3.2 7 3.4 4.8C3.6 2.2 4.4 0.6 5.6 0.5C6.8 0.4 7.3 1.9 7.1 3.8C6.9 6 6 8.2 5.6 10C6.5 11 7.6 10.2 8.5 9.2C9.5 8.2 10.2 9.7 10.9 10.6C11.6 11.4 12.4 9.5 13.1 8.6C13.9 7.7 14.5 9.9 15.1 10.6C15.8 11.3 16.4 9.2 17.2 8.9C18.2 8.6 18.7 10.7 19.7 11.1C20.4 11.3 21.3 11.4 21.9 11.5"
                      fill="none"
                      stroke="var(--ds-background-100)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="5.5"
                      pathLength={1}
                      strokeDashoffset="0"
                      strokeDasharray="0 1"
                    />
                  </mask>
                  <g
                    style={{
                      transformOrigin: "50% 50%",
                      transformBox: "fill-box",
                    }}
                  >
                    <rect
                      fill="var(--ds-background-100)"
                      height="80"
                      stroke="currentColor"
                      width="134.005"
                      x="121"
                      y="140"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    <g transform="translate(121 140)">
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="7"
                        width="31"
                        x="15"
                        y="14"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="3"
                        width="55"
                        x="15"
                        y="24"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="3"
                        width="55"
                        x="15"
                        y="30"
                        stroke="none"
                      />
                      <g transform="translate(86 22)">
                        <path
                          d="M6.707 0.707L4.061 3.354L6.707 6L6 6.707L3.354 4.061L0.707 6.707L0 6L2.646 3.354L0 0.707L0.707 0L3.354 2.646L6 0L6.707 0.707Z"
                          fill="currentColor"
                          stroke="none"
                        />
                      </g>
                      <line
                        stroke="currentColor"
                        x1="80"
                        x2="121"
                        y1="33"
                        y2="33"
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                      />
                      <g transform="translate(95 16.07)">
                        <g
                          style={{
                            transformBox: "fill-box",
                            transformOrigin: "50% 50% 0",
                          }}
                        >
                          <path
                            d="M5.903 0.01C6.483-0.041 7.064 0.1 7.557 0.41C9.925 1.932 7.752 7.322 6.956 9.285C6.78 9.718 6.463 10.557 6.225 10.927C7.62 10.525 8.804 9.215 9.773 8.142C10.157 7.718 10.881 6.447 11.659 7.463C11.793 7.637 11.878 8.182 11.953 8.429C12.094 8.904 12.276 9.367 12.499 9.809C12.774 10.348 13.093 10.825 13.686 11.017C14.446 10.865 15.038 10.13 15.471 9.532C15.852 9.003 16.232 8.289 17.001 8.801C17.398 9.066 17.234 9.654 17.539 9.96C18.478 10.902 19.977 10.946 21.227 11.013C21.713 11.039 22.052 11.411 21.993 11.898C21.78 12.971 20.222 12.458 19.499 12.427C18.426 12.335 17.019 11.79 16.372 10.94C15.603 11.947 14.185 12.96 12.891 12.391C11.646 11.845 11.168 10.632 10.657 9.491C9.298 10.991 7.618 12.591 5.465 12.589C5.314 12.959 4.875 13.827 4.675 14.158C4.114 15.198 2.763 17.782 2.177 18.808C1.93 19.239 1.687 19.694 1.407 20.102C1.192 20.413 0.795 20.521 0.454 20.358C0.175 20.249-0.106 19.732 0.04 19.447C0.682 18.196 2.327 15.428 2.951 14.168C3.168 13.656 3.478 13.145 3.713 12.637C3.815 12.416 3.928 12.168 4.045 11.956C2.997 10.938 2.609 9.649 2.429 8.237C2.116 5.793 2.786 0.329 5.903 0.01ZM6.049 1.554C5.594 1.644 5.284 1.954 5.039 2.329C4.525 3.112 4.293 3.977 4.124 4.885C3.916 6.001 3.83 7.111 4.019 8.238C4.127 8.889 4.255 9.558 4.586 10.136C4.628 10.21 4.677 10.336 4.749 10.376C4.809 10.349 4.822 10.307 4.856 10.249C5.316 9.119 8.797 1.439 6.049 1.554Z"
                            fill="currentColor"
                            mask={`url(#${id}-ink)`}
                            stroke="none"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
            <g data-advance="" transform="translate(0 0) scale(1)">
              <path
                d="M70 146L150.528 146L150.528 153L212.472 153L212.472 146L293 146L293 219L70 219Z"
                fill="var(--ds-gray-100)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <text
                fill="currentColor"
                stroke="none"
                fontSize="15"
                textAnchor="middle"
                data-part="label"
              >
                <tspan x="181.5" y="190.95">
                  <tspan fontWeight="400">{"Rules and Policies"}</tspan>
                </tspan>
              </text>
            </g>
          </g>
          <g
            data-part="topic-account"
            style={{
              stroke: "currentColor",
              transition: "stroke 0.3s cubic-bezier(0.45,0,0.55,1)",
            }}
          >
            <clipPath id={`${id}-belly-2`}>
              <path d="M525 0L733 0L733 172L525 172Z" />
            </clipPath>
            <g clipPath={`url(#${id}-belly-2)`}>
              <g data-advance="" transform="translate(0 0) scale(1)">
                <g data-part="id-cards" transform="translate(-9.064 0)">
                  <g
                    style={{
                      transform: "translateX(-12px) translateY(29px)",
                      transformOrigin: "50% 50%",
                      transformBox: "fill-box",
                    }}
                  >
                    <g transform="translate(569 74)">
                      <g>
                        <path
                          d="M0.417 0.417V64.62H84.711V10.502L72.88 0.417H0.417Z"
                          fill="var(--ds-background-100)"
                          stroke="currentColor"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <circle
                          cx="12.519"
                          cy="12.519"
                          fill="var(--ds-gray-alpha-300)"
                          r="4.59"
                          stroke="none"
                        />
                        <rect
                          fill="var(--ds-gray-alpha-300)"
                          height="4.173"
                          width="23.368"
                          x="21.282"
                          y="10.433"
                          stroke="none"
                        />
                        <rect
                          fill="var(--ds-gray-alpha-300)"
                          height="4.173"
                          width="23.368"
                          x="47.989"
                          y="10.433"
                          stroke="none"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    style={{
                      transform: "translateX(-12px) translateY(29px)",
                      transformOrigin: "50% 50%",
                      transformBox: "fill-box",
                    }}
                  >
                    <g transform="translate(592 70)">
                      <g>
                        <path
                          d="M0.417 0.417V64.62H84.711V10.502L72.88 0.417H0.417Z"
                          fill="var(--ds-background-100)"
                          stroke="currentColor"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <circle
                          cx="12.519"
                          cy="12.519"
                          fill="var(--ds-gray-alpha-300)"
                          r="4.59"
                          stroke="none"
                        />
                        <rect
                          fill="var(--ds-gray-alpha-300)"
                          height="4.173"
                          width="23.368"
                          x="21.282"
                          y="10.433"
                          stroke="none"
                        />
                        <rect
                          fill="var(--ds-gray-alpha-300)"
                          height="4.173"
                          width="23.368"
                          x="47.989"
                          y="10.433"
                          stroke="none"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    style={{
                      transform: "translateX(-12px) translateY(29px)",
                      transformOrigin: "50% 50%",
                      transformBox: "fill-box",
                    }}
                  >
                    <g transform="translate(622 68)">
                      <g>
                        <path
                          d="M0.417 0.417V64.62H84.711V10.502L72.88 0.417H0.417Z"
                          fill="var(--ds-background-100)"
                          stroke="currentColor"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <circle
                          cx="12.519"
                          cy="12.519"
                          fill="var(--ds-gray-alpha-300)"
                          r="4.59"
                          stroke="none"
                        />
                        <rect
                          fill="var(--ds-gray-alpha-300)"
                          height="4.173"
                          width="23.368"
                          x="21.282"
                          y="10.433"
                          stroke="none"
                        />
                        <rect
                          fill="var(--ds-gray-alpha-300)"
                          height="4.173"
                          width="23.368"
                          x="47.989"
                          y="10.433"
                          stroke="none"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
            <g data-advance="" transform="translate(0 0) scale(1)">
              <path
                d="M525 107L600 107L600 114L650 114L650 107L733 107L733 172L525 172Z"
                fill="var(--ds-gray-100)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <text
                fill="currentColor"
                stroke="none"
                fontSize="15"
                textAnchor="middle"
                data-part="label"
              >
                <tspan x="629" y="147.95">
                  <tspan fontWeight="400">{"Managing your Account"}</tspan>
                </tspan>
              </text>
            </g>
          </g>
        </g>
        <g>
          <g
            data-part="faces-safety"
            style={{
              stroke: "currentColor",
              transition: "stroke 0.3s cubic-bezier(0.45,0,0.55,1)",
            }}
          >
            <g>
              <path
                d="M368 312L566 312L557 299.112L382.76 299.112Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M382.76 299.112L557 299.112"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M382.76 299.112L368 312M557 299.112L566 312"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </g>
          <g
            data-part="faces-business"
            style={{
              stroke: "currentColor",
              transition: "stroke 0.3s cubic-bezier(0.45,0,0.55,1)",
            }}
          >
            <g>
              <path
                d="M716.5 345L939.5 345L887.923 328.854L690.568 328.854Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M690.568 328.854L887.923 328.854"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M887.923 328.854L939.5 345"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <g>
              <path
                d="M716.5 345L716.5 429.5L690.568 403.637L690.568 328.854Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M690.568 328.854L690.568 403.637"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M690.568 328.854L716.5 345M690.568 403.637L716.5 429.5"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </g>
          <g
            data-part="faces-usingX"
            style={{
              stroke: "currentColor",
              transition: "stroke 0.3s cubic-bezier(0.45,0,0.55,1)",
            }}
          >
            <g>
              <path
                d="M119 370L292 370L317.87 348.498L167.36 348.498Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M167.36 348.498L317.87 348.498"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M167.36 348.498L119 370"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <g>
              <path
                d="M292 370L292 429.756L317.87 400.486L317.87 348.498Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M317.87 348.498L317.87 400.486"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M317.87 348.498L292 370M317.87 400.486L292 429.756"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M356 382L578 382L572.084 369.937L365.18 369.937Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M365.18 369.937L572.084 369.937"
                fill="none"
                stroke="currentColor"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M365.18 369.937L356 382M572.084 369.937L578 382"
                fill="none"
                stroke="currentColor"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <path
              d="M356 382L578 382L578 429.5L356 429.5Z"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
          <g
            data-part="topic-safety"
            style={{
              stroke: "currentColor",
              transition: "stroke 0.3s cubic-bezier(0.45,0,0.55,1)",
            }}
          >
            <clipPath id={`${id}-belly-3`}>
              <path d="M368 0L566 0L566 382L368 382Z" />
            </clipPath>
            <g clipPath={`url(#${id}-belly-3)`}>
              <g data-advance="" transform="translate(0 0) scale(1)">
                <g data-part="lock-cards">
                  <g
                    style={{
                      transform: "translateX(6px) translateY(34px)",
                      transformOrigin: "50% 50%",
                      transformBox: "fill-box",
                    }}
                  >
                    <rect
                      fill="var(--ds-background-100)"
                      height="75"
                      stroke="currentColor"
                      width="107"
                      x="407"
                      y="263"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    <g transform="translate(407 263)">
                      <g transform="translate(8 9)">
                        <g
                          style={{
                            transformOrigin: "50% 50%",
                            transformBox: "fill-box",
                          }}
                        >
                          <path
                            d="M15.5 9H8.5C7.1 9 6.4 9 5.865 9.272C5.395 9.512 5.012 9.895 4.772 10.365C4.5 10.9 4.5 11.6 4.5 13V16.5C4.5 17.9 4.5 18.6 4.772 19.135C5.012 19.605 5.395 19.988 5.865 20.228C6.4 20.5 7.1 20.5 8.5 20.5H15.5C16.9 20.5 17.6 20.5 18.135 20.228C18.605 19.988 18.988 19.605 19.228 19.135C19.5 18.6 19.5 17.9 19.5 16.5V13C19.5 11.6 19.5 10.9 19.228 10.365C18.988 9.895 18.605 9.512 18.135 9.272C17.6 9 16.9 9 15.5 9Z"
                            fill="var(--ds-background-100)"
                            stroke="currentColor"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <path
                            d="M8 9V6.5C8 4.291 9.791 2.5 12 2.5C14.209 2.5 16 4.291 16 6.5V9"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                        </g>
                      </g>
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="7"
                        width="17"
                        x="39"
                        y="9"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="7"
                        width="21"
                        x="58"
                        y="9"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="4"
                        width="59"
                        x="39"
                        y="19"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="4"
                        width="59"
                        x="39"
                        y="26"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="4"
                        width="50"
                        x="39"
                        y="33"
                        stroke="none"
                      />
                    </g>
                  </g>
                  <g
                    style={{
                      transform: "translateX(6px) translateY(34px)",
                      transformOrigin: "50% 50%",
                      transformBox: "fill-box",
                    }}
                  >
                    <rect
                      fill="var(--ds-background-100)"
                      height="72"
                      stroke="currentColor"
                      width="107"
                      x="413"
                      y="266"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    <g transform="translate(413 266)">
                      <g transform="translate(8 9)">
                        <g
                          style={{
                            transformOrigin: "50% 50%",
                            transformBox: "fill-box",
                          }}
                        >
                          <path
                            d="M15.5 9H8.5C7.1 9 6.4 9 5.865 9.272C5.395 9.512 5.012 9.895 4.772 10.365C4.5 10.9 4.5 11.6 4.5 13V16.5C4.5 17.9 4.5 18.6 4.772 19.135C5.012 19.605 5.395 19.988 5.865 20.228C6.4 20.5 7.1 20.5 8.5 20.5H15.5C16.9 20.5 17.6 20.5 18.135 20.228C18.605 19.988 18.988 19.605 19.228 19.135C19.5 18.6 19.5 17.9 19.5 16.5V13C19.5 11.6 19.5 10.9 19.228 10.365C18.988 9.895 18.605 9.512 18.135 9.272C17.6 9 16.9 9 15.5 9Z"
                            fill="var(--ds-background-100)"
                            stroke="currentColor"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <path
                            d="M8 9V6.5C8 4.291 9.791 2.5 12 2.5C14.209 2.5 16 4.291 16 6.5V9"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                        </g>
                      </g>
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="7"
                        width="17"
                        x="39"
                        y="9"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="7"
                        width="21"
                        x="58"
                        y="9"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="4"
                        width="59"
                        x="39"
                        y="19"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="4"
                        width="59"
                        x="39"
                        y="26"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="4"
                        width="50"
                        x="39"
                        y="33"
                        stroke="none"
                      />
                    </g>
                  </g>
                  <g
                    style={{
                      transform: "translateX(6px) translateY(34px)",
                      transformOrigin: "50% 50%",
                      transformBox: "fill-box",
                    }}
                  >
                    <rect
                      fill="var(--ds-background-100)"
                      height="69"
                      stroke="currentColor"
                      width="122"
                      x="403"
                      y="269"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    <g transform="translate(403 269)">
                      <g transform="translate(8 9)">
                        <g
                          style={{
                            transformOrigin: "50% 50%",
                            transformBox: "fill-box",
                          }}
                        >
                          <path
                            d="M15.5 9H8.5C7.1 9 6.4 9 5.865 9.272C5.395 9.512 5.012 9.895 4.772 10.365C4.5 10.9 4.5 11.6 4.5 13V16.5C4.5 17.9 4.5 18.6 4.772 19.135C5.012 19.605 5.395 19.988 5.865 20.228C6.4 20.5 7.1 20.5 8.5 20.5H15.5C16.9 20.5 17.6 20.5 18.135 20.228C18.605 19.988 18.988 19.605 19.228 19.135C19.5 18.6 19.5 17.9 19.5 16.5V13C19.5 11.6 19.5 10.9 19.228 10.365C18.988 9.895 18.605 9.512 18.135 9.272C17.6 9 16.9 9 15.5 9Z"
                            fill="var(--ds-background-100)"
                            stroke="currentColor"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <path
                            d="M8 9V6.5C8 4.291 9.791 2.5 12 2.5C14.209 2.5 16 4.291 16 6.5V9"
                            fill="none"
                            stroke="currentColor"
                            style={{
                              transformBox: "fill-box",
                              transform: "rotate(-38deg)",
                              transformOrigin: "0% 100% 0px",
                            }}
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                        </g>
                      </g>
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="7"
                        width="17"
                        x="39"
                        y="9"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="7"
                        width="21"
                        x="58"
                        y="9"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="4"
                        width="59"
                        x="39"
                        y="19"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="4"
                        width="59"
                        x="39"
                        y="26"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="4"
                        width="50"
                        x="39"
                        y="33"
                        stroke="none"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
            <g data-advance="" transform="translate(0 0) scale(1)">
              <path
                d="M368 312L566 312L566 382L368 382Z"
                fill="var(--ds-gray-100)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <text
                fill="currentColor"
                stroke="none"
                fontSize="15"
                textAnchor="middle"
                data-part="label"
              >
                <tspan x="467" y="351.95">
                  <tspan fontWeight="400">{"Safety and Security"}</tspan>
                </tspan>
              </text>
            </g>
          </g>
          <g
            data-part="topic-business"
            style={{
              stroke: "currentColor",
              transition: "stroke 0.3s cubic-bezier(0.45,0,0.55,1)",
            }}
          >
            <clipPath id={`${id}-belly-4`}>
              <path d="M716.5 0L939.5 0L939.5 429.5L716.5 429.5Z" />
            </clipPath>
            <g clipPath={`url(#${id}-belly-4)`}>
              <g data-advance="" transform="translate(0 0) scale(1)">
                <g data-part="reports">
                  <g
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "50% 50% 0",
                    }}
                  >
                    <path
                      d="M851 400.609L743 400.609L743 398.107A2.324 2.324 0 0 0 743 393.459L743 386.485A2.324 2.324 0 0 0 743 381.837L743 374.864A2.324 2.324 0 0 0 743 370.216L743 363.242A2.324 2.324 0 0 0 743 358.594L743 351.621A2.324 2.324 0 0 0 743 346.973L743 339.999A2.324 2.324 0 0 0 743 335.351L743 328.378A2.324 2.324 0 0 0 743 323.73L743 316.756A2.324 2.324 0 0 0 743 312.108L743 297L851 297Z"
                      fill="var(--ds-background-100)"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    <g transform="translate(743 297)">
                      <g>
                        <clipPath id={`${id}-disc`}>
                          <circle cx="54" cy="43" r="30" />
                        </clipPath>
                        <g clipPath={`url(#${id}-disc)`}>
                          <line
                            stroke="currentColor"
                            x1="95.727"
                            x2="-2.627"
                            y1="83.98"
                            y2="57.626"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            stroke="currentColor"
                            x1="97.191"
                            x2="-1.163"
                            y1="78.516"
                            y2="52.162"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            stroke="currentColor"
                            x1="98.655"
                            x2="0.301"
                            y1="73.052"
                            y2="46.698"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            stroke="currentColor"
                            x1="100.119"
                            x2="1.766"
                            y1="67.587"
                            y2="41.234"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            stroke="currentColor"
                            x1="101.583"
                            x2="3.23"
                            y1="62.124"
                            y2="35.77"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            stroke="currentColor"
                            x1="80.265"
                            x2="3.521"
                            y1="81.363"
                            y2="14.443"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            stroke="currentColor"
                            x1="83.984"
                            x2="7.239"
                            y1="77.099"
                            y2="10.178"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            stroke="currentColor"
                            x1="87.701"
                            x2="10.957"
                            y1="72.835"
                            y2="5.915"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            stroke="currentColor"
                            x1="91.419"
                            x2="14.674"
                            y1="68.571"
                            y2="1.651"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            stroke="currentColor"
                            x1="95.136"
                            x2="18.392"
                            y1="64.308"
                            y2="-2.612"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            stroke="currentColor"
                            x1="110.368"
                            x2="12.014"
                            y1="29.339"
                            y2="2.986"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <path
                            d="M24.08 40.806C23.792 44.735 24.28 48.683 25.518 52.423C26.755 56.163 28.717 59.623 31.291 62.605C33.866 65.587 37.003 68.033 40.522 69.803C44.042 71.573 47.876 72.632 51.805 72.921L54 43.001L24.08 40.806Z"
                            fill="var(--ds-background-100)"
                            stroke="none"
                          />
                        </g>
                        <circle
                          cx="54"
                          cy="43"
                          fill="none"
                          r="30"
                          stroke="currentColor"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    style={{
                      transformBox: "fill-box",
                      transform: "rotate(-2.069deg)",
                      transformOrigin: "50% 50% 0px",
                    }}
                  >
                    <path
                      d="M863.93 408.448L756 408.448L756 405.946A2.324 2.324 0 0 0 756 401.298L756 394.325A2.324 2.324 0 0 0 756 389.677L756 382.703A2.324 2.324 0 0 0 756 378.055L756 371.082A2.324 2.324 0 0 0 756 366.434L756 359.46A2.324 2.324 0 0 0 756 354.812L756 347.839A2.324 2.324 0 0 0 756 343.191L756 336.217A2.324 2.324 0 0 0 756 331.569L756 324.596A2.324 2.324 0 0 0 756 319.948L756 304.898L863.93 304.898Z"
                      fill="var(--ds-background-100)"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    <g transform="translate(756 304.898)">
                      <g>
                        <rect
                          fill="var(--ds-background-100)"
                          height="51"
                          stroke="currentColor"
                          width="10.75"
                          x="17.6"
                          y="16"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <rect
                          fill="var(--ds-background-100)"
                          height="38"
                          stroke="currentColor"
                          width="10.75"
                          x="30.8"
                          y="29"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <rect
                          fill="var(--ds-background-100)"
                          height="25"
                          stroke="currentColor"
                          width="10.75"
                          x="44"
                          y="42"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <rect
                          fill="var(--ds-background-100)"
                          height="33"
                          stroke="currentColor"
                          width="10.75"
                          x="56.5"
                          y="34"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "50% 50% 0",
                    }}
                  >
                    <path
                      d="M885 413.609L777 413.609L777 411.107A2.324 2.324 0 0 0 777 406.459L777 399.485A2.324 2.324 0 0 0 777 394.837L777 387.864A2.324 2.324 0 0 0 777 383.216L777 376.242A2.324 2.324 0 0 0 777 371.594L777 364.621A2.324 2.324 0 0 0 777 359.973L777 352.999A2.324 2.324 0 0 0 777 348.351L777 341.378A2.324 2.324 0 0 0 777 336.73L777 329.756A2.324 2.324 0 0 0 777 325.108L777 310L885 310Z"
                      fill="var(--ds-background-100)"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    <g transform="translate(777 310)">
                      <g>
                        <line
                          stroke="currentColor"
                          strokeDasharray="6.57 4.93"
                          x1="24.716"
                          x2="89.716"
                          y1="16.066"
                          y2="16.066"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <line
                          stroke="currentColor"
                          strokeDasharray="6.57 4.93"
                          x1="24.716"
                          x2="89.716"
                          y1="29.066"
                          y2="29.066"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <line
                          stroke="currentColor"
                          strokeDasharray="6.57 4.93"
                          x1="24.716"
                          x2="89.716"
                          y1="42.066"
                          y2="42.066"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <line
                          stroke="currentColor"
                          strokeDasharray="6.57 4.93"
                          x1="89.698"
                          x2="89.698"
                          y1="15.967"
                          y2="50.917"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <path
                          d="M25.278 15.595V51.548H89.995"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <path
                          d="M25.06 51.605L47.716 29.066L68.716 42.066L89.777 15.651"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          opacity="0"
                          pathLength={1}
                          strokeDashoffset="0"
                          strokeDasharray="0 2"
                        />
                        <circle
                          cx="47.561"
                          cy="29.178"
                          fill="currentColor"
                          r="1.751"
                          stroke="none"
                          opacity="0"
                        />
                        <circle
                          cx="68.578"
                          cy="41.428"
                          fill="currentColor"
                          r="1.751"
                          stroke="none"
                          opacity="0"
                        />
                        <circle
                          cx="89.621"
                          cy="16.329"
                          fill="currentColor"
                          r="1.5"
                          stroke="none"
                          opacity="0"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
            <g data-advance="" transform="translate(0 0) scale(1)">
              <path
                d="M716.5 345L797.028 345L797.028 352L858.972 352L858.972 345L939.5 345L939.5 429.5L716.5 429.5Z"
                fill="var(--ds-gray-100)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <text
                fill="currentColor"
                stroke="none"
                fontSize="15"
                textAnchor="middle"
                data-part="label"
              >
                <tspan x="828" y="395.7">
                  <tspan fontWeight="400">{"Business and Advertising"}</tspan>
                </tspan>
              </text>
            </g>
          </g>
          <g
            data-part="topic-usingX"
            style={{
              stroke: "currentColor",
              transition: "stroke 0.3s cubic-bezier(0.45,0,0.55,1)",
            }}
          >
            <clipPath id={`${id}-belly-5`}>
              <path d="M119 0L292 0L292 429.756L119 429.756Z" />
            </clipPath>
            <g clipPath={`url(#${id}-belly-5)`}>
              <g data-advance="" transform="translate(0 0) scale(1)">
                <g data-part="folders">
                  <path
                    d="M158 328L289 328L289 396L158 396Z"
                    fill="var(--ds-background-100)"
                    stroke="currentColor"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "50% 100% 0",
                    }}
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d="M149 334L280 334L280 396L149 396Z"
                    fill="var(--ds-background-100)"
                    stroke="currentColor"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "50% 100% 0",
                    }}
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d="M141 341L272 341L272 396L141 396Z"
                    fill="var(--ds-background-100)"
                    stroke="currentColor"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "50% 100% 0",
                    }}
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d="M166 346L215 346L215 396L166 396Z"
                    fill="var(--ds-background-100)"
                    stroke="currentColor"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "50% 100% 0",
                    }}
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d="M152 351L184 351L184 396L152 396Z"
                    fill="var(--ds-background-100)"
                    stroke="currentColor"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "50% 100% 0",
                    }}
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              </g>
            </g>
            <g data-advance="" transform="translate(0 0) scale(1)">
              <path
                d="M119 370L292 370L292 429.756L119 429.756Z"
                fill="var(--ds-gray-100)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <text
                fill="currentColor"
                stroke="none"
                fontSize="15"
                textAnchor="middle"
                data-part="label"
              >
                <tspan x="205.5" y="404.83">
                  {"Using 𝕏"}
                </tspan>
              </text>
            </g>
          </g>
        </g>
      </svg>
    )
  if (variant === "narrow")
    return (
      <svg
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="geometricPrecision"
        viewBox="0 0 404 424"
        aria-hidden="true"
        {...props}
      >
        <defs>
          <clipPath id={`${id}-shelf-0`}>
            <path d="M6 19L398 19L398 213L6 213Z" />
          </clipPath>
          <clipPath id={`${id}-shelf-1`}>
            <path d="M6 213L398 213L398 424L6 424Z" />
          </clipPath>
        </defs>
        <g data-group="shell">
          <rect
            fill="var(--ds-background-100)"
            height="424"
            width="404"
            x="0"
            y="0"
          />
          <path
            d="M6 13L60.88 42L60.88 382L6 410Z"
            fill="var(--ds-gray-100)"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M398 13L343.12 42L343.12 382L398 410Z"
            fill="var(--ds-gray-100)"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M6 19L398 19L343.12 42L60.88 42Z"
            fill="var(--ds-gray-100)"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M60.88 42L343.12 42L343.12 382L60.88 382Z"
            fill="var(--ds-background-100)"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M6 404L398 404L343.12 382L60.88 382Z"
            fill="var(--ds-background-100)"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <line
            stroke="currentColor"
            x1="6"
            x2="60.88"
            y1="19"
            y2="42"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <line
            stroke="currentColor"
            x1="398"
            x2="343.12"
            y1="19"
            y2="42"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <line
            stroke="currentColor"
            x1="6"
            x2="60.88"
            y1="404"
            y2="382"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <line
            stroke="currentColor"
            x1="398"
            x2="343.12"
            y1="404"
            y2="382"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M6 207L398 207L398 202.24L6 202.24Z"
            fill="var(--ds-background-100)"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </g>
        <g clipPath={`url(#${id}-shelf-0)`}>
          <g>
            <g>
              <path
                d="M92 81L92 202L104 202.24L104 97.132Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M104 97.132L104 202.24"
                fill="none"
                stroke="currentColor"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M104 97.132L92 81M104 202.24L92 202"
                fill="none"
                stroke="currentColor"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <path
              d="M43 81L92 81L92 202L43 202Z"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </g>
        <g clipPath={`url(#${id}-shelf-1)`}>
          <g
            data-group="monolith"
            style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
          >
            <g
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 100% 0",
              }}
            >
              <path
                d="M353.93 393.21L327.17 354.11L352.11 325L343.43 325L323.31 348.49L307.26 325L285.39 325L311.16 362.7L285 393.21L293.68 393.21L315.02 368.31L332.05 393.21ZM304.4 330.49L343.54 387.73L334.89 387.73L295.75 330.49Z"
                fill="none"
                stroke="currentColor"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M356.61 325L347.93 325L343.43 325L352.11 325Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M336.55 393.21L358.43 393.21L353.93 393.21L332.05 393.21Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M358.43 393.21L331.67 354.11L327.17 354.11L353.93 393.21Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M331.67 354.11L356.61 325L352.11 325L327.17 354.11Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M348.04 387.73L339.39 387.73L334.89 387.73L343.54 387.73Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M347.93 325L327.81 348.49L323.31 348.49L343.43 325Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M308.9 330.49L348.04 387.73L343.54 387.73L304.4 330.49Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M319.52 368.31L336.55 393.21L332.05 393.21L315.02 368.31Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M339.39 387.73L300.25 330.49L295.75 330.49L334.89 387.73Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M327.81 348.49L311.76 325L307.26 325L323.31 348.49Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M298.18 393.21L319.52 368.31L315.02 368.31L293.68 393.21Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M300.25 330.49L308.9 330.49L304.4 330.49L295.75 330.49Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M289.89 325L315.66 362.7L311.16 362.7L285.39 325Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M315.66 362.7L289.5 393.21L285 393.21L311.16 362.7Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M311.76 325L289.89 325L285.39 325L307.26 325Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M289.5 393.21L298.18 393.21L293.68 393.21L285 393.21Z"
                fill="var(--ds-background-100)"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M358.43 393.21L331.67 354.11L356.61 325L347.93 325L327.81 348.49L311.76 325L289.89 325L315.66 362.7L289.5 393.21L298.18 393.21L319.52 368.31L336.55 393.21ZM308.9 330.49L348.04 387.73L339.39 387.73L300.25 330.49Z"
                fill="var(--ds-gray-100)"
                fillRule="evenodd"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </g>
        </g>
        <g data-group="shelves">
          <rect
            fill="var(--ds-background-100)"
            height="6"
            stroke="currentColor"
            width="392"
            x="6"
            y="13"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <rect
            fill="var(--ds-background-100)"
            height="6"
            stroke="currentColor"
            width="392"
            x="6"
            y="207"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <rect
            fill="var(--ds-background-100)"
            height="6"
            stroke="currentColor"
            width="392"
            x="6"
            y="404"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </g>
        <g data-group="frame">
          <rect
            fill="var(--ds-background-100)"
            height="397"
            stroke="currentColor"
            width="6"
            x="0"
            y="13"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <rect
            fill="var(--ds-background-100)"
            height="397"
            stroke="currentColor"
            width="6"
            x="398"
            y="13"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </g>
        <g>
          <g
            data-part="faces-rules"
            style={{
              stroke: "currentColor",
              transition: "stroke 0.3s cubic-bezier(0.45,0,0.55,1)",
            }}
          >
            <g>
              <path
                d="M194.4 38L194.4 99.1L195 106.281L195 50.008Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M195 50.008L195 106.281"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M195 50.008L194.4 38M195 106.281L194.4 99.1"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <g>
              <path
                d="M194.4 99.1L363.602 99.1L350.835 106.281L195 106.281Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M350.835 106.281L363.602 99.1"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </g>
          <g
            data-part="faces-account"
            style={{
              stroke: "currentColor",
              transition: "stroke 0.3s cubic-bezier(0.45,0,0.55,1)",
            }}
          >
            <g>
              <path
                d="M151.448 156.982L151.448 202.103L161.407 199.719L161.407 163.487Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M161.407 163.487L161.407 199.719"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M161.407 163.487L151.448 156.982M161.407 199.719L151.448 202.103"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </g>
          <g
            data-part="faces-business"
            style={{
              stroke: "currentColor",
              transition: "stroke 0.3s cubic-bezier(0.45,0,0.55,1)",
            }}
          >
            <g>
              <path
                d="M160 99L160 157L165.586 161.389L165.586 111.103Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M165.586 111.103L165.586 161.389"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M165.586 111.103L160 99M165.586 161.389L160 157"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </g>
          <g
            data-part="topic-rules"
            style={{
              stroke: "currentColor",
              transition: "stroke 0.3s cubic-bezier(0.45,0,0.55,1)",
            }}
          >
            <clipPath id={`${id}-belly`}>
              <path d="M194.4 0L363.602 0L363.602 99.1L194.4 99.1Z" />
            </clipPath>
            <g clipPath={`url(#${id}-belly)`}>
              <g data-advance="" transform="translate(0 0) scale(1)">
                <g data-part="document">
                  <mask id={`${id}-ink`}>
                    <path
                      d="M0.7 19.9C2.2 16.9 4.2 12.6 5.4 10.2C4 8.6 3.2 7 3.4 4.8C3.6 2.2 4.4 0.6 5.6 0.5C6.8 0.4 7.3 1.9 7.1 3.8C6.9 6 6 8.2 5.6 10C6.5 11 7.6 10.2 8.5 9.2C9.5 8.2 10.2 9.7 10.9 10.6C11.6 11.4 12.4 9.5 13.1 8.6C13.9 7.7 14.5 9.9 15.1 10.6C15.8 11.3 16.4 9.2 17.2 8.9C18.2 8.6 18.7 10.7 19.7 11.1C20.4 11.3 21.3 11.4 21.9 11.5"
                      fill="none"
                      stroke="var(--ds-background-100)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="5.5"
                      pathLength={1}
                      strokeDashoffset="0"
                      strokeDasharray="0 1"
                    />
                  </mask>
                  <g
                    style={{
                      transformOrigin: "50% 50%",
                      transformBox: "fill-box",
                    }}
                  >
                    <rect
                      fill="var(--ds-background-100)"
                      height="54.400000000000006"
                      stroke="currentColor"
                      width="91.1234"
                      x="229.08"
                      y="33.92"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    <g transform="translate(229.08 33.92) scale(0.68)">
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="7"
                        width="31"
                        x="15"
                        y="14"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="3"
                        width="55"
                        x="15"
                        y="24"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="3"
                        width="55"
                        x="15"
                        y="30"
                        stroke="none"
                      />
                      <g transform="translate(86 22)">
                        <path
                          d="M6.707 0.707L4.061 3.354L6.707 6L6 6.707L3.354 4.061L0.707 6.707L0 6L2.646 3.354L0 0.707L0.707 0L3.354 2.646L6 0L6.707 0.707Z"
                          fill="currentColor"
                          stroke="none"
                        />
                      </g>
                      <line
                        stroke="currentColor"
                        x1="80"
                        x2="121"
                        y1="33"
                        y2="33"
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                      />
                      <g transform="translate(95 16.07)">
                        <g
                          style={{
                            transformBox: "fill-box",
                            transformOrigin: "50% 50% 0",
                          }}
                        >
                          <path
                            d="M5.903 0.01C6.483-0.041 7.064 0.1 7.557 0.41C9.925 1.932 7.752 7.322 6.956 9.285C6.78 9.718 6.463 10.557 6.225 10.927C7.62 10.525 8.804 9.215 9.773 8.142C10.157 7.718 10.881 6.447 11.659 7.463C11.793 7.637 11.878 8.182 11.953 8.429C12.094 8.904 12.276 9.367 12.499 9.809C12.774 10.348 13.093 10.825 13.686 11.017C14.446 10.865 15.038 10.13 15.471 9.532C15.852 9.003 16.232 8.289 17.001 8.801C17.398 9.066 17.234 9.654 17.539 9.96C18.478 10.902 19.977 10.946 21.227 11.013C21.713 11.039 22.052 11.411 21.993 11.898C21.78 12.971 20.222 12.458 19.499 12.427C18.426 12.335 17.019 11.79 16.372 10.94C15.603 11.947 14.185 12.96 12.891 12.391C11.646 11.845 11.168 10.632 10.657 9.491C9.298 10.991 7.618 12.591 5.465 12.589C5.314 12.959 4.875 13.827 4.675 14.158C4.114 15.198 2.763 17.782 2.177 18.808C1.93 19.239 1.687 19.694 1.407 20.102C1.192 20.413 0.795 20.521 0.454 20.358C0.175 20.249-0.106 19.732 0.04 19.447C0.682 18.196 2.327 15.428 2.951 14.168C3.168 13.656 3.478 13.145 3.713 12.637C3.815 12.416 3.928 12.168 4.045 11.956C2.997 10.938 2.609 9.649 2.429 8.237C2.116 5.793 2.786 0.329 5.903 0.01ZM6.049 1.554C5.594 1.644 5.284 1.954 5.039 2.329C4.525 3.112 4.293 3.977 4.124 4.885C3.916 6.001 3.83 7.111 4.019 8.238C4.127 8.889 4.255 9.558 4.586 10.136C4.628 10.21 4.677 10.336 4.749 10.376C4.809 10.349 4.822 10.307 4.856 10.249C5.316 9.119 8.797 1.439 6.049 1.554Z"
                            fill="currentColor"
                            mask={`url(#${id}-ink)`}
                            stroke="none"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
            <g data-advance="" transform="translate(0 0) scale(1)">
              <path
                d="M194.4 38L255.501 38L255.501 44.58L302.501 44.58L302.501 38L363.602 38L363.602 99.1L194.4 99.1Z"
                fill="var(--ds-gray-100)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <text
                fill="currentColor"
                stroke="none"
                fontSize="14"
                textAnchor="middle"
                data-part="label"
              >
                <tspan x="279.001" y="76.46">
                  <tspan fontWeight="400">{"Rules and Policies"}</tspan>
                </tspan>
              </text>
            </g>
          </g>
          <g
            data-part="topic-account"
            style={{
              stroke: "currentColor",
              transition: "stroke 0.3s cubic-bezier(0.45,0,0.55,1)",
            }}
          >
            <clipPath id={`${id}-belly-2`}>
              <path d="M151.448 0L354.491 0L354.491 202.103L151.448 202.103Z" />
            </clipPath>
            <g clipPath={`url(#${id}-belly-2)`}>
              <g data-advance="" transform="translate(0 0) scale(1)">
                <g data-part="id-cards" transform="translate(-4.759 0)">
                  <g
                    style={{
                      transform: "translateX(-11px) translateY(44px)",
                      transformOrigin: "50% 50%",
                      transformBox: "fill-box",
                    }}
                  >
                    <g transform="translate(192.808 125.962) scale(0.94)">
                      <g>
                        <path
                          d="M0.417 0.417V64.62H84.711V10.502L72.88 0.417H0.417Z"
                          fill="var(--ds-background-100)"
                          stroke="currentColor"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <circle
                          cx="12.519"
                          cy="12.519"
                          fill="var(--ds-gray-alpha-300)"
                          r="4.59"
                          stroke="none"
                        />
                        <rect
                          fill="var(--ds-gray-alpha-300)"
                          height="4.173"
                          width="23.368"
                          x="21.282"
                          y="10.433"
                          stroke="none"
                        />
                        <rect
                          fill="var(--ds-gray-alpha-300)"
                          height="4.173"
                          width="23.368"
                          x="47.989"
                          y="10.433"
                          stroke="none"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    style={{
                      transform: "translateX(-11px) translateY(44px)",
                      transformOrigin: "50% 50%",
                      transformBox: "fill-box",
                    }}
                  >
                    <g transform="translate(214.428 122.202) scale(0.94)">
                      <g>
                        <path
                          d="M0.417 0.417V64.62H84.711V10.502L72.88 0.417H0.417Z"
                          fill="var(--ds-background-100)"
                          stroke="currentColor"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <circle
                          cx="12.519"
                          cy="12.519"
                          fill="var(--ds-gray-alpha-300)"
                          r="4.59"
                          stroke="none"
                        />
                        <rect
                          fill="var(--ds-gray-alpha-300)"
                          height="4.173"
                          width="23.368"
                          x="21.282"
                          y="10.433"
                          stroke="none"
                        />
                        <rect
                          fill="var(--ds-gray-alpha-300)"
                          height="4.173"
                          width="23.368"
                          x="47.989"
                          y="10.433"
                          stroke="none"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    style={{
                      transform: "translateX(-11px) translateY(44px)",
                      transformOrigin: "50% 50%",
                      transformBox: "fill-box",
                    }}
                  >
                    <g transform="translate(242.628 120.322) scale(0.94)">
                      <g>
                        <path
                          d="M0.417 0.417V64.62H84.711V10.502L72.88 0.417H0.417Z"
                          fill="var(--ds-background-100)"
                          stroke="currentColor"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <circle
                          cx="12.519"
                          cy="12.519"
                          fill="var(--ds-gray-alpha-300)"
                          r="4.59"
                          stroke="none"
                        />
                        <rect
                          fill="var(--ds-gray-alpha-300)"
                          height="4.173"
                          width="23.368"
                          x="21.282"
                          y="10.433"
                          stroke="none"
                        />
                        <rect
                          fill="var(--ds-gray-alpha-300)"
                          height="4.173"
                          width="23.368"
                          x="47.989"
                          y="10.433"
                          stroke="none"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
            <g data-advance="" transform="translate(0 0) scale(1)">
              <path
                d="M151.448 156.982L354.491 156.982L354.491 202.103L151.448 202.103Z"
                fill="var(--ds-gray-100)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <text
                fill="currentColor"
                stroke="none"
                fontSize="14"
                textAnchor="middle"
                data-part="label"
              >
                <tspan x="252.9695" y="184.16">
                  <tspan fontWeight="400">{"Managing your Account"}</tspan>
                </tspan>
              </text>
            </g>
          </g>
          <g
            data-part="topic-business"
            style={{
              stroke: "currentColor",
              transition: "stroke 0.3s cubic-bezier(0.45,0,0.55,1)",
            }}
          >
            <clipPath id={`${id}-belly-3`}>
              <path d="M160 0L383 0L383 157L160 157Z" />
            </clipPath>
            <g clipPath={`url(#${id}-belly-3)`}>
              <g data-advance="" transform="translate(0 0) scale(1)">
                <g data-part="reports">
                  <g
                    style={{
                      transformBox: "fill-box",
                      transform: "translateY(54px)",
                      transformOrigin: "50% 50% 0",
                    }}
                  >
                    <path
                      d="M294.5 154.609L186.5 154.609L186.5 152.107A2.324 2.324 0 0 0 186.5 147.459L186.5 140.485A2.324 2.324 0 0 0 186.5 135.837L186.5 128.864A2.324 2.324 0 0 0 186.5 124.216L186.5 117.242A2.324 2.324 0 0 0 186.5 112.594L186.5 105.621A2.324 2.324 0 0 0 186.5 100.973L186.5 93.999A2.324 2.324 0 0 0 186.5 89.351L186.5 82.378A2.324 2.324 0 0 0 186.5 77.73L186.5 70.756A2.324 2.324 0 0 0 186.5 66.108L186.5 51L294.5 51Z"
                      fill="var(--ds-background-100)"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    <g transform="translate(186.5 51)">
                      <g>
                        <clipPath id={`${id}-disc`}>
                          <circle cx="54" cy="43" r="30" />
                        </clipPath>
                        <g clipPath={`url(#${id}-disc)`}>
                          <line
                            stroke="currentColor"
                            x1="95.727"
                            x2="-2.627"
                            y1="83.98"
                            y2="57.626"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            stroke="currentColor"
                            x1="97.191"
                            x2="-1.163"
                            y1="78.516"
                            y2="52.162"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            stroke="currentColor"
                            x1="98.655"
                            x2="0.301"
                            y1="73.052"
                            y2="46.698"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            stroke="currentColor"
                            x1="100.119"
                            x2="1.766"
                            y1="67.587"
                            y2="41.234"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            stroke="currentColor"
                            x1="101.583"
                            x2="3.23"
                            y1="62.124"
                            y2="35.77"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            stroke="currentColor"
                            x1="80.265"
                            x2="3.521"
                            y1="81.363"
                            y2="14.443"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            stroke="currentColor"
                            x1="83.984"
                            x2="7.239"
                            y1="77.099"
                            y2="10.178"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            stroke="currentColor"
                            x1="87.701"
                            x2="10.957"
                            y1="72.835"
                            y2="5.915"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            stroke="currentColor"
                            x1="91.419"
                            x2="14.674"
                            y1="68.571"
                            y2="1.651"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            stroke="currentColor"
                            x1="95.136"
                            x2="18.392"
                            y1="64.308"
                            y2="-2.612"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            stroke="currentColor"
                            x1="110.368"
                            x2="12.014"
                            y1="29.339"
                            y2="2.986"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <path
                            d="M24.08 40.806C23.792 44.735 24.28 48.683 25.518 52.423C26.755 56.163 28.717 59.623 31.291 62.605C33.866 65.587 37.003 68.033 40.522 69.803C44.042 71.573 47.876 72.632 51.805 72.921L54 43.001L24.08 40.806Z"
                            fill="var(--ds-background-100)"
                            stroke="none"
                          />
                        </g>
                        <circle
                          cx="54"
                          cy="43"
                          fill="none"
                          r="30"
                          stroke="currentColor"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    style={{
                      transformBox: "fill-box",
                      transform: "translateY(54px) rotate(-2.069deg)",
                      transformOrigin: "50% 50% 0px",
                    }}
                  >
                    <path
                      d="M307.43 162.448L199.5 162.448L199.5 159.946A2.324 2.324 0 0 0 199.5 155.298L199.5 148.325A2.324 2.324 0 0 0 199.5 143.677L199.5 136.703A2.324 2.324 0 0 0 199.5 132.055L199.5 125.082A2.324 2.324 0 0 0 199.5 120.434L199.5 113.46A2.324 2.324 0 0 0 199.5 108.812L199.5 101.839A2.324 2.324 0 0 0 199.5 97.191L199.5 90.217A2.324 2.324 0 0 0 199.5 85.569L199.5 78.596A2.324 2.324 0 0 0 199.5 73.948L199.5 58.898L307.43 58.898Z"
                      fill="var(--ds-background-100)"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    <g transform="translate(199.5 58.898000000000025)">
                      <g>
                        <rect
                          fill="var(--ds-background-100)"
                          height="51"
                          stroke="currentColor"
                          width="10.75"
                          x="17.6"
                          y="16"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <rect
                          fill="var(--ds-background-100)"
                          height="38"
                          stroke="currentColor"
                          width="10.75"
                          x="30.8"
                          y="29"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <rect
                          fill="var(--ds-background-100)"
                          height="25"
                          stroke="currentColor"
                          width="10.75"
                          x="44"
                          y="42"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <rect
                          fill="var(--ds-background-100)"
                          height="33"
                          stroke="currentColor"
                          width="10.75"
                          x="56.5"
                          y="34"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    style={{
                      transformBox: "fill-box",
                      transform: "translateY(54px)",
                      transformOrigin: "50% 50% 0px",
                    }}
                  >
                    <path
                      d="M328.5 167.609L220.5 167.609L220.5 165.107A2.324 2.324 0 0 0 220.5 160.459L220.5 153.485A2.324 2.324 0 0 0 220.5 148.837L220.5 141.864A2.324 2.324 0 0 0 220.5 137.216L220.5 130.242A2.324 2.324 0 0 0 220.5 125.594L220.5 118.621A2.324 2.324 0 0 0 220.5 113.973L220.5 106.999A2.324 2.324 0 0 0 220.5 102.351L220.5 95.378A2.324 2.324 0 0 0 220.5 90.73L220.5 83.756A2.324 2.324 0 0 0 220.5 79.108L220.5 64L328.5 64Z"
                      fill="var(--ds-background-100)"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    <g transform="translate(220.5 64)">
                      <g>
                        <line
                          stroke="currentColor"
                          strokeDasharray="6.57 4.93"
                          x1="24.716"
                          x2="89.716"
                          y1="16.066"
                          y2="16.066"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <line
                          stroke="currentColor"
                          strokeDasharray="6.57 4.93"
                          x1="24.716"
                          x2="89.716"
                          y1="29.066"
                          y2="29.066"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <line
                          stroke="currentColor"
                          strokeDasharray="6.57 4.93"
                          x1="24.716"
                          x2="89.716"
                          y1="42.066"
                          y2="42.066"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <line
                          stroke="currentColor"
                          strokeDasharray="6.57 4.93"
                          x1="89.698"
                          x2="89.698"
                          y1="15.967"
                          y2="50.917"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <path
                          d="M25.278 15.595V51.548H89.995"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <path
                          d="M25.06 51.605L47.716 29.066L68.716 42.066L89.777 15.651"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          opacity="0"
                          pathLength={1}
                          strokeDashoffset="0"
                          strokeDasharray="0 2"
                        />
                        <circle
                          cx="47.561"
                          cy="29.178"
                          fill="currentColor"
                          r="1.751"
                          stroke="none"
                          opacity="0"
                        />
                        <circle
                          cx="68.578"
                          cy="41.428"
                          fill="currentColor"
                          r="1.751"
                          stroke="none"
                          opacity="0"
                        />
                        <circle
                          cx="89.621"
                          cy="16.329"
                          fill="currentColor"
                          r="1.5"
                          stroke="none"
                          opacity="0"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
            <g data-advance="" transform="translate(0 0) scale(1)">
              <path
                d="M160 99L383 99L383 157L160 157Z"
                fill="var(--ds-gray-100)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <text
                fill="currentColor"
                stroke="none"
                fontSize="14"
                textAnchor="middle"
                data-part="label"
              >
                <tspan x="271.5" y="132.62">
                  <tspan fontWeight="400">{"Business and Advertising"}</tspan>
                </tspan>
              </text>
            </g>
          </g>
        </g>
        <g>
          <g
            data-part="faces-safety"
            style={{
              stroke: "currentColor",
              transition: "stroke 0.3s cubic-bezier(0.45,0,0.55,1)",
            }}
          >
            <g>
              <path
                d="M32 347.804L215.302 347.804L214.118 333.759L47.13 333.759Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M47.13 333.759L214.118 333.759"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M47.13 333.759L32 347.804"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <g>
              <path
                d="M215.302 347.804L215.302 404.5L214.118 385.41L214.118 333.759Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M214.118 333.759L214.118 385.41"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M214.118 333.759L215.302 347.804M214.118 385.41L215.302 404.5"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </g>
          <g
            data-part="faces-usingX"
            style={{
              stroke: "currentColor",
              transition: "stroke 0.3s cubic-bezier(0.45,0,0.55,1)",
            }}
          >
            <g>
              <path
                d="M58.56 282.003L227.76 282.003L221.706 260.382L92.268 260.382Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M92.268 260.382L221.706 260.382"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M92.268 260.382L58.56 282.003"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <g>
              <path
                d="M227.76 282.003L227.76 347.803L221.706 310.719L221.706 260.382Z"
                fill="var(--ds-background-100)"
                stroke="none"
              />
              <path
                d="M221.706 260.382L221.706 310.719"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M221.706 260.382L227.76 282.003M221.706 310.719L227.76 347.803"
                fill="none"
                strokeDasharray="5.46 4.09"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </g>
          <g
            data-part="topic-safety"
            style={{
              stroke: "currentColor",
              transition: "stroke 0.3s cubic-bezier(0.45,0,0.55,1)",
            }}
          >
            <clipPath id={`${id}-belly-4`}>
              <path d="M32 0L215.302 0L215.302 404.5L32 404.5Z" />
            </clipPath>
            <g clipPath={`url(#${id}-belly-4)`}>
              <g data-advance="" transform="translate(0 0) scale(1)">
                <g data-part="lock-cards">
                  <g
                    style={{
                      transform: "translateX(6px) translateY(54px)",
                      transformOrigin: "50% 50%",
                      transformBox: "fill-box",
                    }}
                  >
                    <rect
                      fill="var(--ds-background-100)"
                      height="70.5"
                      stroke="currentColor"
                      width="100.58"
                      x="68.66"
                      y="301.74399999999997"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    <g transform="translate(68.66 301.74399999999997) scale(0.94)">
                      <g transform="translate(8 9)">
                        <g
                          style={{
                            transformOrigin: "50% 50%",
                            transformBox: "fill-box",
                          }}
                        >
                          <path
                            d="M15.5 9H8.5C7.1 9 6.4 9 5.865 9.272C5.395 9.512 5.012 9.895 4.772 10.365C4.5 10.9 4.5 11.6 4.5 13V16.5C4.5 17.9 4.5 18.6 4.772 19.135C5.012 19.605 5.395 19.988 5.865 20.228C6.4 20.5 7.1 20.5 8.5 20.5H15.5C16.9 20.5 17.6 20.5 18.135 20.228C18.605 19.988 18.988 19.605 19.228 19.135C19.5 18.6 19.5 17.9 19.5 16.5V13C19.5 11.6 19.5 10.9 19.228 10.365C18.988 9.895 18.605 9.512 18.135 9.272C17.6 9 16.9 9 15.5 9Z"
                            fill="var(--ds-background-100)"
                            stroke="currentColor"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <path
                            d="M8 9V6.5C8 4.291 9.791 2.5 12 2.5C14.209 2.5 16 4.291 16 6.5V9"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                        </g>
                      </g>
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="7"
                        width="17"
                        x="39"
                        y="9"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="7"
                        width="21"
                        x="58"
                        y="9"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="4"
                        width="59"
                        x="39"
                        y="19"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="4"
                        width="59"
                        x="39"
                        y="26"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="4"
                        width="50"
                        x="39"
                        y="33"
                        stroke="none"
                      />
                    </g>
                  </g>
                  <g
                    style={{
                      transform: "translateX(6px) translateY(54px)",
                      transformOrigin: "50% 50%",
                      transformBox: "fill-box",
                    }}
                  >
                    <rect
                      fill="var(--ds-background-100)"
                      height="67.67999999999999"
                      stroke="currentColor"
                      width="100.58"
                      x="74.3"
                      y="304.56399999999996"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    <g transform="translate(74.3 304.56399999999996) scale(0.94)">
                      <g transform="translate(8 9)">
                        <g
                          style={{
                            transformOrigin: "50% 50%",
                            transformBox: "fill-box",
                          }}
                        >
                          <path
                            d="M15.5 9H8.5C7.1 9 6.4 9 5.865 9.272C5.395 9.512 5.012 9.895 4.772 10.365C4.5 10.9 4.5 11.6 4.5 13V16.5C4.5 17.9 4.5 18.6 4.772 19.135C5.012 19.605 5.395 19.988 5.865 20.228C6.4 20.5 7.1 20.5 8.5 20.5H15.5C16.9 20.5 17.6 20.5 18.135 20.228C18.605 19.988 18.988 19.605 19.228 19.135C19.5 18.6 19.5 17.9 19.5 16.5V13C19.5 11.6 19.5 10.9 19.228 10.365C18.988 9.895 18.605 9.512 18.135 9.272C17.6 9 16.9 9 15.5 9Z"
                            fill="var(--ds-background-100)"
                            stroke="currentColor"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <path
                            d="M8 9V6.5C8 4.291 9.791 2.5 12 2.5C14.209 2.5 16 4.291 16 6.5V9"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                        </g>
                      </g>
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="7"
                        width="17"
                        x="39"
                        y="9"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="7"
                        width="21"
                        x="58"
                        y="9"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="4"
                        width="59"
                        x="39"
                        y="19"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="4"
                        width="59"
                        x="39"
                        y="26"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="4"
                        width="50"
                        x="39"
                        y="33"
                        stroke="none"
                      />
                    </g>
                  </g>
                  <g
                    style={{
                      transform: "translateX(6px) translateY(54px)",
                      transformOrigin: "50% 50%",
                      transformBox: "fill-box",
                    }}
                  >
                    <rect
                      fill="var(--ds-background-100)"
                      height="64.86"
                      stroke="currentColor"
                      width="114.67999999999999"
                      x="64.9"
                      y="307.38399999999996"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    <g transform="translate(64.9 307.38399999999996) scale(0.94)">
                      <g transform="translate(8 9)">
                        <g
                          style={{
                            transformOrigin: "50% 50%",
                            transformBox: "fill-box",
                          }}
                        >
                          <path
                            d="M15.5 9H8.5C7.1 9 6.4 9 5.865 9.272C5.395 9.512 5.012 9.895 4.772 10.365C4.5 10.9 4.5 11.6 4.5 13V16.5C4.5 17.9 4.5 18.6 4.772 19.135C5.012 19.605 5.395 19.988 5.865 20.228C6.4 20.5 7.1 20.5 8.5 20.5H15.5C16.9 20.5 17.6 20.5 18.135 20.228C18.605 19.988 18.988 19.605 19.228 19.135C19.5 18.6 19.5 17.9 19.5 16.5V13C19.5 11.6 19.5 10.9 19.228 10.365C18.988 9.895 18.605 9.512 18.135 9.272C17.6 9 16.9 9 15.5 9Z"
                            fill="var(--ds-background-100)"
                            stroke="currentColor"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <path
                            d="M8 9V6.5C8 4.291 9.791 2.5 12 2.5C14.209 2.5 16 4.291 16 6.5V9"
                            fill="none"
                            stroke="currentColor"
                            style={{
                              transformBox: "fill-box",
                              transform: "rotate(-38deg)",
                              transformOrigin: "0% 100% 0px",
                            }}
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                        </g>
                      </g>
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="7"
                        width="17"
                        x="39"
                        y="9"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="7"
                        width="21"
                        x="58"
                        y="9"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="4"
                        width="59"
                        x="39"
                        y="19"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="4"
                        width="59"
                        x="39"
                        y="26"
                        stroke="none"
                      />
                      <rect
                        fill="var(--ds-gray-alpha-300)"
                        height="4"
                        width="50"
                        x="39"
                        y="33"
                        stroke="none"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
            <g data-advance="" transform="translate(0 0) scale(1)">
              <path
                d="M32 347.804L215.302 347.804L215.302 404.5L32 404.5Z"
                fill="var(--ds-gray-100)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <text
                fill="currentColor"
                stroke="none"
                fontSize="14"
                textAnchor="middle"
                data-part="label"
              >
                <tspan x="123.651" y="380.77">
                  <tspan fontWeight="400">{"Safety and Security"}</tspan>
                </tspan>
              </text>
            </g>
          </g>
          <g
            data-part="topic-usingX"
            style={{
              stroke: "currentColor",
              transition: "stroke 0.3s cubic-bezier(0.45,0,0.55,1)",
            }}
          >
            <clipPath id={`${id}-belly-5`}>
              <path d="M58.56 0L227.76 0L227.76 347.803L58.56 347.803Z" />
            </clipPath>
            <g clipPath={`url(#${id}-belly-5)`}>
              <g data-advance="" transform="translate(0 0) scale(1)">
                <g data-part="folders">
                  <path
                    d="M91.71 246.303L203.06 246.303L203.06 304.103L91.71 304.103Z"
                    fill="var(--ds-background-100)"
                    stroke="currentColor"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "50% 100% 0",
                    }}
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d="M84.06 251.403L195.41 251.403L195.41 304.103L84.06 304.103Z"
                    fill="var(--ds-background-100)"
                    stroke="currentColor"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "50% 100% 0",
                    }}
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d="M77.26 257.353L188.61 257.353L188.61 304.103L77.26 304.103Z"
                    fill="var(--ds-background-100)"
                    stroke="currentColor"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "50% 100% 0",
                    }}
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d="M98.51 261.603L140.16 261.603L140.16 304.103L98.51 304.103Z"
                    fill="var(--ds-background-100)"
                    stroke="currentColor"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "50% 100% 0",
                    }}
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d="M86.61 265.853L113.81 265.853L113.81 304.103L86.61 304.103Z"
                    fill="var(--ds-background-100)"
                    stroke="currentColor"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "50% 100% 0",
                    }}
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              </g>
            </g>
            <g data-advance="" transform="translate(0 0) scale(1)">
              <path
                d="M58.56 282.003L227.76 282.003L227.76 347.803L58.56 347.803Z"
                fill="var(--ds-gray-100)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <text
                fill="currentColor"
                stroke="none"
                fontSize="14"
                textAnchor="middle"
                data-part="label"
              >
                <tspan x="143.16" y="319.52">
                  {"Using 𝕏"}
                </tspan>
              </text>
            </g>
          </g>
        </g>
      </svg>
    )
  return null
}
