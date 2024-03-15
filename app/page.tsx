"use client";

import LoginForm from "@/components/LoginForm";
import MainPage from "@/components/MainPage";
import { useModalContext } from "@/context/ModalContext";
import { Modal } from "antd";

export default function Home() {
  const modalContext = useModalContext();
  return (
    <main>
      <MainPage />
      <Modal
        footer={false}
        title={"ورود / ثبت نام"}
        open={modalContext?.isLoginModalOpen}
        onCancel={() => modalContext?.setIsLoginModalOpen(false)}
      >
        <LoginForm />
      </Modal>
    </main>
  );
}
