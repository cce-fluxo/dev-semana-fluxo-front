"use client";

import React from "react";
import { useRouter } from "next/navigation";
import OrangeButton from "../../../components/Button";
import LogoHorizontalLaranja from "../../../components/LogoHorizontalLaranja";

const PaginaPrincipal: React.FC = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/");
  };

  const images = [
    "/foto1.png",
    "/qrcode.png",
  ];

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background_cristo.png')" }}
    >
      <div className="flex justify-center mt-44">
        <LogoHorizontalLaranja />
      </div>

      <div className="flex-grow flex flex-col justify-center text-center px-20 mt-32">
        <h1 className="text-black text-4xl leading-snug font-bold">
          <span>
            Obrigado por sua participação! 🎉
          </span>
        </h1>

        <div className="mt-30 bg-transparent w-full h-10" />

        <p className="mt-20 text-black text-3xl leading-relaxed">
          Suas respostas foram registradas com sucesso e 
          utilizadas para criar um cronograma personalizado, 
          <strong> conectando</strong> você às palestras, workshops e estandes
          mais alinhados aos seus interesses.
        </p>

        <p className="mt-24 text-black text-3xl leading-relaxed">
          Fique de olho no seu e-mail e nos canais oficiais da Semana Fluxo 
          para mais novidades sobre o evento. Nos vemos em breve! 🚀
        </p>

        <div className="flex justify-end mt-72">
          <img
            src={images[1]}
            alt="QR Code"
            className="w-42 h-36"
          />
        </div>
      </div>

      <div className="flex items-center justify-center h-52 text-4xl">
        <OrangeButton onClick={handleButtonClick} text="Retornar" />
      </div>
    </div>
  );
};

export default PaginaPrincipal;
