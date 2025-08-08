import EmployeeForm from "@/app/components/client/EmployeeForm";
import Button from "@/app/components/UI/Button";
import React from "react";
import { CiImport } from "react-icons/ci";
import { FaUserGroup } from "react-icons/fa6";

function page() {
  
  return (
    <div>
      <div className="flex bg-[#FFFFFF] p-3 justify-between items-center rounded-lg">
        <h1 className="font-semibold flex items-center gap-2">
          employees | <FaUserGroup className="text-[25px]" /> - Add New
        </h1>
        <span>
          <Button
            label="Import employees"
            type="submit"
            className="rounded-full w-fit bg-[#F77865] px-10 py-2 text-white"
            loadingText="Import Villages"
            icon={<CiImport />}
            isLoading={false}
          />
        </span>
      </div>

      <div>
        <h1 className="font-bold text-[30px] text-center mt-4">
          Employees Form
        </h1>
        <div className="flex items-center justify-center gap-2">
          <span className="inline-flex w-6 h-2 bg-[#646FE4] p-1 rounded-sm"></span>
          <span className="text-xs">Required*</span>
          <span className="inline-flex w-6 h-2 bg-gray-400 p-1 rounded-sm"></span>
          <span className="text-xs">Optional*</span>
        </div>
      </div>

      <div className="my-5">
        <EmployeeForm />
      </div>
    </div>
  );
}

export default page;
