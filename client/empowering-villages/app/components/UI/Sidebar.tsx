"use client";
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeProvider";
import { BiSolidDashboard } from "react-icons/bi";
import { BsPlus, BsDash } from "react-icons/bs";
import { GiVillage } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { RootState } from "../../lib/store";
import { useSelector } from "react-redux";

const menuItems = [
  {
    label: "Dashboard",
    icon: <BiSolidDashboard />,
    href: "/dashboard",
    roleAllowed: ["Admin", "Donor", "Employee"],
  },
  {
    label: "Villages",
    icon: <GiVillage />,
    roleAllowed: ["Admin"],
    children: [
      {
        label: "All Villages",
        href: "/dashboard/villages",
        roleAllowed: ["Admin"],
      },
      {
        label: "Add New",
        href: "/dashboard/villages/addNew",
        roleAllowed: ["Admin"],
      },
    ],
  },
  {
    label: "Employee",
    icon: <FaUser />,
    roleAllowed: ["Admin"],
    children: [
      {
        label: "All Employee",
        href: "/dashboard/employee",
        roleAllowed: ["Admin"],
      },
      {
        label: "Add New",
        href: "/dashboard/employee/addNew",
        roleAllowed: ["Admin"],
      },
      {
        label: "Manage Login",
        href: "/dashboard/employee/manage",
        roleAllowed: ["Admin"],
      },
    ],
  },
  {
    label: "Accepter",
    icon: <FaUser />,
    roleAllowed: ["Employee"],
    children: [
      {
        label: "All Accepter",
        href: "/dashboard/accepter",
        roleAllowed: ["Employee"],
      },
      {
        label: "Add New",
        href: "/dashboard/accpter/addNew",
        roleAllowed: ["Employee"],
      },
    ],
  },
];

export default function Sidebar() {
  const { isSidebarCollapsed, setIsSidebarCollapsed } = useTheme();
  const user = useSelector((state: RootState) => state.auth.user) as {
    role: string;
    name: string;
  } | null;

  const [openMenu, setOpenMenu] = useState<string>("Dashboard");
  const [activeChild, setActiveChild] = useState<string>("Dashboard");

  const toggleMenu = (label: string) => {
    setOpenMenu((prev) => (prev === label ? "" : label));
  };

  const filteredMenuItems = menuItems
    .filter((item) => item.roleAllowed?.includes(user?.role || ""))
    .map((item) => ({
      ...item,
      children: item.children?.filter((child) =>
        child.roleAllowed?.includes(user?.role || "")
      ),
    }));

  return (
    <>
      {!isSidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarCollapsed(true)}
        />
      )}

      <aside
        className={`fixed top-20 left-1 h-full w-[300px] bg-gradient-to-b from-[#5295AE] to-[#4B75B6] z-50 text-black p-4
        transition-transform duration-300 ease-in-out
        ${isSidebarCollapsed ? "-translate-x-full" : "translate-x-1"}
        md:translate-x-1 md:translate-y-2 md:static md:block rounded-3xl`}
      >
        <h1 className="font-bold text-lg text-white">Menu</h1>
        <ul className="mt-5 space-y-2">
          {filteredMenuItems.map((item) => {
            const isOpen = openMenu === item.label;
            const isParentActive = activeChild === item.label;

            return (
              <li key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={() => {
                      setOpenMenu(item.label);
                      setActiveChild(item.label);
                    }}
                    className={`flex justify-between items-center cursor-pointer px-2 py-1 rounded-lg transition text-white
                      ${
                        isParentActive
                          ? "bg-black text-gray-600"
                          : "hover:bg-black"
                      }
                    `}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </span>
                  </Link>
                ) : (
                  <div
                    onClick={() => toggleMenu(item.label)}
                    className={`flex justify-between items-center cursor-pointer px-2 py-1 rounded-lg transition text-white
                      ${isOpen ? "bg-black text-white" : "hover:bg-black"}
                    `}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </span>
                    {item.children && (isOpen ? <BsDash /> : <BsPlus />)}
                  </div>
                )}

                {item.children && item.children.length > 0 && (
                  <div
                    className={`overflow-hidden transition-all text-white duration-300 ease-in-out ${
                      isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="ml-4 mt-2 space-y-1 text-sm border-l border-white pl-4 relative">
                      {item.children.map((child) => {
                        const isActiveChild = activeChild === child.label;
                        return (
                          <li
                            key={child.label}
                            onClick={() => {
                              setActiveChild(child.label);
                              setOpenMenu(item.label);
                            }}
                            className={`relative group ${
                              isActiveChild ? "text-black font-medium" : ""
                            }`}
                          >
                            <Link
                              href={child.href}
                              className="block px-2 py-1 hover:text-black"
                            >
                              {child.label}
                            </Link>
                            <span
                              className={`absolute -left-[20px] top-1/2 -translate-y-1/2 h-2 w-2 rounded-lg bg-white transition duration-300 ${
                                isActiveChild
                                  ? "opacity-100"
                                  : "opacity-0 group-hover:opacity-100"
                              }`}
                            ></span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
