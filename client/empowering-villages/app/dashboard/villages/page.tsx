import React from "react";
import { GiVillage } from "react-icons/gi";
import VillagesList from "@/app/components/client/VillageList";

function Page() {
  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row bg-white p-4 py-1 justify-between items-center rounded-lg gap-3">
        <h1 className="font-semibold flex items-center gap-2 text-lg md:text-xl">
          Villages | <GiVillage className="text-[25px]" /> - All Villages
        </h1>
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search villages..."
            className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#646FE4] w-full md:w-72"
          />
        </div>
      </div>
      <VillagesList />
    </div>
  );
}

export default Page;
