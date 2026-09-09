import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FooterMark from "./FooterMark";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const BAR_COUNT = 7;

const OVERLAP_RATIO = 0.6;
const BAR_DURATION = 1;

const BAR_COLORS = [
  "bg-gradient-to-t from-[#B88AF7] to-transparent",
  "bg-gradient-to-t from-[#ea38d0] to-transparent",
  "bg-gradient-to-t from-[#ff623d] from-20% to-transparent",
  "bg-gradient-to-t from-[#ff623d] from-30% to-transparent",
  "bg-gradient-to-t from-[#ff623d] from-20% to-transparent",
  "bg-gradient-to-t from-[#ea38d0] to-transparent",
  "bg-gradient-to-t from-[#B88AF7] to-transparent",
];

const bars = Array.from({ length: BAR_COUNT }, (_, i) => {
  const t = i / (BAR_COUNT - 1);
  const centered = Math.abs(t - 0.5) * 2;
  const curve = Math.cos((centered * Math.PI) / 2);

  return {
    height: Number((18 + curve * 82).toFixed(3)),
  };
});

const BAR_GROUPS = (() => {
  const center = Math.floor(BAR_COUNT / 2);
  const groups = [[center]];

  for (let offset = 1; offset <= center; offset += 1) {
    const group = [];
    if (center - offset >= 0) group.push(center - offset);
    if (center + offset <= BAR_COUNT - 1) group.push(center + offset);
    if (group.length) groups.push(group);
  }

  return groups;
})();

export function TestimonialLines({ className = "" }) {
  const sectionRef = useRef(null);
  const footerMarkRef = useRef(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray("[data-footer-line]");

      if (!items.length || !footerMarkRef.current) return;

      gsap.set(items, {
        scaleY: 0,
        transformOrigin: "bottom",
      });

      gsap.set(footerMarkRef.current, {
        autoAlpha: 0,
        y: 20,
      });

      const buildTimeline = ({ trigger, start, end, scrub, markDuration }) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger,
            start,
            end,
            scrub,
            invalidateOnRefresh: true,
          },
        });

        BAR_GROUPS.forEach((group, groupIndex) => {
          const targets = group.map((index) => items[index]).filter(Boolean);

          if (!targets.length) return;

          tl.to(
            targets,
            {
              scaleY: 1,
              duration: BAR_DURATION,
              ease: "none",
            },
            groupIndex * BAR_DURATION * OVERLAP_RATIO,
          );
        });

        tl.to(
          footerMarkRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: markDuration,
            ease: "none",
          },
          0,
        );

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      };

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () =>
        buildTimeline({
          trigger: items[0],
          start: "top bottom",
          end: "top 40%",
          scrub: 0.4,
          markDuration: 2.8,
        }),
      );

      mm.add("(min-width: 768px) and (max-width: 1023px)", () =>
        buildTimeline({
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 25%",
          scrub: 0.6,
          markDuration: 2,
        }),
      );

      mm.add("(max-width: 767px)", () =>
        buildTimeline({
          trigger: sectionRef.current,
          start: "top 90%",
          end: "top 35%",
          scrub: 0.7,
          markDuration: 2,
        }),
      );

      return () => {
        mm.revert();
      };
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <div
      ref={sectionRef}
      className={`footer__lines relative w-full select-none ${className}`}
    >
      <div
        className="
          relative
          flex
          h-[70vh]
          max-h-[880px]
          min-h-[160px]
          w-full
          items-end
          justify-center
          overflow-hidden
          px-2
          sm:px-6

          max-[1023px]:h-[55vh]
          max-[1023px]:min-h-[320px]

          max-[767px]:h-[38vh]
          max-[767px]:min-h-[180px]

          max-[480px]:h-[32vh]
          max-[480px]:min-h-[150px]
        "
      >
        <div className="absolute inset-x-0 bottom-0 flex h-full items-end">
          {bars.map((bar, index) => (
            <div
              key={index}
              data-footer-line
              style={{
                height: `${bar.height}%`,
              }}
              className={`
                min-w-[2px]
                flex-1
                origin-bottom
                will-change-transform
                ${BAR_COLORS[index]}
              `}
            />
          ))}
        </div>

        <div
          className="
            pointer-events-none
            absolute
            bottom-[-1px]
            left-[-10%]
            h-[55px]
            w-[120%]
            rounded-[50%_50%_0_0]
            bg-white

            max-[767px]:h-[40px]
            max-[480px]:h-[32px]
          "
        />

        <div
          ref={footerMarkRef}
          className="
            absolute
            bottom-[13%]
            left-[45%]

            max-[1023px]:bottom-[12%]
            max-[767px]:bottom-[11%]
            max-[480px]:bottom-[9%]
          "
        >
          <FooterMark />
        </div>
      </div>
    </div>
  );
}
