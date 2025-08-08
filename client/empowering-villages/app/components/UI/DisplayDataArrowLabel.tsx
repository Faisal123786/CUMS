import React from "react";
import { BsArrowReturnRight } from "react-icons/bs";

interface DisplayDataArrowLabelProps {
  label: string;
  value: string | number;
}

function DisplayDataArrowLabel({ label, value }: DisplayDataArrowLabelProps) {
  return (
    <div className="inline-block relative text-right">
      <span className="text-[10px] text-[#6A6BE4] border-b border-[#6A6BE4] block leading-none">
        {label}
      </span>
      <div className="absolute left-0 top-full mt-[-3px] flex items-center gap-1 w-max">
        <BsArrowReturnRight className="text-[#6A6BE4]" size={18} />
        <span className="text-blue-600 font-bold text-xs">{value}</span>
      </div>
    </div>
  );
}

export default DisplayDataArrowLabel;
