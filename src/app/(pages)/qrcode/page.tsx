"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import OrangeButton from "../../../components/Button";
import LogoHorizontalLaranja from "../../../components/LogoHorizontalLaranja";
import { useRouter } from "next/navigation";

const PaginaCadastro: React.FC = () => {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  
  const handleBackToHome = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push("/questionario");
    }, 500);
  };
  
  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/background_qrcode.png')",
      }}
    >
      <motion.div
        className="flex flex-col min-h-screen"
        initial={{ x: 0 }}
        animate={{ x: isExiting ? "-100vw" : 0 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
      >
        <div className="flex justify-center mt-44">
          <LogoHorizontalLaranja />
        </div>
        <div className="flex-grow flex flex-col items-center text-center mt-24">
          <h1 className="text-black text-5xl leading-snug">
            <div>Esse é o momento de você se inscrever</div>
            <div>na XX edição da Semana Fluxo</div>
          </h1>
          <div className="mt-24">
            <img src="/qrcode.png" alt="QR Code" className="max-w-full max-h-full w-[700px] h-[600px]" />
            <p className="mt-4 text-black text-3xl">
              Caso não consiga se inscrever nesse momento,
            </p>
            <p className="mt-2 text-black text-3xl">
              Code ficará disponível em todas as outras telas.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center h-52 text-4xl">
          <OrangeButton onClick={handleBackToHome} text="Concluído" />
        </div>
      </motion.div>
    </div>
  );
};

export default PaginaCadastro;
