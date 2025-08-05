"use client";
import React from "react";
import Sidebar from "../components/UI/Sidebar";
import Navbar from "../components/UI/Navbar";
import { ThemeProvider } from "../context/ThemeProvider";
import { useTheme } from "../context/ThemeProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSidebarCollapsed } = useTheme();

  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white">
          <Navbar />
        </div>

        <div className="flex flex-1 pt-16 relative">
          <Sidebar />

          <div className="flex-1 overflow-y-auto p-4 bg-[#F6F7FB]">{children}</div>
        </div>
      </div>
    </ThemeProvider>
  );
}
