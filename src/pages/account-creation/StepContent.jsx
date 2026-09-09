import StepOption from "./StepOption";

const StepContent = ({
  title,
  options,
  selected,
  onSelect,
  showOtherInput = false,
  otherValue,
  setOtherValue,
}) => {
  return (
    <div>
      <h1
        style={{ fontSize: "var(--fs50)" }}
        className="
          mb-[18px]
          max-w-[520px]
          font-serif
         
          font-normal
          leading-[1.15]
          tracking-[-1px]
          text-[#111]
          max-[768px]:text-[20px]!
        "
      >
        {title}
      </h1>

      <div className="flex flex-col gap-[10px]">
        {options.map((option) => (
          <StepOption
            key={option}
            option={option}
            selected={selected}
            onSelect={onSelect}
            showOtherInput={showOtherInput}
            otherValue={otherValue}
            setOtherValue={setOtherValue}
          />
        ))}
      </div>
    </div>
  );
};

export default StepContent;
