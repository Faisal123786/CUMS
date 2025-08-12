"use client";

import { HiMiniUsers } from "react-icons/hi2";
import { HiUserGroup } from "react-icons/hi";
import { MdHolidayVillage } from "react-icons/md";
import { FaUserTie } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { gatAllStatsCount } from "@/app/services/employeeService";
import VillageDetail from "../client/VillageDetail";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import InputField from "../UI/InputField";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardStats() {
  const [totalDonation, setTotalDonation] = useState(530);
  const maxGoal = 1000;
  const percentage = (totalDonation / maxGoal) * 100;
  const text = `${Math.round(percentage)}%`;

  const user = useSelector((state: RootState) => state.auth.user) as {
    role: string;
    name: string;
  } | null;
  const [statCount, setStatCount] = useState({
    acceptersCount: 0,
    donorsCount: 0,
    employeesCount: 0,
    villageCount: 0,
  });
  let stats: { label: string; icon: any; count: number; bg: string }[] = [];

  if (user?.role === "Admin") {
    stats = [
      {
        label: "Total Employee",
        icon: <HiMiniUsers />,
        count: statCount?.employeesCount,
        bg: "#5554AC",
      },
      {
        label: "Total Donor",
        icon: <FaUserTie />,
        count: statCount?.donorsCount,
        bg: "#FA8A93",
      },
      {
        label: "Total Accepter",
        icon: <HiUserGroup />,
        count: statCount?.acceptersCount,
        bg: "#6B8CF6",
      },
      {
        label: "Total Villages",
        icon: <MdHolidayVillage />,
        count: statCount?.villageCount,
        bg: "#9EA0D8",
      },
    ];
  } else if (user?.role === "Donor") {
    stats = [
      {
        label: "Total Donations",
        icon: <FaUserTie />,
        count: 10,
        bg: "#6B8CF6",
      },
      {
        label: "Supported Villages",
        icon: <MdHolidayVillage />,
        count: 5,
        bg: "#9EA0D8",
      },
    ];
  }

  const donations = [
    { month: "Jan", amount: 1200 },
    { month: "Feb", amount: 19000 },
    { month: "Mar", amount: 3000 },
    { month: "Apr", amount: 5000 },
    { month: "May", amount: 2000 },
    { month: "Jun", amount: 3000 },
  ];

  const data = {
    labels: donations.map((item) => item.month),
    datasets: [
      {
        label: "Donations",
        data: donations.map((item) => item.amount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Donation",
      },
    },
  };

  useEffect(() => {
    const fetchAllStatsCount = async () => {
      const data = await gatAllStatsCount();
      setStatCount(data);
    };
    fetchAllStatsCount();
  }, []);

  if (!user) {
    return <div className="p-2 text-xl">Loading info...</div>;
  }
console.log(user);
  return (
    <div className="p-2">
      {user?.role !== "Employee" && (
        <h2 className="mb-4 font-bold text-2xl text-text">
          Dashboard for {user?.role}
        </h2>
      )}

      <div className="flex flex-wrap gap-5">
        {stats.map((stat) => (
          <div
            key={stat?.label}
            className="p-5 rounded-lg text-white"
            style={{
              backgroundColor: stat.bg,
              width: "calc(25% - 15px)",
            }}
          >
            <h1>{stat.label}</h1>
            <div className="flex justify-between items-center">
              <span className="text-[30px]">{stat.icon}</span>
              <span className="text-[30px] font-bold">{stat.count}</span>
            </div>
          </div>
        ))}
      </div>

      <div>
        {user.role === "Admin" && (
          <div className="bg-white py-4 rounded-lg">
            <h3 className="font-bold mb-2 text-text text-2xl">
              Admin Analytics
            </h3>
            <p>
              Here you can see global statistics and manage system donations.
            </p>
            <div className="flex flex-col md:flex-row gap-4 w-full items-start">
              <div className="w-full md:w-3/4 min-w-[200px] border border-[#FFFFFF] rounded-md p-4 bg-white shadow-xl h-[400px]">
                <Bar data={data} options={options} />
              </div>
              <div className="w-full md:w-1/4 min-w-[200px] border border-[#FFFFFF] rounded-md p-4 bg-white"></div>
            </div>
          </div>
        )}

        {user.role === "Employee" && (
          <div className="bg-white py-4 rounded-lg ">
            <h3 className="font-bold mb-2 text-text text-2xl">My Village</h3>
            <p>Here you can see global statistics and manage village.</p>
            <div className="flex flex-col md:flex-row gap-4 w-full items-start  flex-wrap">
              <div className="w-full md:w-1/4 min-w-[200px] rounded-md">
               {user?.area_id && <VillageDetail id={user.area_id} />}
              </div>
              <div className="flex flex-col gap-4 w-full md:w-[calc(75%-1rem)]">
                <div className="shadow-xl">
                  <h2 className="mb-2">
                    <span className="px-1 rounded-full bg-background text-white">
                      1
                    </span>
                    <span className="mx-2 font-bold text-text text-[20px]">
                      Village Dashboard Stats
                    </span>
                  </h2>
                  <div className="border border-[#FFFFFF] rounded-md p-4 bg-[#FFFFFF]">
                    <div className="my-3 mb-10 w-full px-4">
                      <div className="flex flex-col lg:flex-row justify-center items-start gap-10">
                        <div className="flex flex-col items-center w-full sm:w-auto">
                          <div className="w-24 h-24 mb-3">
                            <CircularProgressbarWithChildren
                              value={percentage}
                              styles={buildStyles({
                                pathColor: "#4B76B6",
                                trailColor: "#ddd",
                              })}
                            >
                              <div className="w-[80%] h-[80%] bg-[#4B76B6] rounded-full flex flex-col items-center justify-center text-center text-white">
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
                            className="py-1 border border-gray-300 px-4 text-center w-full sm:w-[300px] bg-background/10"
                            label="This Month Donation"
                            labelClassName="text-white bg-[#4B76B6]"
                          />
                        </div>

                        <div className="flex flex-col items-center w-full sm:w-auto">
                          <div className="w-24 h-24 mb-3">
                            <CircularProgressbarWithChildren
                              value={percentage}
                              styles={buildStyles({
                                pathColor: "#5294AE",
                                trailColor: "#ddd",
                              })}
                            >
                              <div className="w-[80%] h-[80%] bg-background rounded-full flex flex-col items-center justify-center text-center text-white">
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
                            className="py-1 border border-gray-300 px-4 text-center w-full sm:w-[300px] bg-background/10"
                            label="Total Donation"
                            labelClassName="text-white bg-background"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap md:flex-nowrap gap-4">
                      <div className="w-full md:w-1/3 p-4 text-[14px] font-semibold rounded-lg bg-[#6889F6] text-white">
                        TOTAL DONATION
                        <div className="flex justify-between items-center">
                          <div className="animate-arrow-fly">
                            <FaArrowRightLong />
                          </div>
                          <h1 className="text-[16px]">0</h1>
                        </div>
                        <p className="text-xs">Overall Total Donation</p>
                      </div>
                      <div className="w-full md:w-1/3 p-4 text-[14px] font-semibold rounded-lg bg-[#A1A3D9] text-white">
                        TOTAL DONOR
                        <div className="flex justify-between items-center">
                          <div className="animate-arrow-fly">
                            <FaArrowRightLong />
                          </div>
                          <h1 className="text-[16px]">0</h1>
                        </div>
                        <p className="text-xs">Overall Total Donor</p>
                      </div>
                      <div className="w-full md:w-1/3 p-4 text-[14px] font-semibold rounded-lg bg-[#FB8892] text-white">
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

                <div className="shadow-xl">
                  <h2 className="mb-2">
                    <span className="px-1 rounded-full bg-background text-white">
                      2
                    </span>
                    <span className="mx-2 font-bold text-text text-[20px]">
                      Village Analytics
                    </span>
                  </h2>
                  <div className="border border-[#FFFFFF] rounded-md p-4 bg-[#FFFFFF]">
                    <div className="my-3 mb-10 w-full px-4 h-[300px]">
                      <Bar data={data} options={options} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {user.role === "Donor" && (
          <div className="bg-white py-4 rounded-lg ">
            <h3 className="font-bold mb-2">Donor Contributions</h3>
            <p>You've contributed to 5 villages this month.</p>
          </div>
        )}
      </div>
    </div>
  );
}
