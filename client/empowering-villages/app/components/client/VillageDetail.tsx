"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import DisplayDataArrowLabel from "../UI/DisplayDataArrowLabel";
import { getVillageDetailById } from "@/app/services/villageService";
import Loader from "../UI/Loader";

function VillageDetail({ id }: { id: string }) {
  const [villageInfo, setVillageInfo] = useState<any[]>([]);
  const [moderatorInfo, setModeratorInfo] = useState<any[]>([]);
  const [area, setArea] = useState<any>(null);
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Multiple-open accordion state
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

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

  const Section = ({
    title,
    sectionKey,
    children,
  }: {
    title: string;
    sectionKey: string;
    children: React.ReactNode;
  }) => {
    const isOpen = openSections.includes(sectionKey);
    return (
      <div
        className={`transition-colors ${
          isOpen ? "bg-gradient-to-r from-blue-50 to-white" : "bg-white"
        }`}
      >
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex justify-between items-center w-full py-4 px-4 text-left font-semibold text-gray-800 hover:text-text transition-colors"
        >
          {title}
          <IoChevronDown
            className={`text-xl transition-transform duration-500 ${
              isOpen ? "rotate-180 text-text" : ""
            }`}
          />
        </button>
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isOpen ? "max-h-[1000px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
          }`}
        >
          <div className="p-4 flex flex-wrap items-center gap-2">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden ">
      <div className="p-4">
        <div className="w-full h-[160px] rounded-xl overflow-hidden border border-gray-200 relative shadow-sm">
          {area?.image ? (
            <Image
              src={`/uploads/${area.image}`}
              alt="villageImage"
              fill
              className="object-cover object-center transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <Image
              src="/default.png"
              alt="default"
              fill
              className="object-cover object-center"
            />
          )}
        </div>
        <h2 className="font-medium text-lg text-gray-800 mt-3">
          <span className="font-bold text-text">Name:</span> {area?.name || "Village"}
        </h2>
      </div>

      <Section sectionKey="village" title="Village Information">
        {villageInfo.map((item, index) => (
          <DisplayDataArrowLabel key={index} label={item.label} value={item.value} />
        ))}
      </Section>

      {moderatorInfo.length > 0 && (
        <Section sectionKey="employee" title="Employee Information">
          {moderatorInfo.map((item, index) => (
            <DisplayDataArrowLabel key={index} label={item.label} value={item.value} />
          ))}
        </Section>
      )}

      {wallet && (
        <Section sectionKey="wallet" title="Wallet Information">
          {wallet.map((item, index) => (
            <DisplayDataArrowLabel key={index} label={item.label} value={item.value} />
          ))}
        </Section>
      )}
    </div>
  );
}

export default VillageDetail;
