import React from "react";

const Input = ({
  className = "",
  error = false,
  disabled = false,
  ...props
}) => {
  return (
    <input
      disabled={disabled}
      className={`
        w-full px-5 py-3 text-sm rounded-xl
        bg-surface/30 text-white
        border transition-all duration-300
        placeholder:text-gray-500

        focus:outline-none focus:ring-2 focus:ring-primary/30
        focus:border-primary/40

        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${error ? "border-red-500/40 focus:ring-red-500/30" : "border-white/5"}

        ${className}
      `}
      {...props}
    />
  );
};

export default Input;
