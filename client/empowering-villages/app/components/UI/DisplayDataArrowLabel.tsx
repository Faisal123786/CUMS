import React from "react";
import { BsArrowReturnRight } from "react-icons/bs";

interface DisplayDataArrowLabelProps {
  label: string;
  value: string | number;
}

function DisplayDataArrowLabel({ label, value }: DisplayDataArrowLabelProps) {
  return (
    <div className="shadow-md transition-shadow relative inline-block px-3 py-1.5 bg-white rounded-xl leading-tight">
      <span className="block text-[11px] font-medium text-gray-500 tracking-wide uppercase leading-none">
        {label}
      </span>

      <div className="mt-0.5 flex items-center gap-1">
        <BsArrowReturnRight className="text-text" size={14} />
        <span className="text-text font-semibold text-sm leading-none">{value}</span>
      </div>
    </div>
  );
}

export default DisplayDataArrowLabel;
