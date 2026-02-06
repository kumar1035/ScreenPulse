import React from "react";

const Card = ({
  children,
  className = "",
  hover = true,
  padding = "p-6",
  ...props
}) => {
  return (
    <div
      className={`
        bg-gradient-to-b from-surface/50 to-surface/30
        backdrop-blur-sm border border-white/5
        rounded-2xl shadow-lg
        transition-all duration-300 ease-out
        ${hover ? "hover:-translate-y-1 hover:shadow-xl" : ""}
        ${padding}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
