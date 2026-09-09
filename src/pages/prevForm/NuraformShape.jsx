import React from "react";

const NuraformShape = ({ variant = "landing", className = "" }) => {
  const gradientId = `nf-shape-grad-${variant}`;
  const filterShadowId = `nf-shadow-${variant}`;

  const animClass =
    variant === "thankyou"
      ? "nf-shape-thankyou"
      : "nf-shape-appear nf-shape-float";

  return (
    <div
      className={`inline-block will-change-transform ${animClass} ${className}`}
    >
      <svg
        viewBox="0 0 380 160"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[clamp(300px,53vw,500px)] h-auto overflow-visible"
        style={{
          filter: `url(#${filterShadowId})`,
        }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="15%" y1="5%" x2="90%" y2="90%">
            <stop offset="0%" stopColor="#dfa0c1" />
            <stop offset="22%" stopColor="#d7c9e9" />
            <stop offset="38%" stopColor="#b8e7ef" />
            <stop offset="70%" stopColor="#bcecf3" />
            <stop offset="100%" stopColor="#b9e9ef" />
          </linearGradient>

          <filter
            id={filterShadowId}
            x="-15%"
            y="-15%"
            width="130%"
            height="140%"
          >
            <feDropShadow
              dx="0"
              dy="5"
              stdDeviation="8"
              floodColor="#b8c9d8"
              floodOpacity="0.16"
            />
          </filter>
        </defs>

        <path
          d="
            M 49 108

            C 34 108, 22 100, 20 87
            C 17 72, 27 60, 40 57
            C 49 55, 61 57, 69 54
            C 78 51, 84 46, 88 37

            L 101 12
            C 103 8, 107 7, 112 7

            L 235 7
            C 241 7, 244 10, 246 16

            L 264 76
            C 267 86, 276 87, 281 78

            L 300 35
            C 305 24, 313 19, 322 20
            C 337 21, 346 31, 347 43
            C 349 57, 340 68, 328 71
            C 319 73, 309 72, 302 76
            C 297 79, 294 84, 291 90

            L 278 114
            C 276 118, 272 120, 267 120

            L 132 120
            C 126 120, 122 117, 120 111

            L 101 62
            C 99 56, 94 54, 91 60

            L 75 99
            C 71 109, 61 113, 49 108

            Z
          "
          fill={`url(#${gradientId})`}
        />
      </svg>
    </div>
  );
};

export default NuraformShape;
