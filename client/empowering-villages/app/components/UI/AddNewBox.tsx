"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";

interface AddNewBoxProps {
  path: string;
}
function AddNewBox({ path }: AddNewBoxProps) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user) as any;

  const redirect = () => {
    router.push(path);
  };
  if (user?.role !== "Admin") return null;
  return (
    <div
      className=" border-text border-dotted border-2 rounded-xl p-4 bg-white h-40 shadow-sm flex flex-col items-center w-full sm:w-44 justify-center cursor-pointer"
      onClick={redirect}
    >
      <FaPlus size={30} className="text-text font-semibold" />
      <h1 className="text-text">Add New</h1>
    </div>
  );
}

export default AddNewBox;
