"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import OrangeButton from "../../components/Button";

const PaginaPrincipal: React.FC = () => {
  const router = useRouter();
  
  const handleButtonClick = () => {
    router.push("/cadastro");
  };

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center relative">
      <Image
        src="/background.png"
        alt="Background"
        fill
        className="object-cover z-0"
        priority
      />
      
      <div className="flex-grow flex items-center justify-center -mt-52 relative z-10">
        <Image
          src="/logo_vertical_verde.png"
          alt="Logo"
          width={300}
          height={200}
          priority
        />
      </div>
      
      <div className="flex-grow flex justify-end text-center mt-6 mr-20 relative z-10">
        <h1 className="text-white font-bold text-5xl leading-snug">
          <span>Personalize sua jornada na</span>
          <br />
          <span>XX Semana Fluxo</span>
        </h1>
      </div>
      
      <div className="flex items-center justify-center h-52 text-4xl relative z-10">
        <OrangeButton
          onClick={handleButtonClick}
          text="Toque para começar"
        />
      </div>
    </div>
  );
};

export default PaginaPrincipal;