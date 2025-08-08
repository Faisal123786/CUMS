"use client";
import InputField from "@/app/components/UI/InputField";
import React, { useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { MdHolidayVillage } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import Button from "@/app/components/UI/Button";
import { useParams } from "next/navigation";
import VillageDetail from "@/app/components/client/VillageDetail";

function Page() {
  const [totalDonation, setTotalDonation] = useState(0);
  const maxGoal = 1000;
  const percentage = (totalDonation / maxGoal) * 100;
  const text = `${Math.round(percentage)}%`;
  const { detail } = useParams();
  if (typeof detail !== "string") {
    return <div>Error: Invalid village ID</div>;
  }

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row bg-white p-4 py-1 justify-between items-center rounded-lg gap-3">
        <h1 className="font-semibold flex items-center gap-2 text-lg md:text-xl">
          Village | <MdHolidayVillage className="text-[25px]" /> - Village
          Report
        </h1>
        <div className="relative w-full md:w-auto">
          <Button
            className="bg-[#A49BED] px-4 py-2 rounded-lg"
            label="Get PDF"
            icon=""
            isLoading={false}
            loadingText="Generating"
          />
        </div>
      </div>
      <div className="mt-5">
        <div className="flex flex-col md:flex-row gap-4 w-full items-start">
          <div className="w-full md:w-1/4 min-w-[200px] border border-[#FFFFFF] rounded-md p-4 bg-[#FFFFFF]">
            <VillageDetail id={detail} />
          </div>
          <div className="w-full md:w-[calc(75%-1rem)]">
            <h2 className="mb-2">
              <span className="px-1 rounded-full bg-[#6A6BE4] text-white">
                1
              </span>
              <span className="mx-2 font-bold text-[#6A6BE4] text-[20px]">
                Dashboard
              </span>{" "}
            </h2>
            <div className="border border-[#FFFFFF] rounded-md p-4 bg-[#FFFFFF]">
              <div className="my-3 mb-10 w-full px-4">
                <div className="flex flex-col lg:flex-row justify-center items-start gap-10">
                  <div className="flex flex-col items-center w-full sm:w-auto">
                    <div className="w-24 h-24 mb-3">
                      <CircularProgressbarWithChildren
                        value={percentage}
                        styles={buildStyles({
                          pathColor: "#4caf50",
                          trailColor: "#ddd",
                        })}
                      >
                        <div className="w-[80%] h-[80%] bg-[#FF808B] rounded-full flex flex-col items-center justify-center text-center text-white">
                          <span className="text-xs font-semibold text-white leading-tight">
                            {Math.round(percentage)}%
                          </span>
                          <span className="text-[10px] text-white mt-0.5">
                            This Month
                          </span>
                        </div>
                      </CircularProgressbarWithChildren>
                    </div>
                    <InputField
                      name="currentMonthDonation"
                      type="text"
                      placeholder=""
                      value={`$${totalDonation}`}
                      className="py-1 border border-gray-300 px-4 text-center w-full sm:w-[300px] bg-[#FFFFF7]"
                      label="This Month Donation"
                      labelClassName="text-white bg-green-500"
                    />
                  </div>

                  <div className="flex flex-col items-center w-full sm:w-auto">
                    <div className="w-24 h-24 mb-3">
                      <CircularProgressbarWithChildren
                        value={percentage}
                        styles={buildStyles({
                          pathColor: "red",
                          trailColor: "#ddd",
                        })}
                      >
                        <div className="w-[80%] h-[80%] bg-[#FF808B] rounded-full flex flex-col items-center justify-center text-center text-white">
                          <span className="text-xs font-semibold text-white leading-tight">
                            {Math.round(percentage)}%
                          </span>
                          <span className="text-[10px] text-white mt-0.5">
                            OverAll
                          </span>
                        </div>
                      </CircularProgressbarWithChildren>
                    </div>
                    <InputField
                      name="anotherDonation"
                      type="text"
                      placeholder=""
                      value={`$${totalDonation}`}
                      className="py-1 border border-gray-300 px-4 text-center w-full sm:w-[300px] bg-[#FFFFF7]"
                      label="Total Donation"
                      labelClassName="text-white bg-red-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap md:flex-nowrap gap-4">
                <div className="w-full md:w-1/3 p-1 text-[14px] font-semibold rounded-lg bg-[#6889F6] text-white">
                  TOTAL DONATION
                  <div className="flex justify-between items-center">
                    <div className="animate-arrow-fly">
                      <FaArrowRightLong />
                    </div>
                    <h1 className="text-[16px]">0</h1>
                  </div>
                  <p className="text-xs">Overall Total Donation</p>
                </div>
                <div className="w-full md:w-1/3 p-1 text-[14px] font-semibold rounded-lg bg-[#A1A3D9] text-white">
                  TOTAL DONOR
                  <div className="flex justify-between items-center">
                    <div className="animate-arrow-fly">
                      <FaArrowRightLong />
                    </div>
                    <h1 className="text-[16px]">0</h1>
                  </div>
                  <p className="text-xs">Overall Total Donor</p>
                </div>
                <div className="w-full md:w-1/3 p-1 text-[14px] font-semibold rounded-lg bg-[#FB8892] text-white">
                  TOTAL ACCEPTER
                  <div className="flex justify-between items-center">
                    <div className="animate-arrow-fly">
                      <FaArrowRightLong />
                    </div>
                    <h1 className="text-[16px]">0</h1>
                  </div>
                  <p className="text-xs">Overall Total Accepter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
