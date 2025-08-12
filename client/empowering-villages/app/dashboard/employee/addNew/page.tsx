import EmployeeForm from "@/app/components/client/EmployeeForm";
import Button from "@/app/components/UI/Button";
import React from "react";
import { CiImport } from "react-icons/ci";
import { FaUserGroup } from "react-icons/fa6";

function page() {
  
  return (
    <div className="p-4">
      <div >
       <h2 className=" font-bold text-2xl text-text">Add New Employee</h2>
        <p>Here you can add new employee.</p>
      </div>

      <div>
        <h1 className="font-bold text-xl text-center text-text">
          Employee Form
        </h1>
        <div className="flex items-center justify-center gap-2">
          <span className="inline-flex w-6 h-2 bg-text p-1 rounded-sm"></span>
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
