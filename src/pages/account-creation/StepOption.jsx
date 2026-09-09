const StepOption = ({
  option,
  selected,
  onSelect,
  showOtherInput,
  otherValue,
  setOtherValue,
}) => {
  const isSelected = selected === option;
  const isOther = option === "Other";

  return (
    <div
      onClick={() => onSelect(option)}
      className={`
        flex
       py-[2%]
        w-full
        cursor-pointer
        items-center
        gap-[14px]
        rounded-[10px]
        border
        px-[18px]
        transition-all
        duration-200

        ${
          isSelected
            ? "border-[#ff6547] bg-[#fff8f6]"
            : "border-[#dedede] bg-white hover:border-[#bbb]"
        }
      `}
    >
      <span
        className={`
          flex
          h-[19px]
          w-[19px]
          shrink-0
          items-center
          justify-center
          rounded-full
          border-2

          ${isSelected ? "border-[#ff6547]" : "border-[#ccc]"}
        `}
      >
        {isSelected && (
          <span
            className="
              h-[9px]
              w-[9px]
              rounded-full
              bg-[#ff6547]
            "
          />
        )}
      </span>

      <span className="text-[16px] text-[#222] max-[769px]:text-[14px]">
        {option}
      </span>

      {isOther && showOtherInput && isSelected && (
        <input
          type="text"
          value={otherValue}
          onChange={(e) => setOtherValue(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          placeholder="Please specify"
          className="
              ml-auto
              h-[40px]
              w-[270px]
              rounded-[9px]
              border
              border-[#ddd]
              bg-white
              px-[12px]
              text-[15px]
              text-[#222]
              outline-none
              transition-colors
              placeholder:text-[#999]
              focus:border-[#ff6547]
            "
        />
      )}
    </div>
  );
};

export default StepOption;
