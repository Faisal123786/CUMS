"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "success" | "error" | "info";

interface ToasterContextType {
  showToast: (message: string, type?: ToastType, options?: ToastOptions) => void;
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export const ToasterProvider = ({ children }: { children: ReactNode }) => {
  const showToast = (message: string, type: ToastType = "info", options?: ToastOptions) => {
    switch (type) {
      case "success":
        toast.success(message, options);
        break;
      case "error":
        toast.error(message, options);
        break;
      case "info":
      default:
        toast.info(message, options);
        break;
    }
  };

  return (
    <ToasterContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ToasterContext.Provider>
  );
};

export const useToaster = (): ToasterContextType => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error("useToaster must be used within a ToasterProvider");
  }
  return context;
};
