"use client";
import React from "react";
import Spinner from "./Spinner";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
  isLoading: boolean;
  loadingText: string;
  icon: any;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className = "",
  type = "button",
  isLoading = false,
  loadingText = 'Loading',
  icon = '',
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`rounded text-white transition flex items-center gap-2 ${className}`}
      type={type}
    >
      {icon}
      {isLoading ? (
        <div className="flex items-center gap-2 justify-center">
          <span>{loadingText}...</span>
          <Spinner />
        </div>
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
