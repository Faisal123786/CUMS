"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DisplayDataArrowLabel from "../UI/DisplayDataArrowLabel";
import { getVillageDetailById } from "@/app/services/villageService";
import Loader from "../UI/Loader";

function VillageDetail({ id }: { id: string }) {
  const [villageInfo, setVillageInfo] = useState<any[]>([]);
  const [moderatorInfo, setModeratorInfo] = useState<any[]>([]);
  const [area, setArea] = useState<any>(null);
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVillage = async () => {
      try {
        setLoading(true);
        const response = await getVillageDetailById(id);
        const data = response?.data;

        if (!data) return;

        const areaData = data.area;
        const userData = data.user?.[0];
        const userWallet = data.wallet;
        setArea(areaData);

        setVillageInfo([
          { label: "Name Of Village", value: areaData?.name || "" },
          { label: "District Of Village", value: areaData?.district || "" },
          { label: "Tehsil Of Village", value: areaData?.tehsil || "" },
          { label: "Postal Code", value: areaData?.postalCode || "" },
          { label: "Location Of Village", value: areaData?.location || "" },
        ]);

        if (userData) {
          setModeratorInfo([
            { label: "Employee ID", value: userData._id || "" },
            { label: "Name Of Employee", value: userData.name || "" },
            { label: "Employee Email", value: userData.email || "" },
            { label: "Employee Role", value: userData.role || "" },
          ]);
        }

        if (userWallet) {
          setWallet([
            { label: "Wallet ID", value: userWallet._id || "" },
            { label: "Total Balance", value: userWallet.balance || 0 },
          ]);
        }
      } catch (error) {
        console.error("Error fetching village detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVillage();
  }, [id]);

  if (loading) {
    return <Loader text="Data Loading..." />;
  }

  return (
    <div>
      <div className="flex justify-center flex-col items-center">
        <div className="w-[120px] h-[120px] rounded-full overflow-hidden border border-[#EBEBEB] flex items-center justify-center">
          {area?.image ? (
            <Image
              src={`/uploads/${area.image}`}
              alt="villageImage"
              width={120}
              height={120}
              className="object-cover"
            />
          ) : (
            <Image
              src="/default.png"
              alt="default"
              width={120}
              height={120}
              className="object-cover"
            />
          )}
        </div>
        <h2 className="font-bold text-[20px] text-[#8E5EF0] mt-2">
          {area?.name || "Village"}
        </h2>
      </div>

      <div className="bg-[#F6F7FB] p-3 pt-2 mt-5 rounded-md">
        <div className="space-y-2">
          {villageInfo.map((item, index) => (
            <div key={index}>
              <DisplayDataArrowLabel label={item.label} value={item.value} />
            </div>
          ))}
        </div>
      </div>

      {moderatorInfo.length > 0 && (
        <div className="p-3 rounded-md">
          <div className="space-y-2">
            {moderatorInfo.map((item, index) => (
              <div key={index}>
                <DisplayDataArrowLabel label={item.label} value={item.value} />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="bg-[#F6F7FB] p-3 pt-2 mt-5 rounded-md">
        <div className="space-y-2">
          {wallet.map((item, index) => (
            <div key={index}>
              <DisplayDataArrowLabel label={item.label} value={item.value} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VillageDetail;
