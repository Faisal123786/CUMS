"use client";

import React from "react";

interface LoaderProps {
  text?: string;
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ text = "Loading...", size = 10 }) => {
  return (
    <div className="flex justify-center items-center mt-10 w-full">
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-t-4 border-blue-500 border-solid`}
      />
      <span className="ml-3 text-blue-500 font-semibold">{text}</span>
    </div>
  );
};

export default Loader;
