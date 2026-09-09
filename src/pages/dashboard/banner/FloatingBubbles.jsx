import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BUBBLES, TIMINGS } from "../../../data/herodata";

export default function FloatingBubbles({ reducedMotion }) {
  const refs = useRef([]);
  refs.current = [];
  const addRef = (el) =>
    el && !refs.current.includes(el) && refs.current.push(el);

  useGSAP(() => {
    if (reducedMotion) return;
    refs.current.forEach((el, i) => {
      gsap.to(el, {
        y: i % 2 === 0 ? -14 : 14,
        x: i % 2 === 0 ? 8 : -8,
        duration: TIMINGS.BUBBLE_FLOAT_DURATION + i,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.5,
      });
    });
  }, [reducedMotion]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {BUBBLES.map((b, i) => (
        <div
          key={b.id}
          ref={addRef}
          className="absolute rounded-full"
          style={{
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            backgroundColor: b.color,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}
