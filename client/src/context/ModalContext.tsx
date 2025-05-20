import React, { createContext, ReactNode, useState } from "react";

interface ModalContextType {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  folderID: string | null;
  setFolderId: React.Dispatch<React.SetStateAction<string | null>>;
  files: string[] | null;
  setFiles: React.Dispatch<React.SetStateAction<string[] | null>>;
}

export const modalContext = createContext<ModalContextType | undefined>(
  undefined
);

interface childrenType {
  children: ReactNode;
}

export default function ModalContext({ children }: childrenType) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [folderID, setFolderId] = useState<string | null>(null);
  const [files, setFiles] = useState<string[] | null>(null);

  const exportObject = {
    isModalOpen,
    setIsModalOpen,
    folderID,
    setFolderId,
    files,
    setFiles,
  };
  return (
    <modalContext.Provider value={exportObject}>
      {children}
    </modalContext.Provider>
  );
}
