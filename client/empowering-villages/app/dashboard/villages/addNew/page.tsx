import VillageForm from "@/app/components/client/VillageForm";
import Button from "@/app/components/UI/Button";
import React from "react";
import { CiImport } from "react-icons/ci";
import { GiVillage } from "react-icons/gi";

function page() {
  return (
    <div className="p-4">
      <div>
        <h2 className=" font-bold text-2xl text-text">Add New Village</h2>
        <p>Here you can add new village.</p>
      </div>

      <div>
        <h1 className="font-bold text-xl text-center text-text">
          Village Form
        </h1>
        <div className="flex items-center justify-center gap-2">
          <span className="inline-flex w-6 h-2 bg-background p-1 rounded-sm"></span>
          <span className="text-xs">Required*</span>
          <span className="inline-flex w-6 h-2 bg-gray-400 p-1 rounded-sm"></span>
          <span className="text-xs">Optional*</span>
        </div>
      </div>

      <div className="my-5">
        <VillageForm />
      </div>
    </div>
  );
}

export default page;
