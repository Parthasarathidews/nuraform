import { useRef } from "react";
import SplitTextComponent from "../../../components/SplitTextComponent";
import formTestiminialThree from "../../../assets/videos/t7.mp4";
import formTestiminialOne from "../../../assets/videos/t5.mp4";
import formTestiminialTwo from "../../../assets/images/t6.webp";
import CustomImage from "../../../components/CustomImage";
import "./formsLooking.css";
const FormsTestimonial = () => {
  const videoOneRef = useRef(null);
  const videoThreeRef = useRef(null);

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
    <>
      <div className="mb-[8%] border border-t border-[#F1F1F1] w-[95%] mx-auto"></div>
      <p
        className="text-center text-[#ff6642] max-[577px]:px-[5%] max-[577px]:text-[14px]!"
        style={{ fontSize: "var(--fs20)" }}
      >
        Forms so good-looking, they feel like a mini website.
      </p>

      <SplitTextComponent
        heading={
          <p className="whitespace-nowrap max-[577px]:whitespace-normal max-[577px]:my-[5%]">
            Converts Like a Landing Page, <br className="max-[577px]:hidden" />
            Feels Like a Chat
          </p>
        }
        description="Not just good-looking. High-performing too! Every Nuraform form is crafted to feel premium-and convert better."
      />

      <div
        className="
    flex
    gap-[5%]
    pl-[3%]
    mt-[7%]
    pb-[8%]

    max-[579px]:overflow-x-auto
    max-[579px]:pr-[3%]
    max-[579px]:gap-[5%]
  "
      >
        <div
          className="
      w-[30%]
      flex-none

      max-[579px]:w-[90%]
    "
        >
          <video
            ref={videoOneRef}
            className="
        w-full
        shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]
        rounded-[10px]
        overflow-hidden
      "
            loop
            muted
            playsInline
            onMouseEnter={() => handleVideoMouseEnter(videoOneRef)}
            onMouseLeave={() => handleVideoMouseLeave(videoOneRef)}
          >
            <source src={formTestiminialOne} />
          </video>

          <h1 style={{ fontSize: "var(--fs33)" }} className="mt-[5%]">
            Custom branding and redirection after form completion
          </h1>
        </div>

        <div
          className="
      w-[30%]
      flex-none

      max-[579px]:w-[90%]
    "
        >
          <div
            className="
        w-full
        shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]
        rounded-[10px]
        overflow-hidden
      "
          >
            <CustomImage src={formTestiminialTwo} />
          </div>

          <h1 style={{ fontSize: "var(--fs33)" }} className="mt-[5%]">
            Custom layouts and backgrounds, more to come
          </h1>
        </div>

        <div
          className="
      w-[30%]
      flex-none

      max-[579px]:w-[90%]
    "
        >
          <video
            ref={videoThreeRef}
            className="
        w-full
        shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]
        rounded-[10px]
        overflow-hidden
      "
            loop
            muted
            playsInline
            onMouseEnter={() => handleVideoMouseEnter(videoThreeRef)}
            onMouseLeave={() => handleVideoMouseLeave(videoThreeRef)}
          >
            <source src={formTestiminialThree} />
          </video>

          <h1 style={{ fontSize: "var(--fs33)" }} className="mt-[5%]">
            Animated Intro & Outro screens to captivate & immerse the viewers
          </h1>
        </div>
      </div>
    </>
  );
};

export default FormsTestimonial;
