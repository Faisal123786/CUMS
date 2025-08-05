"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import AddNewBox from "@/app/components/UI/AddNewBox";
import { getAllvillages } from "@/app/services/villageService";
import Loader from "../UI/Loader";

export default function VillagesList() {
  const [villages, setVillages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true); // default true

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
      {villages.map((village) => (
        <div
          key={village._id}
          className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm w-full sm:w-44 flex flex-col items-center"
        >
          <div className="w-[80px] h-[80px] rounded-full overflow-hidden border border-[#EBEBEB] flex items-center justify-center">
            <Image
              src={`/uploads/${village.image}`}
              alt="villageImage"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>

          <span className="text-xs mt-0">{village.name}</span>
          <span className="text-sm font-semibold text-gray-500">
            {village.nearerCity}
          </span>
          <div className="flex justify-center items-center gap-2 mt-3">
            <button className="p-2 rounded-full bg-[#A2A4D9] text-white">
              <IoIosSearch size={12} />
            </button>
            <button className="p-2 rounded-full bg-[#698AF6] text-white">
              <FaEdit size={12} />
            </button>
            <button className="p-2 rounded-full bg-[#F98A94] text-white">
              <FaTrash size={12} />
            </button>
          </div>
        </div>
      ))}
      <AddNewBox path="/dashboard/villages/addNew" />
    </div>
  );
}
