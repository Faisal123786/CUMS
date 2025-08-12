import React from "react";
import { GiVillage } from "react-icons/gi";
import VillagesList from "@/app/components/client/VillageList";

function Page() {
  return (
    <div className="p-4">
      <div>
        <h2 className=" font-bold text-2xl text-text">All Villages</h2>
        <p>Here you can see all villages list.</p>
      </div>
      <VillagesList />
    </div>
  );
}

export default Page;
