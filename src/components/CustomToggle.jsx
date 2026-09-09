import { useState } from "react";

const CustomToggle = ({ enabled: controlledEnabled, onChange }) => {
  const [internalEnabled, setInternalEnabled] = useState(false);

  const enabled =
    controlledEnabled !== undefined ? controlledEnabled : internalEnabled;

  const handleClick = () => {
    const newValue = !enabled;
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalEnabled(newValue);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative flex h-8 w-[100px] cursor-pointer items-center rounded-full px-1 text-xs font-semibold transition-colors duration-300 ${
        enabled ? "bg-[#FF633E]" : "bg-[#F0F0F0]"
      }`}
      aria-pressed={enabled}
    >
      <span
        className={`absolute left-3 text-[9px] transition-colors duration-300 ${
          enabled ? "text-white" : "text-gray-600"
        }`}
      >
        NO
      </span>

      <span
        className={`absolute right-3 text-[9px] transition-colors duration-300 ${
          enabled ? "text-white" : "text-gray-600"
        }`}
      >
        YES
      </span>

      <span
        className={`absolute top-1 flex h-6 w-[42px] items-center justify-center rounded-full bg-white text-[9px] font-bold text-gray-700 shadow-md transition-transform duration-300 ${
          enabled ? "translate-x-[52px]" : "translate-x-0"
        }`}
      >
        {enabled ? "YES" : "NO"}
      </span>
    </button>
  );
};

export default CustomToggle;
