import { forwardRef } from "react";

const CustomInput = forwardRef(function CustomInput(
  {
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    onKeyDown,
    name,
    error,
    disabled = false,
    required = false,
    className = "",
  },
  ref,
) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-lg border px-4 py-2 outline-none
          focus:border-blue-500
          disabled:cursor-not-allowed disabled:bg-gray-100
          ${error ? "border-red-500" : "border-gray-300"}
          ${className}`}
      />

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
});

export default CustomInput;
