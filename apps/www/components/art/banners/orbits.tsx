import type { ArtProps } from "../props"

// Ported from business.x.com: blog.
export function Orbits({
  variant = "wide",
  ...props
}: ArtProps & { variant?: "wide" | "narrow" }) {
  if (variant === "wide")
    return (
      <svg
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="geometricPrecision"
        viewBox="0 0 1118 462"
        aria-hidden="true"
        {...props}
      >
        <circle
          cx="559"
          cy="231"
          data-part="front"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0"
          r="560"
        />
        <g
          data-group="field"
          style={{
            transformBox: "view-box",
            transform: "scale(1.00592)",
            transformOrigin: "559px 231px 0px",
          }}
        >
          <g data-group="rings">
            <circle
              cx="558.96"
              cy="230.96"
              data-part="ring-inner"
              fill="none"
              r="264.46"
              stroke="currentColor"
              strokeDasharray="6 6"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            />
            <circle
              cx="558.94"
              cy="230.94"
              data-part="ring-outer"
              fill="none"
              r="370.44"
              stroke="currentColor"
              strokeDasharray="6 6"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            />
          </g>
          <g data-group="rays">
            <g
              data-part="ray-draw-beam-a"
              style={{
                transformBox: "view-box",
                transformOrigin: "559.29px 230.71px 0px",
              }}
            >
              <line
                data-part="ray-beam-a"
                stroke="currentColor"
                strokeDasharray="7.2 7.2"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="559.29"
                x2="412.01"
                y1="230.71"
                y2="83.42"
              />
            </g>
            <g
              data-part="ray-draw-beam-b"
              style={{
                transformBox: "view-box",
                transformOrigin: "559.29px 230.71px 0px",
              }}
            >
              <line
                data-part="ray-beam-b"
                stroke="currentColor"
                strokeDasharray="7.2 7.2"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="559.29"
                x2="705.79"
                y1="230.71"
                y2="377.2"
              />
            </g>
          </g>
          <g
            data-group="sight"
            style={{
              transformBox: "view-box",
              transformOrigin: "559px 231px 0px",
            }}
          >
            <g
              data-group="sight-swing"
              style={{
                transformBox: "view-box",
                transformOrigin: "559px 231px 0px",
              }}
            >
              <g
                data-part="ray-draw-sight-a"
                style={{
                  transformBox: "view-box",
                  transformOrigin: "556.15px 228.22px 0px",
                }}
              >
                <line
                  data-part="ray-sight-a"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  x1="556.15"
                  x2="832.51"
                  y1="228.22"
                  y2="-54.65"
                />
              </g>
              <g
                data-part="ray-draw-sight-b"
                style={{
                  transformBox: "view-box",
                  transformOrigin: "556.15px 228.22px 0px",
                }}
              >
                <line
                  data-part="ray-sight-b"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  x1="556.15"
                  x2="206.36"
                  y1="228.22"
                  y2="586.25"
                />
              </g>
              <g data-part="station-node">
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <circle
                    cx="370.89"
                    cy="417.43"
                    fill="var(--ds-background-100)"
                    r="28.3"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle
                    cx="370.89"
                    cy="417.43"
                    fill="currentColor"
                    r="4.82"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              </g>
              <g data-part="station-tip">
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <circle
                    cx="741.09"
                    cy="39.41"
                    fill="currentColor"
                    r="4.82"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              </g>
            </g>
          </g>
          <g
            data-part="orbit-swing"
            style={{
              transformBox: "view-box",
              transformOrigin: "559px 231px 0px",
            }}
          >
            <g transform="rotate(-60 558.55 230.66)">
              <ellipse
                cx="558.55"
                cy="230.66"
                data-part="orbit"
                fill="none"
                rx="170.86"
                ry="98.64"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              />
            </g>
          </g>
          <g data-group="riders-behind">
            <g data-part="rider-apex-behind">
              <g
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              >
                <circle
                  cx="545.92"
                  cy="98.99"
                  data-part="rider-apex"
                  fill="var(--ds-background-100)"
                  r="4.82"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                    transform:
                      "translateX(133.392px) translateY(64.6646px) scale(0.935026)",
                  }}
                />
              </g>
            </g>
            <g data-part="rider-trail-behind" opacity="0">
              <g
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              >
                <circle
                  cx="571.27"
                  cy="362.47"
                  data-part="rider-trail"
                  fill="var(--ds-background-100)"
                  r="4.82"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                    transform:
                      "translateX(-133.444px) translateY(-64.5894px) scale(1.06489)",
                  }}
                />
              </g>
            </g>
            <g data-part="rider-flank-behind" opacity="0">
              <g
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              >
                <circle
                  cx="438.09"
                  cy="285.66"
                  data-part="rider-flank"
                  fill="var(--ds-background-100)"
                  r="4.82"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                    transform:
                      "translateX(147.697px) translateY(-206.585px) scale(1.04746)",
                  }}
                />
              </g>
            </g>
          </g>
          <circle
            cx="558.55"
            cy="230.66"
            data-part="core"
            fill="none"
            r="131.98"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <g data-group="riders-front">
            <g data-part="rider-apex-front" opacity="0">
              <g
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              >
                <circle
                  cx="545.92"
                  cy="98.99"
                  data-part="rider-apex"
                  fill="var(--ds-background-100)"
                  r="4.82"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                    transform:
                      "translateX(133.392px) translateY(64.6646px) scale(0.935026)",
                  }}
                />
              </g>
            </g>
            <g data-part="rider-trail-front">
              <g
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              >
                <circle
                  cx="571.27"
                  cy="362.47"
                  data-part="rider-trail"
                  fill="var(--ds-background-100)"
                  r="4.82"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                    transform:
                      "translateX(-133.444px) translateY(-64.5894px) scale(1.06489)",
                  }}
                />
              </g>
            </g>
            <g data-part="rider-flank-front">
              <g
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              >
                <circle
                  cx="438.09"
                  cy="285.66"
                  data-part="rider-flank"
                  fill="var(--ds-background-100)"
                  r="4.82"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                    transform:
                      "translateX(147.697px) translateY(-206.585px) scale(1.04746)",
                  }}
                />
              </g>
            </g>
          </g>
          <g data-group="squares">
            <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
              <rect
                data-part="square-upper"
                fill="var(--ds-background-100)"
                height="8.64"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                width="8.64"
                x="407.34"
                y="79.45"
              />
            </g>
            <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
              <rect
                data-part="square-lower"
                fill="var(--ds-background-100)"
                height="8.64"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                width="8.64"
                x="701.11"
                y="373.23"
              />
            </g>
          </g>
        </g>
        <g data-part="badge">
          <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
            <circle
              cx="559"
              cy="231"
              fill="currentColor"
              r="36"
              stroke="var(--ds-gray-100)"
              strokeWidth="8"
            />
          </g>
          <g>
            <path
              d="M545.011 217L555.871 233.052L545.739 245L549.266 245L557.438 235.359L563.957 245L572.843 245L562.376 229.527L573 217L569.473 217L560.808 227.221L553.89 217L545 217L545.011 217ZM565.118 242.749L549.222 219.251L552.735 219.251L568.635 242.749L565.121 242.749L565.118 242.749Z"
              fill="var(--ds-background-100)"
              transform="translate(559 231) scale(1) translate(-559 -231)"
            />
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
        viewBox="0 0 404 242"
        aria-hidden="true"
        {...props}
      >
        <circle
          cx="202"
          cy="121"
          data-part="front"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0"
          r="293.33"
        />
        <g
          data-group="field"
          style={{
            transformBox: "view-box",
            transform: "scale(1.00223)",
            transformOrigin: "202px 121px 0px",
          }}
        >
          <g data-group="rings">
            <circle
              cx="201.98"
              cy="120.98"
              data-part="ring-inner"
              fill="none"
              r="138.53"
              stroke="currentColor"
              strokeDasharray="4 4"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            />
            <circle
              cx="201.97"
              cy="120.97"
              data-part="ring-outer"
              fill="none"
              r="194.04"
              stroke="currentColor"
              strokeDasharray="4 4"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            />
          </g>
          <g data-group="rays">
            <g
              data-part="ray-draw-beam-a"
              style={{
                transformBox: "view-box",
                transformOrigin: "202.16px 120.85px 0px",
              }}
            >
              <line
                data-part="ray-beam-a"
                stroke="currentColor"
                strokeDasharray="3.77 3.77"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="202.16"
                x2="125.01"
                y1="120.85"
                y2="43.7"
              />
            </g>
            <g
              data-part="ray-draw-beam-b"
              style={{
                transformBox: "view-box",
                transformOrigin: "202.16px 120.85px 0px",
              }}
            >
              <line
                data-part="ray-beam-b"
                stroke="currentColor"
                strokeDasharray="3.77 3.77"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="202.16"
                x2="278.89"
                y1="120.85"
                y2="197.58"
              />
            </g>
          </g>
          <g
            data-group="sight"
            style={{
              transformBox: "view-box",
              transformOrigin: "202px 121px 0px",
            }}
          >
            <g
              data-group="sight-swing"
              style={{
                transformBox: "view-box",
                transformOrigin: "202px 121px 0px",
              }}
            >
              <g
                data-part="ray-draw-sight-a"
                style={{
                  transformBox: "view-box",
                  transformOrigin: "200.51px 119.54px 0px",
                }}
              >
                <line
                  data-part="ray-sight-a"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  x1="200.51"
                  x2="345.27"
                  y1="119.54"
                  y2="-28.63"
                />
              </g>
              <g
                data-part="ray-draw-sight-b"
                style={{
                  transformBox: "view-box",
                  transformOrigin: "200.51px 119.54px 0px",
                }}
              >
                <line
                  data-part="ray-sight-b"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  x1="200.51"
                  x2="17.28"
                  y1="119.54"
                  y2="307.08"
                />
              </g>
              <g data-part="station-node">
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <circle
                    cx="103.47"
                    cy="218.65"
                    fill="var(--ds-background-100)"
                    r="14.82"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle
                    cx="103.47"
                    cy="218.65"
                    fill="currentColor"
                    r="2.52"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              </g>
              <g data-part="station-tip">
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <circle
                    cx="297.38"
                    cy="20.64"
                    fill="currentColor"
                    r="2.52"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              </g>
            </g>
          </g>
          <g
            data-part="orbit-swing"
            style={{
              transformBox: "view-box",
              transformOrigin: "202px 121px 0px",
            }}
          >
            <g transform="rotate(-60 201.76 120.82)">
              <ellipse
                cx="201.76"
                cy="120.82"
                data-part="orbit"
                fill="none"
                rx="89.5"
                ry="51.67"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              />
            </g>
          </g>
          <g data-group="riders-behind">
            <g data-part="rider-apex-behind">
              <g
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              >
                <circle
                  cx="195.15"
                  cy="51.85"
                  data-part="rider-apex"
                  fill="var(--ds-background-100)"
                  r="2.52"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                    transform:
                      "translateX(57.1683px) translateY(83.4224px) scale(0.911069)",
                  }}
                />
              </g>
            </g>
            <g data-part="rider-trail-behind" opacity="0">
              <g
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              >
                <circle
                  cx="208.43"
                  cy="189.86"
                  data-part="rider-trail"
                  fill="var(--ds-background-100)"
                  r="2.52"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                    transform:
                      "translateX(-57.2054px) translateY(-83.3817px) scale(1.08893)",
                  }}
                />
              </g>
            </g>
            <g data-part="rider-flank-behind">
              <g
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              >
                <circle
                  cx="138.67"
                  cy="149.63"
                  data-part="rider-flank"
                  fill="var(--ds-background-100)"
                  r="2.52"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                    transform:
                      "translateX(110.496px) translateY(-104.237px) scale(0.994028)",
                  }}
                />
              </g>
            </g>
          </g>
          <circle
            cx="201.76"
            cy="120.82"
            data-part="core"
            fill="none"
            r="69.13"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <g data-group="riders-front">
            <g data-part="rider-apex-front" opacity="0">
              <g
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              >
                <circle
                  cx="195.15"
                  cy="51.85"
                  data-part="rider-apex"
                  fill="var(--ds-background-100)"
                  r="2.52"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                    transform:
                      "translateX(57.1683px) translateY(83.4224px) scale(0.911069)",
                  }}
                />
              </g>
            </g>
            <g data-part="rider-trail-front">
              <g
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              >
                <circle
                  cx="208.43"
                  cy="189.86"
                  data-part="rider-trail"
                  fill="var(--ds-background-100)"
                  r="2.52"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                    transform:
                      "translateX(-57.2054px) translateY(-83.3817px) scale(1.08893)",
                  }}
                />
              </g>
            </g>
            <g data-part="rider-flank-front" opacity="0">
              <g
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              >
                <circle
                  cx="138.67"
                  cy="149.63"
                  data-part="rider-flank"
                  fill="var(--ds-background-100)"
                  r="2.52"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                    transform:
                      "translateX(110.496px) translateY(-104.237px) scale(0.994028)",
                  }}
                />
              </g>
            </g>
          </g>
          <g data-group="squares">
            <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
              <rect
                data-part="square-upper"
                fill="var(--ds-background-100)"
                height="4.53"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                width="4.53"
                x="122.56"
                y="41.62"
              />
            </g>
            <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
              <rect
                data-part="square-lower"
                fill="var(--ds-background-100)"
                height="4.53"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                width="4.53"
                x="276.44"
                y="195.5"
              />
            </g>
          </g>
        </g>
        <g data-part="badge">
          <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
            <circle
              cx="202"
              cy="121"
              fill="currentColor"
              r="18.86"
              stroke="var(--ds-gray-100)"
              strokeWidth="4.19"
            />
          </g>
          <g>
            <path
              d="M545.011 217L555.871 233.052L545.739 245L549.266 245L557.438 235.359L563.957 245L572.843 245L562.376 229.527L573 217L569.473 217L560.808 227.221L553.89 217L545 217L545.011 217ZM565.118 242.749L549.222 219.251L552.735 219.251L568.635 242.749L565.121 242.749L565.118 242.749Z"
              fill="var(--ds-background-100)"
              transform="translate(202 121) scale(0.5238) translate(-559 -231)"
            />
          </g>
        </g>
      </svg>
    )
  return null
}
