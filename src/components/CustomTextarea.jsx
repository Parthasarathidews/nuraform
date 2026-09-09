import React from "react";

const CustomTextarea = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  error,
  disabled = false,
  required = false,
  className = "",
  ...props
}) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        required={required}
        className={`
          w-full resize-none rounded-lg border bg-white
          px-4 py-3 text-sm text-gray-900
          outline-none transition-all duration-200
          placeholder:text-gray-400
          disabled:cursor-not-allowed disabled:bg-gray-100
          border-transparent
          ${
            error
              ? " focus:border-red-500 focus:ring-2 focus:ring-transparent"
              : " focus:border-[#ff633e] focus:ring-2 focus:ring-transparent"
          }
          ${className}
        `}
        {...props}
      />

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default CustomTextarea;
