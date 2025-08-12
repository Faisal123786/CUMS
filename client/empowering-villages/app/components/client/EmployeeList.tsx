"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaEdit, FaTrash, FaLock } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import AddNewBox from "@/app/components/UI/AddNewBox";
import Loader from "../UI/Loader";
import { useRouter } from "next/navigation";
import { getAllEmployee } from "@/app/services/employeeService";
export default function VillagesList() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setIsLoading(true);
        const response = await getAllEmployee();
        setEmployees(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch Employee", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployee();
  }, []);

  if (isLoading) {
    return <Loader text="Loading Employees..." />;
  }

  return (
    <div className="mt-6 flex flex-wrap gap-5 justify-start">
      {employees?.map((employees) => {
        return (
          <div
            key={employees?._id}
            className="relative shadow-xl border border-gray-200 rounded-lg p-2 bg-white w-full sm:w-44 flex flex-col items-center min-h-56 min-w-52"
          >
            <div className="w-full h-[150px] rounded-lg overflow-hidden relative">
              {employees?.image ? (
                <Image
                  src={`/uploads/${employees?.image}`}
                  alt="employeeImage"
                  fill
                  className="object-cover object-center"
                />
              ) : (
                <Image
                  src={`/uploads/avatar-659652_1280.webp`}
                  alt="employeeImage"
                  fill
                  className="object-cover object-center"
                />
              )}
            </div>

            <span className="text-xs my-2">{employees?.name}</span>

            <div className="flex justify-center items-center gap-2">
              <button
                className="p-2 rounded-md bg-[#A2A4D9] text-white"
                title="View Details"
              >
                <IoIosSearch
                  size={12}
                  onClick={() => router.push(`villages/${employees?._id}`)}
                />
              </button>

              <button
                className="p-2 rounded-md bg-[#698AF6] text-white"
                title="Edit"
              >
                <FaEdit size={12} />
              </button>
              <button
                className="p-2 rounded-md bg-[#F98A94] text-white"
                title="Delete"
              >
                <FaTrash size={12} />
              </button>
            </div>
          </div>
        );
      })}

      <AddNewBox path="/dashboard/employee/addNew" />
    </div>
  );
}
