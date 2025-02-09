"use client";

import React from "react";
import { useRouter } from "next/navigation";
import OrangeButton from "../../components/Button";

const PaginaPrincipal: React.FC = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/cadastro");
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="flex-grow flex items-center justify-center -mt-52">
        <img
          src="/logo_vertical_verde.png"
          alt="Logo"
        />
      </div>

      <div className="flex-grow flex justify-end text-center mt-6 mr-20">
        <h1 className="text-white font-bold text-5xl leading-snug">
          <span>Personalize sua jornada na</span>
          <br />
          <span >XX Semana Fluxo</span>
        </h1>
      </div>

      <div className="flex items-center justify-center h-52 text-4xl">
        <OrangeButton
          onClick={handleButtonClick}
          text="Toque para começar"
        />
      </div>
    </div>
  );
};

export default PaginaPrincipal;
