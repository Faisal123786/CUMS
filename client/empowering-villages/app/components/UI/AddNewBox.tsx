"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa"; 

interface AddNewBoxProps {
  path: string;
}
function AddNewBox({ path }: AddNewBoxProps) {

  const router = useRouter();
  const redirect = () => {
  router.push(path);
  }
  return (
    <div
      className=" border-blue-600 border-dotted border-2 rounded-xl p-4 bg-white h-40 shadow-sm flex flex-col items-center w-full sm:w-44 justify-center cursor-pointer"
      onClick={redirect}
    >
      <FaPlus size={30} className="text-blue-500 font-semibold" />
      <h1 className="text-blue-500">Add New</h1>
    </div>
  );
}

export default AddNewBox;
