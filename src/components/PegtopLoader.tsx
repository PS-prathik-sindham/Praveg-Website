"use client";

// Exact Uiverse "pegtop" loader by andrew-manzyk — verbatim SVG + keyframes,
// recolored to Praveg primary blue (#246bfd) and scaled down to sit beside the
// AI avatar while a reply is streaming.
const D =
  "M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z";

function pegtop(svgId: string, k: string) {
  const id = (s: string) => `${s}-${k}`;
  return (
    <svg id={svgId} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
      <defs>
        <filter id={id("shine")}>
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <mask id={id("mask")}>
          <path d={D} fill="white" />
        </mask>
        <radialGradient id={id("g1")} cx="50" cy="66" fx="50" fy="66" r="30" gradientTransform="translate(0 35) scale(1 0.5)" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="black" stopOpacity="0.3" />
          <stop offset="50%" stopColor="black" stopOpacity="0.1" />
          <stop offset="100%" stopColor="black" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("g2")} cx="55" cy="20" fx="55" fy="20" r="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.3" />
          <stop offset="50%" stopColor="white" stopOpacity="0.1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("g3")} cx="85" cy="50" fx="85" fy="50" xlinkHref={`#${id("g2")}`} />
        <radialGradient id={id("g4")} cx="50" cy="58" fx="50" fy="58" r="60" gradientTransform="translate(0 47) scale(1 0.2)" xlinkHref={`#${id("g3")}`} />
        <linearGradient id={id("g5")} x1="50" y1="90" x2="50" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="black" stopOpacity="0.2" />
          <stop offset="40%" stopColor="black" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g>
        <path d={D} fill="currentColor" />
        <path d={D} fill={`url(#${id("g1")})`} />
        <path d={D} fill="none" stroke="white" opacity="0.3" strokeWidth="3" filter={`url(#${id("shine")})`} mask={`url(#${id("mask")})`} />
        <path d={D} fill={`url(#${id("g2")})`} />
        <path d={D} fill={`url(#${id("g3")})`} />
        <path d={D} fill={`url(#${id("g4")})`} />
        <path d={D} fill={`url(#${id("g5")})`} />
      </g>
    </svg>
  );
}

const CSS = `
.pegtop-loader {
  --fill-color: #246bfd;
  --shine-color: #246bfd33;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0.18);
  transform-origin: center;
  width: 100px;
  height: 100px;
  filter: drop-shadow(0 0 10px var(--shine-color));
}
.pegtop-loader svg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100px;
  height: 100px;
}
.pegtop-loader #pegtopone {
  animation: pg-flowe-one 1s linear infinite;
}
.pegtop-loader #pegtoptwo {
  opacity: 0;
  transform: scale(0) translateY(-200px) translateX(-100px);
  animation: pg-flowe-two 1s linear infinite;
  animation-delay: 0.3s;
}
.pegtop-loader #pegtopthree {
  opacity: 0;
  transform: scale(0) translateY(-200px) translateX(100px);
  animation: pg-flowe-three 1s linear infinite;
  animation-delay: 0.6s;
}
.pegtop-loader svg g path:first-child {
  fill: var(--fill-color);
}
@keyframes pg-flowe-one {
  0%   { transform: scale(0.5) translateY(-200px); opacity: 0; }
  25%  { transform: scale(0.75) translateY(-100px); opacity: 1; }
  50%  { transform: scale(1) translateY(0px); opacity: 1; }
  75%  { transform: scale(0.5) translateY(50px); opacity: 1; }
  100% { transform: scale(0) translateY(100px); opacity: 0; }
}
@keyframes pg-flowe-two {
  0%   { transform: scale(0.5) rotateZ(-10deg) translateY(-200px) translateX(-100px); opacity: 0; }
  25%  { transform: scale(1) rotateZ(-5deg) translateY(-100px) translateX(-50px); opacity: 1; }
  50%  { transform: scale(1) rotateZ(0deg) translateY(0px) translateX(-25px); opacity: 1; }
  75%  { transform: scale(0.5) rotateZ(5deg) translateY(50px) translateX(0px); opacity: 1; }
  100% { transform: scale(0) rotateZ(10deg) translateY(100px) translateX(25px); opacity: 0; }
}
@keyframes pg-flowe-three {
  0%   { transform: scale(0.5) rotateZ(10deg) translateY(-200px) translateX(100px); opacity: 0; }
  25%  { transform: scale(1) rotateZ(5deg) translateY(-100px) translateX(50px); opacity: 1; }
  50%  { transform: scale(1) rotateZ(0deg) translateY(0px) translateX(25px); opacity: 1; }
  75%  { transform: scale(0.5) rotateZ(-5deg) translateY(50px) translateX(0px); opacity: 1; }
  100% { transform: scale(0) rotateZ(-10deg) translateY(100px) translateX(-25px); opacity: 0; }
}
`;

export default function PegtopLoader() {
  return (
    <span className="relative inline-block h-9 w-9" role="status" aria-label="Generating">
      <span className="pegtop-loader">
        {pegtop("pegtopone", "a")}
        {pegtop("pegtoptwo", "b")}
        {pegtop("pegtopthree", "c")}
      </span>
      <style>{CSS}</style>
    </span>
  );
}
