import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import bubble1 from "../../../assets/images/bubble1.png";
import bubble2 from "../../../assets/images/bubble2.png";
import bubble3 from "../../../assets/images/bubble3.png";
import bubble4 from "../../../assets/images/bubble4.png";

import motifR1 from "../../../assets/images/motif-r1.svg";
import motifL1 from "../../../assets/images/motif-l1.svg";

import loaderBg from "../../../assets/images/loader-bg2.webp";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    id: "t1",
    avatar: bubble1,
    avatarSide: "left",
    text: "I don't care about the rest, the forms themselves are a feast to the eyes.",
    left: "clamp(-460px, -34vw, -270px)",
    top: "clamp(-215px, -16vw, -125px)",
    width: "clamp(300px, 19vw, 400px)",
  },
  {
    id: "t2",
    avatar: bubble3,
    avatarSide: "right",
    text: "I had a full working form in under a minute. No learning curve, no fuss, just done.",
    left: "clamp(150px, 13vw, 300px)",
    top: "clamp(-195px, -14vw, -95px)",
    width: "clamp(300px, 20vw, 420px)",
  },
  {
    id: "t3",
    avatar: bubble2,
    avatarSide: "left",
    text: "Been looking for something like this for a while now, AI is everywhere somehow no form builder is using it like this.",
    left: "clamp(-480px, -35vw, -290px)",
    top: "clamp(70px, 8vw, 150px)",
    width: "clamp(300px, 20vw, 420px)",
  },
  {
    id: "t4",
    avatar: bubble4,
    avatarSide: "right",
    text: "It's the only form builder that feels like it was designed for how people actually use AI today.",
    left: "clamp(20px, 5vw, 110px)",
    top: "clamp(90px, 9vw, 175px)",
    width: "clamp(300px, 20vw, 420px)",
  },
];

const HEADING_WORDS = ["From", "Prompt", "to", "Praise"];

const Testimonials = ({ className = "" }) => {
  const sectionRef = useRef(null);
  const bubblesRef = useRef(null);
  const bubbleRefs = useRef([]);
  const wordRefs = useRef([]);

  const spinnerRef = useRef(null);
  const loaderOneRef = useRef(null);

  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const bubbles = bubbleRefs.current.filter(Boolean);
      const words = wordRefs.current.filter(Boolean);

      gsap.set(words, { yPercent: 110, opacity: 0, rotateX: -35 });
      gsap.set(spinnerRef.current, { opacity: 0, scale: 0.85 });
      gsap.set(bubbles, { opacity: 0, scale: 0.82, y: 26 });

      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power4.out" },
      });

      revealTl
        .to(spinnerRef.current, {
          opacity: 0.7,
          scale: 1,
          duration: 1.6,
          ease: "power2.out",
        })
        .to(
          words,
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.09,
          },
          0.15,
        )
        .to(
          bubbles,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.14,
            ease: "back.out(1.5)",
          },
          0.35,
        )
        .add(() => {
          gsap.to(bubbles, {
            y: -8,
            duration: 2.6,
            stagger: { each: 0.28, from: "random" },
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });

      gsap.to(loaderOneRef.current, {
        rotation: "+=360",
        duration: 22,
        repeat: -1,
        ease: "none",
      });

      mm.add("(min-width: 994px)", () => {
        gsap.set(leftRef.current.children, { x: 0 });
        gsap.set(rightRef.current.children, { x: 0, opacity: 1 });

        const parallaxTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        parallaxTl.to(leftRef.current.children[0], { x: -60, ease: "none" }, 0).to(leftRef.current.children[1], { x: -90, ease: "none" }, 0).to(rightRef.current.children[0], { x: 60, opacity: 0.76, ease: "none" }, 0).to(rightRef.current.children[1], { x: 90, opacity: 0.76, ease: "none" }, 0).to(bubblesRef.current, { y: -24, ease: "none" }, 0).to(loaderOneRef.current, { rotation: "+=35", scale: 1.03, ease: "none" }, 0);

        return () => parallaxTl.scrollTrigger?.kill();
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`relative z-[1] min-h-[135vh] w-full overflow-hidden pt-[10%] pb-0 max-[1023px]:min-h-[100vh] max-[993px]:min-h-max max-[993px]:pb-[60px] ${className} `}>
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <div ref={leftRef} className="absolute top-[15%] left-0 z-[1] flex -translate-y-1/2 flex-col max-[993px]:hidden">
          <div className="w-[10%] xl:w-[10%] 2xl:w-[10%]">
            <img src={motifR1} alt="" className="block shrink-0" />
          </div>
          <div className="h-[85px] w-[35%] xl:w-[35%] 2xl:w-[35%]">
            <img src={motifL1} alt="" className="block shrink-0" />
          </div>
        </div>

        <div ref={rightRef} className="absolute right-0 bottom-0 flex -translate-y-1/2 flex-col max-[993px]:hidden">
          <div className="ml-auto h-[65px] w-[10%] xl:w-[10%] 2xl:w-[10%]">
            <img src={motifR1} alt="" className="block shrink-0" />
          </div>
          <div className="ml-auto h-[85px] w-[35%] rotate-180 xl:w-[35%] 2xl:w-[35%]">
            <img src={motifL1} alt="" className="block shrink-0" />
          </div>
        </div>
      </div>

      <div ref={spinnerRef} className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[clamp(700px,60vw,1000px)] max-w-none will-change-transform select-none max-[1601px]:w-[clamp(650px,55vw,950px)] max-[1441px]:w-[clamp(600px,50vw,900px)] max-[1367px]:w-[clamp(550px,48vw,850px)] max-[1281px]:w-[clamp(500px,45vw,800px)] max-[993px]:w-[clamp(350px,120vw,600px)]">
          <img ref={loaderOneRef} src={loaderBg} alt="" />
        </div>
      </div>

      <h3 style={{ fontSize: "var(--fs80)", perspective: "1000px" }} aria-label="From Prompt to Praise" className="font-antonia absolute top-[60%] left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-wrap justify-center gap-[0.3em] text-center max-[993px]:relative max-[993px]:top-auto max-[993px]:left-auto max-[993px]:mx-auto max-[993px]:w-[86%] max-[993px]:translate-x-0 max-[993px]:translate-y-0 max-[769px]:text-[30px]! max-[577px]:text-[25px]!">
        {HEADING_WORDS.map((word, i) => (
          <span key={word} aria-hidden="true" ref={(el) => (wordRefs.current[i] = el)} className="word relative inline-block will-change-transform [perspective:1000px]">
            {word}
          </span>
        ))}
      </h3>

      <div ref={bubblesRef} className="absolute top-[60%] left-1/2 z-30 h-0 w-0 -translate-x-1/2 -translate-y-1/2 max-[993px]:static max-[993px]:top-auto max-[993px]:left-auto max-[993px]:mx-auto max-[993px]:mt-[36px] max-[993px]:flex max-[993px]:h-auto max-[993px]:w-full max-[993px]:max-w-[560px] max-[993px]:translate-x-0 max-[993px]:translate-y-0 max-[993px]:flex-col max-[993px]:items-center max-[993px]:gap-[22px] max-[993px]:px-[20px]">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={t.id}
            ref={(el) => (bubbleRefs.current[i] = el)}
            className="testimonial-bubble absolute will-change-transform max-[993px]:static max-[993px]:w-full max-[993px]:max-w-[320px]"
            style={{
              left: t.left,
              top: t.top,
              width: t.width,
            }}
          >
            <div className="relative overflow-hidden rounded-full bg-white px-8 py-5 shadow-[0_7px_29px_rgba(100,100,111,0.2)] max-[993px]:px-[26px] max-[993px]:py-[16px]">
              <p className="relative z-10 m-0 text-[14px] leading-[1.4] font-medium text-black max-[993px]:text-[13px]">{t.text}</p>
            </div>

            <div className={`w-[clamp(40px,7vw,55px)] max-[993px]:w-[42px] ${t.avatarSide === "right" ? "ml-auto" : ""} `}>
              <img src={t.avatar} alt="" aria-hidden="true" className="mt-[-2px] w-full select-none" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
