import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import bgOne from "../assets/images/loader-bg.webp";
import bgTwo from "../assets/images/loader-bg2.webp";
const SpinnerBackground = () => {
  const containerRef = useRef(null);
  const bg1Ref = useRef(null);
  const bg2Ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bg1Ref.current, {
        rotate: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      gsap.to(bg2Ref.current, {
        rotate: -360,
        duration: 28,
        ease: "none",
        repeat: -1,
      });

      gsap.to(containerRef.current, {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative flex h-[500px] w-full items-center justify-center">
      <img ref={bg1Ref} src={bgOne} alt="" className="absolute h-[130%] w-[130%] max-w-none object-contain" />

      <img ref={bg2Ref} src={bgTwo} alt="" className="absolute h-[110%] w-[110%] max-w-none object-contain" />

      <div className="relative z-10 text-center">
        <h3
          style={{
            fontSize: "var(--fs80)",
          }}
          aria-label="From Prompt to Praise"
          className="font-antonia absolute top-[60%] left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 gap-[0.3em] text-center whitespace-nowrap max-[769px]:top-[280px] max-[769px]:w-full max-[769px]:justify-center max-[769px]:px-[20px] max-[769px]:whitespace-normal max-[579px]:mt-[20%] max-[579px]:flex-col"
        >
          <span aria-hidden="true" className="word relative inline-block will-change-transform [perspective:1000px]">
            From
          </span>

          <span aria-hidden="true" className="word relative inline-block will-change-transform [perspective:1000px]">
            Prompt
          </span>

          <span aria-hidden="true" className="word relative inline-block will-change-transform [perspective:1000px] max-[579pc]:hidden">
            to
          </span>

          <span aria-hidden="true" className="word relative inline-block will-change-transform [perspective:1000px]">
            {
              <span aria-hidden="true" className="word relative mr-[5%] hidden will-change-transform [perspective:1000px] max-[579px]:inline-block">
                to
              </span>
            }
            Praise
          </span>
        </h3>
      </div>
    </div>
  );
};

export default SpinnerBackground;
