import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import StepContent from "./StepContent";

const StepForm = ({
  steps,
  answers,
  activeStep,
  swiperRef,
  otherValue,
  setOtherValue,
  onSelect,
  onStepChange,
}) => {
  return (
    <Swiper
      allowTouchMove={false}
      autoHeight={true}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      onSlideChange={onStepChange}
    >
      {steps.map((step, index) => (
        <SwiperSlide key={step.id}>
          <StepContent
            title={step.title}
            options={step.options}
            selected={answers[index]}
            onSelect={onSelect}
            showOtherInput={index === 1}
            otherValue={otherValue}
            setOtherValue={setOtherValue}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default StepForm;
