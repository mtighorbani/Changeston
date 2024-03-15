import { ReactNode, createContext, useContext, useState } from "react";

interface ModalContextType {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (modal: ModalContextType["isLoginModalOpen"]) => void;
}

interface ModalContextProviderType {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalContextProvider = ({
  children,
}: ModalContextProviderType) => {
  const [isLoginModalOpen, setIsLoginModalOpen] =
    useState<ModalContextType["isLoginModalOpen"]>(false);

  return (
    <ModalContext.Provider
      value={{
        isLoginModalOpen: isLoginModalOpen,
        setIsLoginModalOpen: setIsLoginModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return useContext(ModalContext);
};
