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
    <div className="bg-white h-screen overflow-hidden">
      <ThemeProvider>
        <div className="flex flex-col h-full">
          
          <div className="flex flex-1 pt-0 relative h-[calc(100vh-4rem)]">
            <Sidebar />
            <div className="flex-1 px-1 py-4 bg-white mt-2 mr-1 ml-2 rounded-3xl h-full overflow-y-auto">
            <Navbar />
              {children}
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
