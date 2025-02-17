"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import OrangeButton from "../../components/Button";

const PaginaPrincipal: React.FC = () => {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const handleButtonClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push("/cadastro");
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background.png')" }}>
      <motion.div
        className="flex flex-col min-h-screen"
        initial={{ x: 0 }}
        animate={{
          x: isExiting ? "-100vw" : 0,
          opacity: isExiting ? 0 : 1
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex-grow flex items-center justify-center -mt-52">
          <img src="/logo_vertical_verde.png" alt="Logo" />
        </div>

        <div className="flex-grow flex justify-end text-center mt-6 mr-20">
          <h1 className="text-white font-extrabold text-4xl leading-snug">
            <span>Personalize sua jornada na</span>
            <br />
            <span>XX Semana Fluxo</span>
          </h1>
        </div>

        <div className="flex items-center justify-center h-52 text-4xl">
          <OrangeButton onClick={handleButtonClick} text="Toque para começar" />
        </div>
      </motion.div>
    </div>
  );
};

export default PaginaPrincipal;
