import type { ArtProps } from "../props"

// Ported from business.x.com: products/shopping.
export function Pipeline({
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
        <g data-group="rails">
          <g
            style={{
              transformBox: "view-box",
              transformOrigin: "522.87px 231px 0px",
            }}
          >
            <line
              data-part="rail"
              stroke="currentColor"
              strokeDasharray="5 5"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="522.87"
              x2="322.69"
              y1="231"
              y2="231"
            />
          </g>
          <g
            style={{
              transformBox: "view-box",
              transformOrigin: "314.69px 231px 0px",
            }}
          >
            <line
              data-part="rail"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="314.69"
              x2="-188"
              y1="231"
              y2="231"
            />
          </g>
          <g
            style={{
              transformBox: "view-box",
              transformOrigin: "594.97px 231px 0px",
            }}
          >
            <line
              data-part="rail"
              stroke="currentColor"
              strokeDasharray="5 5"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="594.97"
              x2="795.15"
              y1="231"
              y2="231"
            />
          </g>
          <g
            style={{
              transformBox: "view-box",
              transformOrigin: "803.15px 231px 0px",
            }}
          >
            <line
              data-part="rail"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="803.15"
              x2="1306"
              y1="231"
              y2="231"
            />
          </g>
        </g>
        <g
          style={{
            transformBox: "view-box",
            transformOrigin: "559px 231px 0px",
          }}
        >
          <line
            data-part="rule"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="559"
            x2="559"
            y1="0"
            y2="462"
          />
        </g>
        <g data-group="columns">
          <g
            style={{
              transformBox: "view-box",
              transformOrigin: "263px 231px 0px",
            }}
          >
            <line
              data-part="rule"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="263"
              x2="263"
              y1="0"
              y2="462"
            />
          </g>
          <g
            style={{
              transformBox: "view-box",
              transformOrigin: "856px 231px 0px",
            }}
          >
            <line
              data-part="rule"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="856"
              x2="856"
              y1="0"
              y2="462"
            />
          </g>
        </g>
        <g data-group="capsules">
          <g data-group="capsule-west">
            <g
              style={{
                transformBox: "view-box",
                transformOrigin: "262.69px 231px 0px",
              }}
            >
              <circle
                cx="262.69"
                cy="231"
                data-part="capsule-circle"
                fill="none"
                r="52.5"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <g
              style={{
                transform: "translateX(57.65px)",
                transformOrigin: "50% 50%",
                transformBox: "fill-box",
              }}
            >
              <g
                style={{
                  transformBox: "view-box",
                  transformOrigin: "262.69px 231px 0px",
                }}
              >
                <circle
                  cx="367.1"
                  cy="231"
                  data-part="capsule-circle"
                  fill="none"
                  r="52.5"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  cx="314.6"
                  cy="231"
                  data-part="capsule-edge"
                  fill="currentColor"
                  r="4"
                />
                <circle
                  cx="419.6"
                  cy="231"
                  data-part="capsule-edge"
                  fill="currentColor"
                  r="4"
                />
              </g>
            </g>
            <g
              style={{
                transformBox: "view-box",
                transformOrigin: "262.69px 231px 0px",
              }}
            >
              <line
                data-part="capsule-link"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="262.69"
                x2="424.75"
                y1="178.5"
                y2="178.5"
              />
              <line
                data-part="capsule-link"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="262.69"
                x2="424.75"
                y1="283.5"
                y2="283.5"
              />
            </g>
            <g
              style={{
                transformBox: "view-box",
                transformOrigin: "262.69px 231px 0px",
              }}
              opacity="0"
            >
              <line
                data-part="rule"
                stroke="currentColor"
                strokeDasharray="5 5"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="262.69"
                x2="262.69"
                y1="178.5"
                y2="283.5"
              />
            </g>
          </g>
          <g data-group="capsule-east">
            <g
              style={{
                transformBox: "view-box",
                transformOrigin: "751.1px 231px 0px",
              }}
            >
              <circle
                cx="855.15"
                cy="231"
                data-part="capsule-circle"
                fill="none"
                r="52.5"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <g
              style={{
                transform: "translateX(-58.01px)",
                transformOrigin: "50% 50%",
                transformBox: "fill-box",
              }}
            >
              <g
                style={{
                  transformBox: "view-box",
                  transformOrigin: "751.1px 231px 0px",
                }}
              >
                <circle
                  cx="751.1"
                  cy="231"
                  data-part="capsule-circle"
                  fill="none"
                  r="52.5"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  cx="698.6"
                  cy="231"
                  data-part="capsule-edge"
                  fill="currentColor"
                  r="4"
                />
              </g>
            </g>
            <g
              style={{
                transformBox: "view-box",
                transformOrigin: "855.15px 231px 0px",
              }}
            >
              <line
                data-part="capsule-link"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="855.15"
                x2="693.09"
                y1="178.5"
                y2="178.5"
              />
              <line
                data-part="capsule-link"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="855.15"
                x2="693.09"
                y1="283.5"
                y2="283.5"
              />
            </g>
            <g
              style={{
                transformBox: "view-box",
                transformOrigin: "855.15px 231px 0px",
              }}
              opacity="0"
            >
              <line
                data-part="rule"
                stroke="currentColor"
                strokeDasharray="5 5"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="855.15"
                x2="855.15"
                y1="178.5"
                y2="283.5"
              />
            </g>
          </g>
        </g>
        <g data-group="nodes">
          <circle
            cx="-1"
            cy="231"
            data-part="node"
            fill="var(--ds-background-100)"
            r="8.5"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="67.44"
            cy="231"
            data-part="node"
            fill="currentColor"
            r="4"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="314.69"
            cy="231"
            data-part="node"
            fill="currentColor"
            r="4"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="803.15"
            cy="231"
            data-part="node"
            fill="var(--ds-background-100)"
            r="8.5"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="855.63"
            cy="231"
            data-part="node"
            fill="currentColor"
            r="4"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="989.66"
            cy="231"
            data-part="node"
            fill="var(--ds-background-100)"
            r="8.5"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="1050.4"
            cy="231"
            data-part="node"
            fill="currentColor"
            r="4"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
        </g>
        <g data-group="icons">
          <g
            data-part="icon-donations"
            style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
          >
            <circle
              cx="135"
              cy="231"
              fill="var(--ds-background-100)"
              r="19.5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M143.701 225.763L141.579 231.066C141.268 231.846 140.703 232.498 139.977 232.919L136.734 234.796C136.742 234.905 136.748 235.015 136.748 235.125C136.748 237.404 134.901 239.25 132.623 239.25C130.345 239.25 128.498 237.404 128.498 235.125C128.498 234.186 128.813 233.319 129.342 232.626L129.014 232.188C128.151 231.037 128.226 229.435 129.194 228.37L131.141 226.229C131.593 225.731 132.171 225.364 132.813 225.167L136.798 223.94L137.832 223.251L138.194 223.01L143.701 225.763ZM132.075 232.558C130.889 232.81 129.998 233.864 129.998 235.125C129.998 236.575 131.174 237.75 132.623 237.75C133.878 237.75 134.927 236.87 135.186 235.692L133.159 236.866L132.305 235.67C131.626 234.72 131.584 233.52 132.075 232.558ZM137.539 225.25L137.448 225.31L133.254 226.601C132.868 226.719 132.522 226.94 132.25 227.238L130.304 229.379C129.82 229.911 129.782 230.713 130.214 231.288L130.457 231.614C130.823 231.388 131.226 231.218 131.656 231.115L131.513 230.398L131.434 230.004L131.718 229.72L133.483 227.955L137.598 228.542L135.891 231.386L135.795 231.547L135.634 231.644L133.974 232.64C133.223 233.09 133.016 234.086 133.525 234.798L133.586 234.885L139.225 231.621C139.661 231.368 140 230.977 140.187 230.509L141.795 226.487L138.302 224.74L137.539 225.25ZM133.062 230.497L133.23 231.337L134.701 230.453L135.149 229.708L134.013 229.546L133.062 230.497Z"
              fill="currentColor"
              transform="translate(135 231) scale(1) translate(-135 -231)"
            />
          </g>
          <g
            data-part="icon-shipping"
            style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
          >
            <circle
              cx="262.69"
              cy="231"
              fill="var(--ds-background-100)"
              r="19.5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M265.497 224.251C266.067 224.251 266.516 224.243 266.932 224.376C267.277 224.486 267.595 224.666 267.867 224.905C268.195 225.193 268.419 225.583 268.712 226.072L269.661 227.652C269.808 227.897 269.926 228.09 270.01 228.301C270.08 228.477 270.13 228.66 270.161 228.847C270.198 229.071 270.195 229.297 270.195 229.582V234.001C270.195 234.514 270.196 234.944 270.168 235.294C270.138 235.653 270.074 235.994 269.909 236.318C269.657 236.812 269.256 237.213 268.762 237.465C268.438 237.63 268.097 237.694 267.738 237.723C267.388 237.752 266.958 237.751 266.445 237.751H258.945C258.433 237.751 258.003 237.752 257.653 237.723C257.294 237.694 256.953 237.63 256.629 237.465C256.135 237.213 255.733 236.812 255.482 236.318C255.317 235.994 255.253 235.653 255.223 235.294C255.195 234.944 255.195 234.514 255.195 234.001V229.582C255.195 229.297 255.193 229.071 255.23 228.847C255.26 228.66 255.311 228.477 255.381 228.301C255.465 228.09 255.583 227.897 255.73 227.652L256.678 226.072C256.972 225.583 257.196 225.193 257.524 224.905C257.795 224.666 258.114 224.486 258.458 224.376C258.874 224.243 259.324 224.251 259.894 224.251H265.497ZM256.695 229.582V234.001C256.695 234.538 256.696 234.896 256.718 235.171C256.74 235.437 256.778 235.559 256.818 235.637C256.925 235.848 257.098 236.021 257.31 236.129C257.387 236.168 257.509 236.207 257.775 236.228C258.05 236.251 258.408 236.251 258.945 236.251H266.445C266.983 236.251 267.341 236.251 267.616 236.228C267.882 236.207 268.004 236.168 268.081 236.129C268.293 236.021 268.465 235.848 268.573 235.637C268.612 235.559 268.651 235.437 268.673 235.171C268.695 234.896 268.695 234.538 268.695 234.001V229.582C268.695 229.553 268.695 229.526 268.695 229.501H263.445V231.751H261.945V229.501H256.696C256.696 229.526 256.695 229.553 256.695 229.582ZM263.445 228.001H268.12L267.426 226.843C267.082 226.27 266.987 226.129 266.877 226.032C266.76 225.929 266.624 225.852 266.476 225.805C266.336 225.76 266.166 225.751 265.497 225.751H263.445V228.001ZM259.894 225.751C259.225 225.751 259.055 225.76 258.915 225.805C258.767 225.852 258.63 225.929 258.514 226.032C258.403 226.129 258.308 226.27 257.965 226.843L257.27 228.001H261.945V225.751H259.894Z"
              fill="currentColor"
              transform="translate(262.69 231) scale(1) translate(-262.695 -231)"
            />
          </g>
          <g
            data-part="icon-shopping"
            style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
          >
            <g
              style={{
                transform: "translateX(-58.01px)",
                transformOrigin: "50% 50%",
                transformBox: "fill-box",
              }}
            >
              <circle
                cx="751.1"
                cy="231"
                fill="var(--ds-background-100)"
                r="19.5"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M693.086 223.501C694.743 223.501 696.086 224.844 696.086 226.501V227.251H699.836V232.201C699.836 233.028 699.837 233.695 699.793 234.232C699.748 234.779 699.653 235.259 699.427 235.703C699.068 236.409 698.494 236.983 697.788 237.342C697.344 237.569 696.864 237.663 696.317 237.708C695.78 237.752 695.113 237.751 694.286 237.751H691.886C691.059 237.751 690.392 237.752 689.854 237.708C689.308 237.663 688.828 237.569 688.384 237.342C687.678 236.983 687.104 236.409 686.745 235.703C686.518 235.259 686.424 234.779 686.379 234.232C686.335 233.695 686.336 233.028 686.336 232.201V227.251H690.086V226.501C690.086 224.844 691.429 223.501 693.086 223.501ZM687.836 232.201C687.836 233.053 687.836 233.648 687.874 234.11C687.911 234.564 687.981 234.825 688.081 235.023C688.297 235.446 688.641 235.79 689.064 236.006C689.262 236.106 689.523 236.176 689.977 236.213C690.439 236.251 691.034 236.251 691.886 236.251H694.286C695.138 236.251 695.732 236.251 696.195 236.213C696.649 236.176 696.91 236.106 697.108 236.006C697.531 235.79 697.875 235.446 698.091 235.023C698.191 234.825 698.261 234.564 698.298 234.11C698.336 233.648 698.336 233.053 698.336 232.201V228.751H696.086V231.001H694.586V228.751H691.586V231.001H690.086V228.751H687.836V232.201ZM693.086 225.001C692.258 225.001 691.586 225.673 691.586 226.501V227.251H694.586V226.501C694.586 225.673 693.914 225.001 693.086 225.001Z"
                fill="currentColor"
                transform="translate(751.1 231) scale(1) translate(-693.086 -231)"
              />
            </g>
          </g>
          <g
            data-part="icon-cart"
            style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
          >
            <circle
              cx="906.93"
              cy="231"
              fill="var(--ds-background-100)"
              r="19.5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M903.934 235.751C904.762 235.751 905.434 236.423 905.434 237.251C905.434 238.079 904.762 238.751 903.934 238.751C903.105 238.751 902.434 238.079 902.434 237.251C902.434 236.423 903.105 235.751 903.934 235.751ZM910.684 235.751C911.512 235.751 912.184 236.423 912.184 237.251C912.184 238.079 911.512 238.751 910.684 238.751C909.855 238.751 909.184 238.079 909.184 237.251C909.184 236.423 909.855 235.751 910.684 235.751ZM901.665 225.085L902.044 226.751H914.645L913.266 232.262C912.974 233.431 911.924 234.251 910.719 234.251H904.305C903.079 234.251 902.017 233.403 901.746 232.208L900.334 226.001H898.684V224.501H901.532L901.665 225.085ZM903.208 231.875C903.325 232.387 903.78 232.751 904.305 232.751H910.719C911.236 232.751 911.685 232.4 911.811 231.899L912.723 228.251H902.385L903.208 231.875Z"
              fill="currentColor"
              transform="translate(906.93 231) scale(1) translate(-906.934 -231)"
            />
          </g>
        </g>
        <g data-part="badge">
          <circle
            cx="559"
            cy="231"
            fill="var(--ds-background-100)"
            r="36.03"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <g>
            <g transform="translate(559 231) scale(1) translate(-559 -231)">
              <path
                d="M568.473 240.477L561.122 229.611L567.981 221.523H565.593L560.062 228.049L555.649 221.523H549.633L556.719 231.998L549.527 240.477H551.915L557.781 233.559L562.464 240.477H568.481H568.473ZM554.863 223.048L565.624 238.953H563.245L552.482 223.048H554.861H554.863Z"
                fill="currentColor"
              />
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
        viewBox="0 0 404 242"
        aria-hidden="true"
        {...props}
      >
        <g data-group="rails">
          <g
            style={{
              transformBox: "view-box",
              transformOrigin: "176px 121px 0px",
            }}
          >
            <line
              data-part="rail"
              stroke="currentColor"
              strokeDasharray="4 4"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="176"
              x2="88"
              y1="121"
              y2="121"
            />
          </g>
          <g
            style={{
              transformBox: "view-box",
              transformOrigin: "80px 121px 0px",
            }}
          >
            <line
              data-part="rail"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="80"
              x2="-60"
              y1="121"
              y2="121"
            />
          </g>
          <g
            style={{
              transformBox: "view-box",
              transformOrigin: "228px 121px 0px",
            }}
          >
            <line
              data-part="rail"
              stroke="currentColor"
              strokeDasharray="4 4"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="228"
              x2="316"
              y1="121"
              y2="121"
            />
          </g>
          <g
            style={{
              transformBox: "view-box",
              transformOrigin: "324px 121px 0px",
            }}
          >
            <line
              data-part="rail"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="324"
              x2="464"
              y1="121"
              y2="121"
            />
          </g>
        </g>
        <g
          style={{
            transformBox: "view-box",
            transformOrigin: "202px 121px 0px",
          }}
        >
          <line
            data-part="rule"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="202"
            x2="202"
            y1="0"
            y2="242"
          />
        </g>
        <g data-group="columns">
          <g
            style={{
              transformBox: "view-box",
              transformOrigin: "50px 121px 0px",
            }}
          >
            <line
              data-part="rule"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="50"
              x2="50"
              y1="0"
              y2="242"
            />
          </g>
          <g
            style={{
              transformBox: "view-box",
              transformOrigin: "354px 121px 0px",
            }}
          >
            <line
              data-part="rule"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="354"
              x2="354"
              y1="0"
              y2="242"
            />
          </g>
        </g>
        <g data-group="capsules">
          <g data-group="capsule-west">
            <g
              style={{
                transformBox: "view-box",
                transformOrigin: "50px 121px 0px",
              }}
            >
              <circle
                cx="50"
                cy="121"
                data-part="capsule-circle"
                fill="none"
                r="30"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <g
              style={{
                transform: "translateX(28px)",
                transformOrigin: "50% 50%",
                transformBox: "fill-box",
              }}
            >
              <g
                style={{
                  transformBox: "view-box",
                  transformOrigin: "50px 121px 0px",
                }}
              >
                <circle
                  cx="110"
                  cy="121"
                  data-part="capsule-circle"
                  fill="none"
                  r="30"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  cx="80"
                  cy="121"
                  data-part="capsule-edge"
                  fill="currentColor"
                  r="3"
                />
                <circle
                  cx="140"
                  cy="121"
                  data-part="capsule-edge"
                  fill="currentColor"
                  r="3"
                />
              </g>
            </g>
            <g
              style={{
                transformBox: "view-box",
                transformOrigin: "50px 121px 0px",
              }}
            >
              <line
                data-part="capsule-link"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="50"
                x2="138"
                y1="91"
                y2="91"
              />
              <line
                data-part="capsule-link"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="50"
                x2="138"
                y1="151"
                y2="151"
              />
            </g>
            <g
              style={{
                transformBox: "view-box",
                transformOrigin: "50px 121px 0px",
              }}
              opacity="0"
            >
              <line
                data-part="rule"
                stroke="currentColor"
                strokeDasharray="4 4"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="50"
                x2="50"
                y1="91"
                y2="151"
              />
            </g>
          </g>
          <g data-group="capsule-east">
            <g
              style={{
                transformBox: "view-box",
                transformOrigin: "294px 121px 0px",
              }}
            >
              <circle
                cx="354"
                cy="121"
                data-part="capsule-circle"
                fill="none"
                r="30"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <g
              style={{
                transform: "translateX(-28px)",
                transformOrigin: "50% 50%",
                transformBox: "fill-box",
              }}
            >
              <g
                style={{
                  transformBox: "view-box",
                  transformOrigin: "294px 121px 0px",
                }}
              >
                <circle
                  cx="294"
                  cy="121"
                  data-part="capsule-circle"
                  fill="none"
                  r="30"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  cx="264"
                  cy="121"
                  data-part="capsule-edge"
                  fill="currentColor"
                  r="3"
                />
              </g>
            </g>
            <g
              style={{
                transformBox: "view-box",
                transformOrigin: "354px 121px 0px",
              }}
            >
              <line
                data-part="capsule-link"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="354"
                x2="266"
                y1="91"
                y2="91"
              />
              <line
                data-part="capsule-link"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="354"
                x2="266"
                y1="151"
                y2="151"
              />
            </g>
            <g
              style={{
                transformBox: "view-box",
                transformOrigin: "354px 121px 0px",
              }}
              opacity="0"
            >
              <line
                data-part="rule"
                stroke="currentColor"
                strokeDasharray="4 4"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="354"
                x2="354"
                y1="91"
                y2="151"
              />
            </g>
          </g>
        </g>
        <g data-group="nodes">
          <circle
            cx="80"
            cy="121"
            data-part="node"
            fill="currentColor"
            r="3"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="324"
            cy="121"
            data-part="node"
            fill="var(--ds-background-100)"
            r="7"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="354"
            cy="121"
            data-part="node"
            fill="currentColor"
            r="3"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
        </g>
        <g data-group="icons">
          <g
            data-part="icon-shipping"
            style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
          >
            <circle
              cx="50"
              cy="121"
              fill="var(--ds-background-100)"
              r="16"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M265.497 224.251C266.067 224.251 266.516 224.243 266.932 224.376C267.277 224.486 267.595 224.666 267.867 224.905C268.195 225.193 268.419 225.583 268.712 226.072L269.661 227.652C269.808 227.897 269.926 228.09 270.01 228.301C270.08 228.477 270.13 228.66 270.161 228.847C270.198 229.071 270.195 229.297 270.195 229.582V234.001C270.195 234.514 270.196 234.944 270.168 235.294C270.138 235.653 270.074 235.994 269.909 236.318C269.657 236.812 269.256 237.213 268.762 237.465C268.438 237.63 268.097 237.694 267.738 237.723C267.388 237.752 266.958 237.751 266.445 237.751H258.945C258.433 237.751 258.003 237.752 257.653 237.723C257.294 237.694 256.953 237.63 256.629 237.465C256.135 237.213 255.733 236.812 255.482 236.318C255.317 235.994 255.253 235.653 255.223 235.294C255.195 234.944 255.195 234.514 255.195 234.001V229.582C255.195 229.297 255.193 229.071 255.23 228.847C255.26 228.66 255.311 228.477 255.381 228.301C255.465 228.09 255.583 227.897 255.73 227.652L256.678 226.072C256.972 225.583 257.196 225.193 257.524 224.905C257.795 224.666 258.114 224.486 258.458 224.376C258.874 224.243 259.324 224.251 259.894 224.251H265.497ZM256.695 229.582V234.001C256.695 234.538 256.696 234.896 256.718 235.171C256.74 235.437 256.778 235.559 256.818 235.637C256.925 235.848 257.098 236.021 257.31 236.129C257.387 236.168 257.509 236.207 257.775 236.228C258.05 236.251 258.408 236.251 258.945 236.251H266.445C266.983 236.251 267.341 236.251 267.616 236.228C267.882 236.207 268.004 236.168 268.081 236.129C268.293 236.021 268.465 235.848 268.573 235.637C268.612 235.559 268.651 235.437 268.673 235.171C268.695 234.896 268.695 234.538 268.695 234.001V229.582C268.695 229.553 268.695 229.526 268.695 229.501H263.445V231.751H261.945V229.501H256.696C256.696 229.526 256.695 229.553 256.695 229.582ZM263.445 228.001H268.12L267.426 226.843C267.082 226.27 266.987 226.129 266.877 226.032C266.76 225.929 266.624 225.852 266.476 225.805C266.336 225.76 266.166 225.751 265.497 225.751H263.445V228.001ZM259.894 225.751C259.225 225.751 259.055 225.76 258.915 225.805C258.767 225.852 258.63 225.929 258.514 226.032C258.403 226.129 258.308 226.27 257.965 226.843L257.27 228.001H261.945V225.751H259.894Z"
              fill="currentColor"
              transform="translate(50 121) scale(0.82) translate(-262.695 -231)"
            />
          </g>
          <g
            data-part="icon-shopping"
            style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
          >
            <g
              style={{
                transform: "translateX(-28px)",
                transformOrigin: "50% 50%",
                transformBox: "fill-box",
              }}
            >
              <circle
                cx="294"
                cy="121"
                fill="var(--ds-background-100)"
                r="16"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M693.086 223.501C694.743 223.501 696.086 224.844 696.086 226.501V227.251H699.836V232.201C699.836 233.028 699.837 233.695 699.793 234.232C699.748 234.779 699.653 235.259 699.427 235.703C699.068 236.409 698.494 236.983 697.788 237.342C697.344 237.569 696.864 237.663 696.317 237.708C695.78 237.752 695.113 237.751 694.286 237.751H691.886C691.059 237.751 690.392 237.752 689.854 237.708C689.308 237.663 688.828 237.569 688.384 237.342C687.678 236.983 687.104 236.409 686.745 235.703C686.518 235.259 686.424 234.779 686.379 234.232C686.335 233.695 686.336 233.028 686.336 232.201V227.251H690.086V226.501C690.086 224.844 691.429 223.501 693.086 223.501ZM687.836 232.201C687.836 233.053 687.836 233.648 687.874 234.11C687.911 234.564 687.981 234.825 688.081 235.023C688.297 235.446 688.641 235.79 689.064 236.006C689.262 236.106 689.523 236.176 689.977 236.213C690.439 236.251 691.034 236.251 691.886 236.251H694.286C695.138 236.251 695.732 236.251 696.195 236.213C696.649 236.176 696.91 236.106 697.108 236.006C697.531 235.79 697.875 235.446 698.091 235.023C698.191 234.825 698.261 234.564 698.298 234.11C698.336 233.648 698.336 233.053 698.336 232.201V228.751H696.086V231.001H694.586V228.751H691.586V231.001H690.086V228.751H687.836V232.201ZM693.086 225.001C692.258 225.001 691.586 225.673 691.586 226.501V227.251H694.586V226.501C694.586 225.673 693.914 225.001 693.086 225.001Z"
                fill="currentColor"
                transform="translate(294 121) scale(0.82) translate(-693.086 -231)"
              />
            </g>
          </g>
        </g>
        <g data-part="badge">
          <circle
            cx="202"
            cy="121"
            fill="var(--ds-background-100)"
            r="26"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <g>
            <g transform="translate(202 121) scale(0.72) translate(-559 -231)">
              <path
                d="M568.473 240.477L561.122 229.611L567.981 221.523H565.593L560.062 228.049L555.649 221.523H549.633L556.719 231.998L549.527 240.477H551.915L557.781 233.559L562.464 240.477H568.481H568.473ZM554.863 223.048L565.624 238.953H563.245L552.482 223.048H554.861H554.863Z"
                fill="currentColor"
              />
            </g>
          </g>
        </g>
      </svg>
    )
  return null
}
