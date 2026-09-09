import { forwardRef } from "react";
import CustomImage from "../../../components/CustomImage";

const RADIUS_PCT = 18;

function getAngle(index, count) {
  if (count <= 1) return 0;
  const ARC_DEGREES = 35;
  const START_ANGLE = -17.5;
  return START_ANGLE + (index / (count - 1)) * ARC_DEGREES;
}

const SemicircleWheel = forwardRef(function SemicircleWheel(
  {
    items = [],
    variant = "image",
    diameter = "clamp(320px, 46vw, 620px)",
    className = "",
  },
  wheelRef,
) {
  const count = items.length;

  return (
    <div
      ref={wheelRef}
      className={`absolute ${className}`}
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: diameter,
        height: diameter,
        transformOrigin: "50% 50%",
        willChange: "transform",
        border: "none",
        background: "transparent",
      }}
      aria-hidden={variant === "image" ? "true" : undefined}
    >
      {items.map((item, i) => {
        const angleDeg = getAngle(i, count);
        const angleRad = (angleDeg * Math.PI) / 180;

        const y = 50 + RADIUS_PCT * Math.sin(angleRad);

        if (variant === "image") {
          return (
            <div
              key={item.id}
              data-wheel-item="image"
              style={{
                position: "absolute",
                left: "50%",
                top: `${y}%`,
                width: "clamp(170px, 9vw, 120px)",
                height: "clamp(170px, 9vw, 120px)",
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                border: "3px solid rgba(255,255,255,0.95)",
              }}
            >
              <CustomImage src={item.image} alt={item.alt} objectFit="cover" />
            </div>
          );
        }

        const counter = -angleDeg;

        return (
          <div
            key={item.id}
            className="about-wheel-label"
            data-counter={counter}
            data-wheel-item="text"
            style={{
              position: "absolute",
              left: "50%",
              top: `${y}%`,
              transform: `translate(-50%, -50%) rotate(${counter}deg)`,
              transformOrigin: "center center",
              willChange: "transform",
              width: "clamp(180px, 20vw, 260px)",
              textAlign: "left",
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "Antonia, serif",
                fontSize: "clamp(16px, 1.75vw, 24px)",
                fontWeight: 600,
                color: "#0a0a0a",
                lineHeight: 1.25,
                marginBottom: "clamp(4px, 0.6vh, 9px)",
                transform: "none",
              }}
            >
              {item.heading}
            </p>
            <p
              style={{
                margin: 0,
                fontFamily: "DMSans, sans-serif",
                fontSize: "clamp(12px, 1.1vw, 15px)",
                fontWeight: 400,
                color: "rgba(0,0,0,0.62)",
                lineHeight: 1.55,
                transform: "none",
              }}
            >
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
});

export default SemicircleWheel;
