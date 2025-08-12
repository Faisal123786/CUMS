"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaEdit, FaTrash, FaLock } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import AddNewBox from "@/app/components/UI/AddNewBox";
import { getAllvillages } from "@/app/services/villageService";
import Loader from "../UI/Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import { useRouter } from "next/navigation";
export default function VillagesList() {
  const [villages, setVillages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user) as any;
  const router = useRouter();

  useEffect(() => {
    const fetchVillages = async () => {
      try {
        setIsLoading(true);
        const response = await getAllvillages();
        setVillages(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch villages", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVillages();
  }, []);

  if (isLoading) {
    return <Loader text="Loading Villages..." />;
  }

  return (
    <div className="mt-6 flex flex-wrap gap-5 justify-start">
      {villages?.map((village) => {
        const isLocked =
          user?.role !== "Admin" &&
          !(
            user?.role === "Employee" &&
            user?.id?.toString() === village?.employee_id?.toString()
          );

        return (
          <div
            key={village?._id}
            className="relative shadow-xl border border-gray-200 rounded-lg p-2 bg-white w-full sm:w-44 flex flex-col items-center min-h-56 min-w-52"
          >
            <div className="w-full h-[150px] rounded-lg overflow-hidden relative">
              <Image
                src={`/uploads/${village?.image}`}
                alt="villageImage"
                fill
                className="object-cover object-center"
              />
            </div>

            <span className="text-xs my-2">{village?.name}</span>
           

            <div className="flex justify-center items-center gap-2">
              <button
                className="p-2 rounded-md bg-[#A2A4D9] text-white"
                title="View Details"
              >
                <IoIosSearch
                  size={12}
                  onClick={() => router.push(`villages/${village?._id}`)}
                />
              </button>
              {user?.role === "Admin" && (
                <>
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
                </>
              )}
            </div>

            {isLocked && (
              <div className="absolute inset-0 bg-[#364049] bg-opacity-60 rounded-xl flex items-center justify-center cursor-pointer">
                <FaLock className="text-white text-2xl" />
              </div>
            )}
          </div>
        );
      })}

      <AddNewBox path="/dashboard/villages/addNew" />
    </div>
  );
}
