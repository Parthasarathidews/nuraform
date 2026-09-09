import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SemicircleWheel from "./SemicircleWheel";
import CustomImage from "../../../components/CustomImage";
import { ABOUT_LINES, WHEEL_IMAGE_ITEMS, WHEEL_TEXT_ITEMS, SCROLL_DISTANCE_VH } from "../../../data/aboutdata";

import bgImage from "../../../assets/images/intro-bg.svg";

gsap.registerPlugin(ScrollTrigger);

const SEG = {
  INTRO: 0.02,
  TEXT_REVEAL: 0.48,
  TEXT_TO_WHEEL: 0.04,
  WHEEL_ANIMATION: 0.43,
  OUTRO: 0.03,
};

function splitIntoMaskedWords(element) {
  const text = element.dataset.text || element.textContent;
  element.dataset.text = text;
  const words = text.trim().split(/\s+/);

  element.innerHTML = "";

  const wordElements = [];

  words.forEach((word, i) => {
    const mask = document.createElement("span");
    mask.style.display = "inline-block";
    mask.style.overflow = "hidden";
    mask.style.verticalAlign = "top";

    const wordSpan = document.createElement("span");
    wordSpan.textContent = word;
    wordSpan.style.display = "inline-block";
    wordSpan.style.whiteSpace = "pre";

    mask.appendChild(wordSpan);
    element.appendChild(mask);

    if (i < words.length - 1) {
      element.appendChild(document.createTextNode(" "));
    }

    wordElements.push(wordSpan);
  });

  return wordElements;
}

export default function About() {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const textContainerRef = useRef(null);
  const bgImageRef = useRef(null);
  const wheelsContainerRef = useRef(null);
  const leftWheelRef = useRef(null);
  const rightWheelRef = useRef(null);

  const stanzaRefs = useRef([]);

  const addStanzaRef = (el) => {
    if (el && !stanzaRefs.current.includes(el)) {
      stanzaRefs.current.push(el);
    }
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      function buildTimeline() {
        const stanzaEls = stanzaRefs.current;
        const textContainer = textContainerRef.current;
        const bg = bgImageRef.current;
        const wheelsContainer = wheelsContainerRef.current;
        const leftWheel = leftWheelRef.current;
        const rightWheel = rightWheelRef.current;

        if (!stanzaEls.length || !textContainer || !bg || !wheelsContainer || !leftWheel || !rightWheel) {
          return;
        }

        const stanzaWordGroups = stanzaEls.map((el) => splitIntoMaskedWords(el));

        const leftItems = gsap.utils.toArray(leftWheel.querySelectorAll('[data-wheel-item="image"]'));
        const rightItems = gsap.utils.toArray(rightWheel.querySelectorAll('[data-wheel-item="text"]'));

        const vh = window.innerHeight;

        stanzaEls.forEach((el, i) => {
          gsap.set(el, {
            autoAlpha: i === 0 ? 1 : 0,
            willChange: "opacity, visibility",
          });
        });

        stanzaWordGroups.forEach((words) => {
          gsap.set(words, {
            yPercent: 110,
            opacity: 0,
            willChange: "transform, opacity",
          });
        });

        gsap.set(textContainer, { autoAlpha: 1 });

        gsap.set(bg, {
          scale: 0.3,
          opacity: 0,
          transformOrigin: "center center",
          willChange: "transform, opacity",
        });

        gsap.set(wheelsContainer, { autoAlpha: 0 });
        gsap.set([leftWheel, rightWheel], { rotation: 0, y: 0 });

        const leftOffset = vh * 0.75;
        const rightOffset = vh * 0.75;

        gsap.set(leftItems, {
          xPercent: -50,
          yPercent: -50,
          y: leftOffset,
          x: -vh * 0.15,
          autoAlpha: 0,
          willChange: "transform, opacity",
        });

        rightItems.forEach((item) => {
          gsap.set(item, {
            xPercent: -50,
            yPercent: -50,
            rotation: 0,
            y: -rightOffset,
            x: vh * 0.15,
            autoAlpha: 0,
            willChange: "transform, opacity",
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",

            end: "bottom top",
            pin: innerRef.current,
            pinSpacing: false,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to({}, { duration: SEG.INTRO });

        tl.to(
          bg,
          {
            scale: 1.9,
            opacity: 0.85,
            ease: "power2.out",
            duration: SEG.TEXT_REVEAL,
          },
          SEG.INTRO,
        );

        const stanzaSlice = SEG.TEXT_REVEAL / stanzaWordGroups.length;
        const FADE = stanzaSlice * 0.1;

        stanzaWordGroups.forEach((words, stanzaIdx) => {
          const el = stanzaEls[stanzaIdx];
          const sliceStart = SEG.INTRO + stanzaIdx * stanzaSlice;
          const isLast = stanzaIdx === stanzaWordGroups.length - 1;

          if (stanzaIdx > 0) {
            tl.to(el, { autoAlpha: 1, ease: "none", duration: FADE }, sliceStart);
          }

          const revealStart = sliceStart + (stanzaIdx > 0 ? FADE : 0);
          const revealSpan = stanzaSlice - (stanzaIdx > 0 ? FADE : 0) - (isLast ? 0 : FADE);
          const perWord = revealSpan / words.length;

          words.forEach((word, wordIdx) => {
            tl.to(
              word,
              {
                yPercent: 0,
                opacity: 1,
                ease: "power3.out",
                duration: perWord * 0.9,
              },
              revealStart + wordIdx * perWord,
            );
          });

          if (!isLast) {
            tl.to(el, { autoAlpha: 0, ease: "none", duration: FADE }, sliceStart + stanzaSlice);
          }
        });

        const textEnd = SEG.INTRO + SEG.TEXT_REVEAL;

        tl.to(
          [textContainer, bg],
          {
            autoAlpha: 0,
            ease: "power2.in",
            duration: SEG.TEXT_TO_WHEEL,
          },
          textEnd,
        );

        const wheelStart = textEnd + SEG.TEXT_TO_WHEEL;

        tl.to(wheelsContainer, { autoAlpha: 1, ease: "none", duration: SEG.WHEEL_ANIMATION * 0.05 }, wheelStart);

        const count = Math.max(leftItems.length, rightItems.length);
        const travelSpan = SEG.WHEEL_ANIMATION * 0.95;

        const step = travelSpan / (count * 2);
        const itemDuration = step * 4;

        for (let i = 0; i < count; i++) {
          const start = wheelStart + SEG.WHEEL_ANIMATION * 0.05 + i * step;
          const left = leftItems[i];
          const right = rightItems[i];

          if (left) {
            tl.fromTo(
              left,
              {
                y: leftOffset,
                x: -vh * 0.15,
                autoAlpha: 0,
              },
              {
                keyframes: [
                  {
                    y: leftOffset * 0.5,
                    x: -vh * 0.08,
                    autoAlpha: 1,
                    duration: itemDuration * 0.25,
                    ease: "power1.out",
                  },
                  {
                    y: 0,
                    x: 0,
                    autoAlpha: 1,
                    duration: itemDuration * 0.25,
                    ease: "power1.inOut",
                  },
                  {
                    y: -leftOffset * 0.5,
                    x: -vh * 0.08,
                    autoAlpha: 1,
                    duration: itemDuration * 0.25,
                    ease: "power1.inOut",
                  },
                  {
                    y: -leftOffset,
                    x: -vh * 0.15,
                    autoAlpha: 1,
                    duration: itemDuration * 0.25,
                    ease: "power1.in",
                  },
                ],
                immediateRender: false,
              },
              start,
            );

            tl.to(
              left,
              {
                autoAlpha: 0,
                ease: "power2.in",
                duration: itemDuration * 0.15,
              },
              start + itemDuration * 0.85,
            );
          }

          if (right) {
            tl.fromTo(
              right,
              {
                y: -rightOffset,
                x: vh * 0.15,
                autoAlpha: 0,
              },
              {
                keyframes: [
                  {
                    y: -rightOffset * 0.5,
                    x: vh * 0.08,
                    autoAlpha: 1,
                    duration: itemDuration * 0.25,
                    ease: "power1.out",
                  },
                  {
                    y: 0,
                    x: 0,
                    autoAlpha: 1,
                    duration: itemDuration * 0.25,
                    ease: "power1.inOut",
                  },
                  {
                    y: rightOffset * 0.5,
                    x: vh * 0.08,
                    autoAlpha: 1,
                    duration: itemDuration * 0.25,
                    ease: "power1.inOut",
                  },
                  {
                    y: rightOffset,
                    x: vh * 0.15,
                    autoAlpha: 1,
                    duration: itemDuration * 0.25,
                    ease: "power1.in",
                  },
                ],
                immediateRender: false,
              },
              start,
            );

            tl.to(
              right,
              {
                autoAlpha: 0,
                ease: "power2.in",
                duration: itemDuration * 0.15,
              },
              start + itemDuration * 0.85,
            );
          }
        }

        tl.to({}, { duration: SEG.OUTRO }, wheelStart + SEG.WHEEL_ANIMATION);

        return tl;
      }

      mm.add("(min-width: 300px)", () => {
        buildTimeline();
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} aria-label="About Nuraform" className="relative w-full overflow-hidden bg-white" style={{ height: `${SCROLL_DISTANCE_VH}vh` }}>
      <div ref={innerRef} className="relative flex h-screen w-full flex-col items-center justify-center overflow-visible bg-white">
        <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center overflow-hidden">
          <div ref={bgImageRef} className="relative h-[clamp(300px,65vw,900px)] w-[clamp(300px,65vw,900px)] overflow-hidden p-[6%]">
            <CustomImage className="scale-[0.9538] opacity-[0.5231] drop-shadow-[0.9538px_0.9538px_55.2308px_rgba(255,181,163,0.48)]" src={bgImage} alt="About Nuraform" objectFit="contain" objectPosition="center" />
          </div>
        </div>

        <div ref={textContainerRef} className="pointer-events-none relative z-10 grid max-w-[clamp(320px,88vw,950px)] place-items-center px-[clamp(20px,6vw,100px)] py-0 text-center">
          {ABOUT_LINES.map((line) => (
            <p
              style={{
                fontSize: "var(--fs60)",
              }}
              key={line.id}
              ref={addStanzaRef}
              className={`font-antonia m-0 max-w-full [grid-area:1/1] ${line.emphasis ? "leading-[1.15] tracking-[-0.02em] text-[#111111]" : "leading-[1.65] tracking-[0.01em] text-[#2a2a2a]"}`}
            >
              {line.text}
            </p>
          ))}
        </div>

        <div ref={wheelsContainerRef} className="pointer-events-none absolute top-0 left-0 z-[15] flex h-full w-full items-center justify-center gap-[clamp(8px,0.5vw,14px)] overflow-visible">
          <div className="relative h-[clamp(200px,30vw,420px)] w-[clamp(200px,30vw,420px)] overflow-visible">
            <SemicircleWheel ref={leftWheelRef} items={WHEEL_IMAGE_ITEMS} variant="image" diameter="clamp(200px, 30vw, 420px)" />
          </div>

          <div className="relative h-[clamp(200px,30vw,420px)] w-[clamp(200px,30vw,420px)] overflow-visible">
            <SemicircleWheel ref={rightWheelRef} items={WHEEL_TEXT_ITEMS} variant="text" diameter="clamp(200px, 30vw, 420px)" />
          </div>
        </div>
      </div>
    </section>
  );
}
