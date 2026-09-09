import React from "react";
import Banner from "./banner/Banner";
import About from "./about-section/About";
import AboutBottomText from "../../components/SplitTextComponent";
import Description from "./Description-section/Description";
import CopilotSection from "./copilot-section/CopilotSection";
import SplitTextComponent from "../../components/SplitTextComponent";
import FormsTestimonial from "./forms-looking-section/FormsTestimonial";
import Testimonials from "./testimonal-section/Testimonials";
// import TestimonialLines from "./testimonal-section/TestimonialLines";
import Footer from "./Footer/Footer";
import CustomFonts from "./custom-fonts-section/CustomFonts";
import { TestimonialLines } from "./testimonal-section/TestimonialLines";

const Dashboard = () => {
  return (
    <>
      <Banner />
      <About />
      <SplitTextComponent
        heading={
          <>
            One prompt. One click. A <br />
            complete form in seconds
          </>
        }
        description="No decision making. No need to wonder what questions to ask, just describe what you need, and let AI handle the rest. Customize look, and unlock insights that actually matter."
      />
      <Description />
      <div className="bg-[#f7f7f7]">
        <CopilotSection />
        <FormsTestimonial />
      </div>
      <div className="relative isolate">
        <Testimonials />
        <TestimonialLines className="relative z-[2] -mt-[6vh] max-[1023px]:-mt-[4vh] max-[767px]:-mt-[3vh]" />
      </div>
      <CustomFonts />
      <Footer />
    </>
  );
};

export default Dashboard;
