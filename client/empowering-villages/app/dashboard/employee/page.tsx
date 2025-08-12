import React from "react";
import { FaUserGroup } from "react-icons/fa6";
import EmployeeList from "@/app/components/client/EmployeeList";

function Page() {
  return (
    <div className="p-4">
       <div>
        <h2 className=" font-bold text-2xl text-text">All Employees</h2>
        <p>Here you can see all employee list.</p>
      </div>
      <EmployeeList />
    </div>
  );
}

export default Page;
