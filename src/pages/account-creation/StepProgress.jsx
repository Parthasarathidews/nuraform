const StepProgress = ({ totalSteps, activeStep }) => {
  return (
    <div className="mb-[5%] flex w-full gap-[10px]">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`
            h-[4px]
            flex-1
            rounded-full
            transition-all
            duration-500
            ease-out
            ${index <= activeStep ? "bg-[#ff6547]" : "bg-[#dedede]"}
          `}
        />
      ))}
    </div>
  );
};

export default StepProgress;
