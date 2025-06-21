import React, { createContext, ReactNode, useState } from "react";

interface ToastContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const toastContext = createContext<ToastContextType | undefined>(
  undefined
);

interface childrenType {
  children: ReactNode;
}

export default function ToastContext({ children }: childrenType) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const exportObject = {
    isLoading,
    setIsLoading,
  };
  return (
    <toastContext.Provider value={exportObject}>
      {children}
    </toastContext.Provider>
  );
}
