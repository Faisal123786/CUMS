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
    roleAllowed: ["Admin","Employee"],
    children: [
      {
        label: "All Villages",
        href: "/dashboard/villages",
        roleAllowed: ["Admin","Employee"],
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
    label: "Transactions",
    icon: <BiSolidDashboard />,
    href: "",
    roleAllowed: [],
  },
  {
    label: "Wallet",
    icon: <BiSolidDashboard />,
    href: "",
    roleAllowed: [],
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

  return (
    <>
      {!isSidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarCollapsed(true)}
        />
      )}

      <aside
        className={`fixed top-16 left-0 h-full w-[300px] z-50 bg-white text-black p-4
        transition-transform duration-300 ease-in-out
        ${isSidebarCollapsed ? "-translate-x-full" : "translate-x-0"}
        md:translate-x-0 md:static md:block shadow-lg shadow-black/20`}
      >
        <h1 className="font-bold text-lg">Menu</h1>
        <ul className="mt-5 space-y-2">
          {menuItems.map((item) => {
            const isOpen = openMenu === item.label;
            const isParentActive = activeChild === item.label;
            const isParentAllowed = item.roleAllowed?.includes(
              user?.role || ""
            );

            return (
              <li key={item.label}>
                {item.href ? (
                  <Link
                    href={isParentAllowed ? item.href : "#"}
                    onClick={(e) => {
                      if (!isParentAllowed) e.preventDefault();
                      else {
                        setOpenMenu(item.label);
                        setActiveChild(item.label);
                      }
                    }}
                    className={`flex justify-between items-center cursor-pointer px-2 py-1 rounded transition
                      ${
                        isParentActive
                          ? "bg-blue-100 text-blue-600"
                          : "hover:bg-gray-100"
                      }
                      ${!isParentAllowed ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </span>
                    {!isParentAllowed && (
                      <span className="text-gray-400">🔒</span>
                    )}
                  </Link>
                ) : (
                  <div
                    onClick={() => {
                      if (isParentAllowed) toggleMenu(item.label);
                    }}
                    className={`flex justify-between items-center cursor-pointer px-2 py-1 rounded transition
                      ${
                        isOpen
                          ? "bg-blue-100 text-blue-600"
                          : "hover:bg-gray-100"
                      }
                      ${!isParentAllowed ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </span>
                    {item.children &&
                      isParentAllowed &&
                      (isOpen ? <BsDash /> : <BsPlus />)}
                    {!isParentAllowed && (
                      <span className="text-gray-400">🔒</span>
                    )}
                  </div>
                )}

                {item.children && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="ml-4 mt-2 space-y-1 text-sm border-l border-blue-500 pl-4 relative">
                      {item.children.map((child) => {
                        const isChildAllowed = child.roleAllowed?.includes(
                          user?.role || ""
                        );
                        const isActiveChild = activeChild === child.label;

                        return (
                          <li
                            key={child.label}
                            onClick={() => {
                              if (!isChildAllowed) return;
                              setActiveChild(child.label);
                              setOpenMenu(item.label);
                            }}
                            className={`relative group ${
                              isActiveChild ? "text-blue-600 font-medium" : ""
                            } ${
                              !isChildAllowed
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <Link
                              href={isChildAllowed ? child.href : "#"}
                              onClick={(e) => {
                                if (!isChildAllowed) e.preventDefault();
                              }}
                              className="block px-2 py-1 hover:text-blue-600"
                            >
                              {child.label}
                              {!isChildAllowed && (
                                <span className="ml-2 text-gray-400">🔒</span>
                              )}
                            </Link>
                            <span
                              className={`absolute -left-[20px] top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-blue-500 transition duration-300 ${
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
