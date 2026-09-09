import { useRef } from "react";
import copilotVideoOne from "../../../assets/videos/copiolit.mp4";
import copilotVideoFour from "../../../assets/videos/t4.mp4";
import copilotThree from "../../../assets/images/t3.png";
import copilotTwo from "../../../assets/images/t2.png";
import CustomImage from "../../../components/CustomImage";
import SplitTextComponent from "../../../components/SplitTextComponent";

const CopilotSection = () => {
  const videoOneRef = useRef(null);
  const videoFourRef = useRef(null);

  const handleVideoMouseEnter = (ref) => {
    if (ref.current) {
      ref.current.play();
    }
  };

  const handleVideoMouseLeave = (ref) => {
    if (ref.current) {
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  };

  return (
    <div className="py-[8%]">
      <div className="">
        <p className="text-[#FF633E] font-medium text-center">
          Co-pilot for form creation.
        </p>
        <SplitTextComponent
          heading={
            <p className="whitespace-nowrap max-[577px]:whitespace-normal">
              Intelligence that saves you time
            </p>
          }
          description=" Al that works behind the scenes, so you don't have to, from one click
          form generation to Al summaries. Available on free plan, because your
          time is precious"
        />
      </div>

      <div className="w-full overflow-x-auto flex  scrollbar-hide mt-[5%] pl-[3%]">
        <div className="w-[45%] shrink-0 max-[576px]:w-[90%]">
          <video
            ref={videoOneRef}
            loop
            muted
            playsInline
            className="w-[90%] rounded-[15px] overflow-hidden mr-auto"
            onMouseEnter={() => handleVideoMouseEnter(videoOneRef)}
            onMouseLeave={() => handleVideoMouseLeave(videoOneRef)}
          >
            <source src={copilotVideoOne} />
          </video>
          <h1
            style={{ fontSize: "var(--fs32)" }}
            className="w-[80%] mr-auto mt-[3%] max-[577px]:text-[12px]!"
          >
            3 simple modes to help you brainstorm, add, or refine questions with
            Al.
          </h1>
        </div>

        <div className="w-[45%] shrink-0 max-[576px]:w-[90%]">
          <div className="w-[90%] rounded-[15px] overflow-hidden mr-auto">
            <CustomImage src={copilotTwo} alt="copilot testimonial" />
          </div>
          <h1
            style={{ fontSize: "var(--fs32)" }}
            className="w-[80%] mr-auto mt-[3%] max-[577px]:text-[12px]!"
          >
            Al-powered summaries per submission and per form
          </h1>
        </div>

        <div className="w-[45%] shrink-0 max-[576px]:w-[90%]">
          <div className="w-[90%] rounded-[15px] overflow-hidden mr-auto">
            <CustomImage src={copilotThree} alt="copilot testimonial" />
          </div>
          <h1
            style={{ fontSize: "var(--fs32)" }}
            className="w-[80%] mr-auto mt-[3%] max-[577px]:text-[12px]!"
          >
            Live analytics - views, drop-off rate, time spent & more
          </h1>
        </div>

        <div className="w-[45%] shrink-0 max-[576px]:w-[90%]">
          <video
            ref={videoFourRef}
            loop
            muted
            playsInline
            className="w-[90%] rounded-[15px] overflow-hidden mx-auto"
            onMouseEnter={() => handleVideoMouseEnter(videoFourRef)}
            onMouseLeave={() => handleVideoMouseLeave(videoFourRef)}
          >
            <source src={copilotVideoFour} />
          </video>
          <h1
            style={{ fontSize: "var(--fs32)" }}
            className="w-[80%] mr-auto mt-[3%] max-[577px]:text-[12px]!"
          >
            Auto-generated follow-up questions for deeper insights
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CopilotSection;
