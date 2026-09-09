import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import descriptionOne from "../../../assets/videos/how-1.mp4";
import descriptionTwo from "../../../assets/videos/how-2.mp4";
import descriptionThree from "../../../assets/videos/how-3.mp4";

gsap.registerPlugin(ScrollTrigger);

const Description = () => {
  const sectionRef = useRef(null);
  const movableOneRef = useRef(null);
  const movableTwoRef = useRef(null);
  const movableThreeRef = useRef(null);
  const pillOneRef = useRef(null);
  const pillTwoRef = useRef(null);
  const pillThreeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 577px)", () => {
        const isOnRightSide = (element) => {
          if (!element) return false;

          const rect = element.getBoundingClientRect();
          const viewportCenter = window.innerWidth / 2;
          const elementCenter = rect.left + rect.width / 2;

          return elementCenter > viewportCenter;
        };

        const movement = window.innerWidth >= 1024 ? 280 : 90;

        [movableOneRef, movableTwoRef, movableThreeRef].forEach((ref) => {
          if (!ref.current) return;

          const isRight = isOnRightSide(ref.current);
          const xMovement = isRight ? -movement : movement;

          gsap.to(ref.current, {
            x: xMovement,
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });

        [pillOneRef, pillTwoRef, pillThreeRef].forEach((ref) => {
          if (!ref.current) return;

          gsap.to(ref.current, {
            y: -160,
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="pr-[5%]">
      <div className="mt-[5%] mb-[10%] flex justify-between border-b border-[#efefef] pb-[5%] pl-[5%] max-[577px]:flex-col">
        <div className="left-texts flex w-[20%] flex-col justify-between max-[1023px]:w-[40%] max-[577px]:w-full">
          <h1 style={{ fontSize: "var(--fs55)" }} className="font-antonia z-10">
            Describe what you need
          </h1>

          <p className="text-descriptionText z-10 max-[577px]:my-[5%]">No need to wonder what to ask, Just tell us what kind of form you want, like "client onboarding" or "event RSVP." Al will understand the context and start building in seconds.</p>
        </div>

        <div className="w-[45%] max-[577px]:mt-[5%] max-[577px]:w-full">
          <div ref={movableOneRef} className="movable-element relative rounded-[10px] max-[576px]:mx-auto max-[576px]:w-full">
            <video className="block w-full overflow-hidden rounded-[10px]" loop muted playsInline autoPlay>
              <source src={descriptionOne} />
            </video>

            <div ref={pillOneRef} className="pill absolute top-[50%] left-[-8%] flex h-[40px] w-[90px] items-center justify-center rounded-[50%] bg-[#FF633E] max-[576px]:left-[-4%]">
              <p className="text-[30px] font-normal text-white">01</p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-[10%] flex justify-between border-b border-[#efefef] pb-[5%] pl-[5%] max-[577px]:flex-col max-[577px]:pl-[2%]">
        <div ref={movableTwoRef} className="movable-element w-[45%] max-[577px]:w-full max-[576px]:mx-auto">
          <div className="relative rounded-[10px]">
            <video className="block w-full overflow-hidden rounded-[10px]" loop muted playsInline autoPlay>
              <source src={descriptionTwo} />
            </video>

            <div ref={pillTwoRef} className="pill absolute top-[50%] left-[-8%] flex h-[40px] w-[90px] items-center justify-center rounded-[50%] bg-[#FF633E] max-[576px]:left-[-4%]">
              <p className="text-[30px] font-normal text-white">02</p>
            </div>
          </div>
        </div>

        <div className="left-texts flex w-[20%] flex-col justify-between max-[1023px]:w-[40%] max-[577px]:mt-[5%] max-[577px]:w-full max-[577px]:pl-[2%]">
          <h1 style={{ fontSize: "var(--fs55)" }} className="font-antonia z-10">
            Tweak it. Ask for suggestions, just talk to it
          </h1>

          <p className="text-descriptionText z-10 max-[577px]:mt-[5%]">Al builds a full form instantly with questions, input types, and logic that make sense. Want it shorter? More fun? More detailed? Just ask.</p>
        </div>
      </div>

      {/* SECTION 03 */}
      <div className="my-[10%] flex justify-between pl-[5%] max-[577px]:flex-col">
        <div className="left-texts flex w-[20%] flex-col justify-between max-[1023px]:w-[40%] max-[577px]:mt-[5%] max-[577px]:w-full max-[577px]:pl-[2%]">
          <h1 style={{ fontSize: "var(--fs55)" }} className="font-antonia z-10">
            Share & get insights, built in tracking
          </h1>

          <p className="text-descriptionText z-10 max-[577px]:my-[5%]">Send it out and start collecting responses. Track performance, tone, and engagement and let Al summarize everything for you. No need for third-party link trackers.</p>
        </div>

        <div ref={movableThreeRef} className="movable-element w-[45%] max-[577px]:mt-[5%] max-[577px]:w-full max-[576px]:mx-auto">
          <div className="relative">
            <video className="block w-full overflow-hidden rounded-[10px]" loop muted playsInline autoPlay>
              <source src={descriptionThree} />
            </video>

            <div ref={pillThreeRef} className="pill absolute top-[50%] left-[-8%] flex h-[40px] w-[90px] items-center justify-center rounded-[50%] bg-[#FF633E] max-[576px]:left-[-4%]">
              <p className="text-[30px] font-normal text-white">03</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
