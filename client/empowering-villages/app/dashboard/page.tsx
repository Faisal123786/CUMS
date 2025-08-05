import { HiMiniUsers } from "react-icons/hi2";
import { HiUserGroup } from "react-icons/hi";
import { MdHolidayVillage } from "react-icons/md";
import { FaUserTie } from "react-icons/fa6";

export default function DashboardPage() {
  const stats = [
    {
      label: "Total Employee",
      icon: <HiMiniUsers />,
      count: 12,
      bg: "#5554AC",
    },
    {
      label: "Total Donor",
      icon: <FaUserTie />,
      count: 4,
      bg: "#FA8A93",
    },
    {
      label: "Total Moderator",
      icon: <HiUserGroup />,
      count: 4,
      bg: "#6B8CF6",
    },
    {
      label: "Total Villages",
      icon: <MdHolidayVillage />,
      count: 4,
      bg: "#9EA0D8",
    },
  ];
  return (
    <div className="p-2">
      <div className="flex flex-wrap gap-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
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
    </div>
  );
}
