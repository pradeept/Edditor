import React, { createContext, ReactNode, useState } from "react";

interface ToastContextType {
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string | null;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isToastOpen: boolean;
  setIsToastOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const toastContext = createContext<ToastContextType | undefined>(
  undefined
);

interface childrenType {
  children: ReactNode;
}

export default function ToastContext({ children }: childrenType) {
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);

  const exportObject = {
    isError,
    setIsError,
    errorMessage,
    setErrorMessage,
    isLoading,
    setIsLoading,
    isToastOpen,
    setIsToastOpen,
  };
  return (
    <toastContext.Provider value={exportObject}>
      {children}
    </toastContext.Provider>
  );
}
