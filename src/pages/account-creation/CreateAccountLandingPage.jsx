import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import DecorativeSvg from "./DecorativeSvg";
import StepProgress from "./StepProgress";
import StepForm from "./StepForm";
import accountSteps from "./accountSteps";
import { useNavigate } from "react-router-dom";

const CreateAccountLandingPage = () => {
  const wrapperRef = useRef(null);
  const svgRef = useRef(null);
  const cardRef = useRef(null);
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [otherValue, setOtherValue] = useState("");
  useGSAP(
    () => {
      const timeline = gsap.timeline();
      gsap.set(svgRef.current, {
        scale: 0.1,
        opacity: 0,
      });
      gsap.set(cardRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.96,
      });
      timeline
        .to(svgRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        })
        .to(svgRef.current, {
          scale: 9,
          opacity: 0.35,
          duration: 1.2,
          ease: "power3.inOut",
        })
        .to(
          cardRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5",
        );
    },
    {
      scope: wrapperRef,
    },
  );

  const handleSelect = (option) => {
    setAnswers((previous) => ({
      ...previous,
      [activeStep]: option,
    }));
  };

  const handleStepChange = (swiper) => {
    const index = swiper.activeIndex;

    setActiveStep(index);

    const colors = ["#ec8db4", "#ff6547", "#f4479a", "#ff9d82"];

    gsap.to(svgRef.current, {
      color: colors[index],
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleNext = () => {
    if (!swiperRef.current) return;

    const isLastStep = activeStep === accountSteps.length - 1;

    if (isLastStep) {
      handleSave();
      return;
    }

    swiperRef.current.slideNext();
  };

  const handleBack = () => {
    if (!swiperRef.current) return;

    swiperRef.current.slidePrev();
  };

  const handleSave = () => {
    const accountData = {
      ...answers,
      otherRole: otherValue,
    };

    console.log("Account Data:", accountData);

    navigate("/signup");
  };

  const selectedAnswer = answers[activeStep];

  return (
    <main ref={wrapperRef} className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white">
      <DecorativeSvg svgRef={svgRef} />

      <div ref={cardRef} className="relative z-10 w-[40%] max-w-[calc(100vw-32px)] rounded-[20px] bg-white px-[36px] pt-[35px] pb-[35px] shadow-[0_15px_45px_rgba(0,0,0,0.10)] max-[769px]:w-[55%] max-[577px]:w-[85%]">
        <StepProgress totalSteps={accountSteps.length} activeStep={activeStep} />

        <StepForm steps={accountSteps} answers={answers} activeStep={activeStep} swiperRef={swiperRef} otherValue={otherValue} setOtherValue={setOtherValue} onSelect={handleSelect} onStepChange={handleStepChange} />

        <div className="mt-0 flex items-center justify-between">
          {activeStep > 0 ? (
            <button type="button" onClick={handleBack} className="flex items-center gap-[7px] text-[16px] text-[#aaa] transition-colors duration-200 hover:text-black">
              <span className="text-[25px] leading-none">‹</span>

              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <button type="button" disabled={!selectedAnswer} onClick={handleNext} className={`mt-[8%] rounded-full px-[35px] py-[10px] text-[15px] font-medium transition-all duration-300 max-[769px]:mt-[5%] max-[769px]:px-[14px] max-[769px]:py-[5px] max-[769px]:text-[14px] ${selectedAnswer ? "bg-[#ff6547] text-white hover:scale-[1.03] hover:bg-[#ff593d]" : "cursor-not-allowed bg-[#ddd] text-[#aaa]"} `}>
            {activeStep === accountSteps.length - 1 ? "Save" : "Next"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default CreateAccountLandingPage;
