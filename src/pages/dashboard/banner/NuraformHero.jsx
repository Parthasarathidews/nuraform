import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroBackground from "./HeroBackground";
import FloatingBubbles from "./FloatingBubbles";
import CircularCarousel from "./CircularCarousel";
import PromptBar from "./PromptBar";

import { HERO_COPY, CTA, PROMPT_SUGGESTIONS } from "../../../data/herodata";
import CustomImage from "../../../components/CustomImage";

import leftBubbleOne from "../../../assets/images/motif-l1.svg";
import leftBubbleTwo from "../../../assets/images/motif-l2.svg";
import rightBubbleThree from "../../../assets/images/motif-t1.svg";
import rightBubbleFour from "../../../assets/images/motif-r1.svg";
import rightBubbleFive from "../../../assets/images/motif-r2.svg";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const RING_COUNT = 5;

const RING_TRAVEL_DURATION = 14.0;
const RING_STAGGER = RING_TRAVEL_DURATION / RING_COUNT;

export default function NuraformHero() {
  const rootRef = useRef(null);
  const navigate = useNavigate();
  const headlineRef = useRef(null);
  const ctaRef = useRef(null);
  const secondaryRef = useRef(null);
  const paraRef = useRef(null);
  const circleRef = useRef(null);
  const glowRef = useRef(null);

  const ringCanvasRef = useRef(null);

  const leftBubbleOneRef = useRef(null);
  const leftBubbleTwoRef = useRef(null);

  const rightBubbleThreeRef = useRef(null);
  const rightBubbleFourRef = useRef(null);
  const rightBubbleFiveRef = useRef(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const goToNextSlide = useCallback(() => {
    setActiveSlide((current) => (current + 1) % PROMPT_SUGGESTIONS.length);
  }, []);

  const handleDemoPage = () => {
    navigate("/demo");
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    setReducedMotion(mq.matches);

    const onChange = (e) => {
      setReducedMotion(e.matches);
    };

    mq.addEventListener("change", onChange);

    return () => {
      mq.removeEventListener("change", onChange);
    };
  }, []);

  useGSAP(
    () => {
      const targets = [headlineRef.current, ctaRef.current, secondaryRef.current, paraRef.current, circleRef.current].filter(Boolean);

      if (reducedMotion) {
        gsap.set(targets, {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: "transform",
        });

        return;
      }

      gsap
        .timeline({
          defaults: {
            ease: "power3.out",
          },
        })
        .from(headlineRef.current, {
          y: 24,
          opacity: 0,
          duration: 0.8,
        })
        .from(
          ctaRef.current,
          {
            y: 16,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5",
        )
        .from(
          secondaryRef.current,
          {
            y: 16,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5",
        )
        .from(
          circleRef.current,
          {
            scale: 0.92,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.6",
        )
        .from(
          paraRef.current,
          {
            y: 16,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.6",
        );
    },
    {
      scope: rootRef,
      dependencies: [reducedMotion],
    },
  );

  useGSAP(
    () => {
      const glow = glowRef.current;
      if (!glow) return;

      const xTo = gsap.quickTo(glow, "x", {
        duration: 0.7,
        ease: "power3.out",
      });

      const yTo = gsap.quickTo(glow, "y", {
        duration: 0.7,
        ease: "power3.out",
      });

      const handlePointerMove = (event) => {
        const rect = rootRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        xTo(x - rect.width / 2);
        yTo(y - rect.height / 2);
      };

      rootRef.current?.addEventListener("pointermove", handlePointerMove);

      if (reducedMotion) {
        gsap.set(glow, { x: 0, y: 0, opacity: 0.8 });
        return () => {
          rootRef.current?.removeEventListener("pointermove", handlePointerMove);
        };
      }

      gsap.set(glow, { x: 0, y: 0, opacity: 0.95, filter: "blur(30px)" });

      return () => {
        rootRef.current?.removeEventListener("pointermove", handlePointerMove);
      };
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  useEffect(() => {
    const canvas = ringCanvasRef.current;
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext("2d");
    let rafId = null;
    let startTime = null;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    const getMetrics = () => {
      const canvasRect = canvas.getBoundingClientRect();
      const circleRect = circleRef.current?.getBoundingClientRect();

      if (!circleRect) {
        const cw = canvasRect.width;
        const ch = canvasRect.height;
        return {
          cx: cw / 2,
          cy: ch / 2,
          carouselR: Math.min(window.innerWidth * 0.26, 280),
          distToLeft: cw / 2,
          distToRight: cw / 2,
          canvasW: cw,
          canvasH: ch,
        };
      }

      const cx = circleRect.left + circleRect.width / 2;
      const cy = circleRect.top + circleRect.height / 2;

      const carouselDiameter = Math.min(window.innerWidth * 0.52, 560);
      const carouselR = carouselDiameter / 2;

      const viewportRadius = Math.hypot(window.innerWidth, window.innerHeight) / 2;

      const distToLeft = viewportRadius + 200;
      const distToRight = viewportRadius + 200;

      return {
        cx,
        cy,
        carouselR,
        distToLeft,
        distToRight,
        canvasW: window.innerWidth,
        canvasH: window.innerHeight,
      };
    };

    const draw = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000; // seconds

      const { cx, cy, carouselR, distToLeft, distToRight, canvasW, canvasH } = getMetrics();

      ctx.clearRect(0, 0, canvasW, canvasH);

      for (let i = 0; i < RING_COUNT; i++) {
        const ringOffset = i * RING_STAGGER;
        const cycleTime = (((elapsed - ringOffset) % RING_TRAVEL_DURATION) + RING_TRAVEL_DURATION) % RING_TRAVEL_DURATION;
        const normalizedT = cycleTime / RING_TRAVEL_DURATION;

        const fadeIn = Math.min(normalizedT / 0.05, 1);
        const fadeOut = normalizedT > 0.5 ? 1 - (normalizedT - 0.5) / 0.5 : 1;

        const baseOpacity = 1 - normalizedT * 0.6;
        const opacity = fadeIn * fadeOut * baseOpacity;

        if (opacity <= 0) continue;

        const leftRadius = carouselR + normalizedT * (distToLeft - carouselR);
        const rightRadius = carouselR + normalizedT * (distToRight - carouselR);

        const drawGlossyArc = (radius, startAngle, endAngle) => {
          ctx.save();
          ctx.shadowColor = `rgba(255, 255, 255, ${opacity * 0.04})`;
          ctx.shadowBlur = 70;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, startAngle, endAngle, false);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.015})`;
          ctx.lineWidth = 26;
          ctx.stroke();
          ctx.restore();

          ctx.save();
          ctx.shadowColor = `rgba(255, 255, 255, ${opacity * 0.06})`;
          ctx.shadowBlur = 30;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, startAngle, endAngle, false);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.025})`;
          ctx.lineWidth = 12;
          ctx.stroke();
          ctx.restore();

          ctx.save();
          ctx.shadowColor = `rgba(255, 255, 255, ${opacity * 0.09})`;
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, startAngle, endAngle, false);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.045})`;
          ctx.lineWidth = 4;
          ctx.stroke();
          ctx.restore();
        };

        drawGlossyArc(leftRadius, Math.PI / 2, (3 * Math.PI) / 2);

        drawGlossyArc(rightRadius, -Math.PI / 2, Math.PI / 2);
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [reducedMotion]);

  useGSAP(
    () => {
      const leftBubbles = [leftBubbleOneRef.current, leftBubbleTwoRef.current].filter(Boolean);

      const rightBubbles = [rightBubbleThreeRef.current, rightBubbleFourRef.current, rightBubbleFiveRef.current].filter(Boolean);

      if (!leftBubbles.length && !rightBubbles.length) {
        return;
      }

      if (reducedMotion) {
        gsap.set(leftBubbles, {
          x: 0,
        });

        gsap.set(rightBubbles, {
          x: 0,
        });

        return;
      }

      gsap.set(leftBubbles, {
        x: 0,
      });

      gsap.set(rightBubbles, {
        x: 0,
      });

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,

          start: "top top",

          end: "bottom top",

          scrub: 1.2,

          invalidateOnRefresh: true,
        },
      });

      scrollTimeline.to(
        leftBubbles,
        {
          x: "-12vw",
          ease: "none",
          stagger: 0.08,
        },
        0,
      );

      scrollTimeline.to(
        rightBubbles,
        {
          x: "12vw",
          ease: "none",
          stagger: 0.08,
        },
        0,
      );

      return () => {
        scrollTimeline.scrollTrigger?.kill();
        scrollTimeline.kill();
      };
    },
    {
      scope: rootRef,
      dependencies: [reducedMotion],
    },
  );

  return (
    <section ref={rootRef} className="relative isolate flex h-screen min-h-screen w-full items-center justify-center overflow-hidden px-6 sm:px-10 lg:px-16" aria-label="Nuraform hero">
      <HeroBackground />

      <canvas ref={ringCanvasRef} aria-hidden="true" className="pointer-events-none fixed top-0 left-0 z-[5] h-full w-full" />

      <div className="left-bottom-bubbles">
        <div className="left-bubble-container absolute bottom-[0%] left-0 z-1 flex w-[27%] flex-col items-center justify-center xl:w-[24%] 2xl:w-[21%]">
          <CustomImage ref={leftBubbleOneRef} src={leftBubbleOne} alt="Left Bubble One" />
          <CustomImage ref={leftBubbleTwoRef} src={leftBubbleTwo} alt="Left Bubble Two" />
        </div>

        <div className="absolute top-[20%] right-[0%] z-1 flex w-[40%] flex-col items-center justify-center gap-4 xl:w-[35%] 2xl:w-[30%]">
          <CustomImage ref={rightBubbleThreeRef} src={rightBubbleThree} alt="Right Bubble Three" />
        </div>

        <div className="right-bubble-container absolute right-0 bottom-[0%] z-1 flex w-[50%] flex-col items-center justify-center gap-4 xl:w-[44%] 2xl:w-[38%]">
          <div className="absolute right-[0%] bottom-[100%] w-[20%] xl:w-[18%] 2xl:w-[16%]">
            <CustomImage ref={rightBubbleFourRef} src={rightBubbleFour} alt="Right Bubble Four" />
          </div>

          <div className="ml-auto h-[auto] w-[35%] max-[1023px]:w-[50%] xl:w-[35%] 2xl:w-[35%]">
            <CustomImage ref={rightBubbleFiveRef} src={rightBubbleFive} alt="Right Bubble Five" />
          </div>
        </div>
      </div>

      <div className="banner-sectoion-contents-container relative z-10 mx-auto grid w-full grid-cols-[28%_44%_28%] items-center gap-10 max-[1023px]:h-full max-[1023px]:grid-cols-[28%_72%] max-[1023px]:grid-rows-2 max-[1023px]:gap-1 max-[767px]:grid-cols-1 max-[767px]:grid-rows-none">
        <div className="mx-auto flex flex-col items-start gap-6 text-left max-[1023px]:col-start-1 max-[1023px]:row-start-1 max-[1023px]:w-full max-[1023px]:gap-1">
          <h1 style={{ whiteSpace: "nowrap", fontSize: "var(--fs80)" }} ref={headlineRef} className="font-antonia z-1 leading-[1.08] font-normal text-(--fs100) text-white max-[769px]:text-[30px]! max-[577px]:text-[25px]!">
            Stunning, AI- <br />
            Powered Forms in <br />
            Seconds.
          </h1>

          <div onClick={handleDemoPage} className="group my-2 flex cursor-pointer items-center max-[577px]:z-1">
            <div className="flex h-[50px] w-0 shrink-0 items-center justify-center transition-[width] duration-300 group-hover:w-[50px]">
              <div className="flex h-[50px] w-[50px] shrink-0 origin-center scale-0 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-100">
                <svg width="27" height="27" className="text-white" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25.8718 12.7011C26.1603 12.9895 26.1603 13.4572 25.8718 13.7457L21.1711 18.4466C20.8826 18.735 20.4149 18.735 20.1264 18.4466C19.838 18.1581 19.838 17.6904 20.1264 17.4019L24.3049 13.2234L20.1263 9.04496C19.8379 8.7565 19.8379 8.28881 20.1263 8.00034C20.4148 7.71187 20.8825 7.71187 21.171 8.00033L25.8718 12.7011ZM1.32031 13.2236L1.32031 12.485L25.3495 12.4847L25.3495 13.2234L25.3495 13.9621L1.32032 13.9623L1.32031 13.2236Z" fill="currentColor" />
                </svg>
              </div>
            </div>

            <div className="shrink-0 rounded-full bg-[#fff] px-(--fs40) py-(--fs16)">
              <p className="whitespace-nowrap text-[#000]">Try Demo Now</p>
            </div>

            <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center overflow-visible transition-[width] duration-300 group-hover:w-0">
              <div className="flex h-[50px] w-[50px] shrink-0 origin-center scale-100 items-center justify-center rounded-full bg-[#fff] transition-transform duration-300 group-hover:scale-0">
                <svg width="27" height="27" className="text-[#000]" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25.8718 12.7011C26.1603 12.9895 26.1603 13.4572 25.8718 13.7457L21.1711 18.4466C20.8826 18.735 20.4149 18.735 20.1264 18.4466C19.838 18.1581 19.838 17.6904 20.1264 17.4019L24.3049 13.2234L20.1263 9.04496C19.8379 8.7565 19.8379 8.28881 20.1263 8.00034C20.4148 7.71187 20.8825 7.71187 21.171 8.00033L25.8718 12.7011ZM1.32031 13.2236L1.32031 12.485L25.3495 12.4847L25.3495 13.2234L25.3495 13.9621L1.32032 13.9623L1.32031 13.2236Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>

          <div style={{ fontSize: "var(--fs23)" }} ref={secondaryRef} className="flex flex-col gap-1 text-white/70 max-[577px]:hidden">
            <a href={CTA.secondary.href} className="transition hover:text-white">
              {CTA.secondary.label}
            </a>

            <a href={CTA.tertiary.href} className="transition hover:text-white">
              {CTA.tertiary.label}
            </a>
          </div>
        </div>

        <div ref={circleRef} className="relative mx-auto flex w-full items-center justify-center max-[1023px]:col-start-2 max-[1023px]:row-span-2 max-[1023px]:row-start-1" style={{ minHeight: "520px" }}>
          <div ref={glowRef} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 z-20 aspect-square w-[min(34vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.28)_18%,rgba(191,153,255,0.7)_35%,rgba(137,121,255,0.28)_52%,rgba(11,11,24,0)_72%)] blur-[28px] max-[1023px]:w-[min(44vw,620px)]" />

          <div className="relative z-30">
            <CircularCarousel reducedMotion={reducedMotion} activeSlide={activeSlide} />
          </div>

          <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
            <PromptBar reducedMotion={reducedMotion} prompt={PROMPT_SUGGESTIONS[activeSlide % PROMPT_SUGGESTIONS.length]} onPromptComplete={goToNextSlide} />
          </div>
        </div>

        <div ref={paraRef} className="mr-auto w-[85%] max-[1023px]:col-start-1 max-[1023px]:row-start-2 max-[1023px]:w-full">
          <div className="mb-3 flex items-center gap-1.5">
            <svg width="40" height="25" viewBox="0 0 54 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12.705" r="11" fill="#E855C7" stroke="#E855C7" />
              <path
                d="M42.5234 0.954956V11.7958L52.1455 6.52917L52.3691 6.4071L52.4873 6.63367L52.7217 7.08289L52.835 7.29968L52.6211 7.41687L43.0996 12.6688L52.6221 17.993L52.834 18.1122L52.7217 18.327L52.4873 18.7762L52.3691 19.0028L52.1455 18.8807L42.5234 13.6132V24.455H41.4766V13.6151L31.9326 18.8798L31.7354 18.9891L31.6074 18.8036L31.2949 18.3544L31.1367 18.1268L31.3789 17.993L40.9746 12.6688L31.3799 7.41785L31.1357 7.28406L31.2949 7.05554L31.6074 6.60632L31.7354 6.42078L31.9326 6.53015L41.4766 11.7938V0.954956H42.5234Z"
                fill="#E855C7"
                stroke="#E855C7"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          <p style={{ fontSize: "var(--fs20)" }} className="pr-[10%] leading-relaxed text-white/85 max-[1023px]:w-[400px] max-[1023px]:text-[14px]!">
            {HERO_COPY.paragraph}
          </p>
        </div>
      </div>
    </section>
  );
}
