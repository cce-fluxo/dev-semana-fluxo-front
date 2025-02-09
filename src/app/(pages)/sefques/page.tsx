"use client";

import React from "react";
import { useRouter } from "next/navigation";
import OrangeButton from "../../../components/Button";
import LogoHorizontalLaranja from "../../../components/LogoHorizontalLaranja";

const PaginaPrincipal: React.FC = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/sefex");
  };

  const images = [
    "/foto1.png",
    "/qrcode.png",
  ];

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background_sefques.png')" }}
    >
      <div className="flex justify-center mt-44">
        <LogoHorizontalLaranja />
      </div>

      <div className="flex-grow flex flex-col justify-center text-center px-20 mt-32">
        <h1 className="text-black text-4xl leading-snug font-bold">
          <span>
            Bem-vindo(a) à etapa de personalização da sua experiência na Semana Fluxo!
          </span>
        </h1>

        <div className="mt-30 bg-transparent w-full h-28" />

        <p className="mt-28 text-black text-3xl leading-relaxed">
          Para garantir que você aproveite ao máximo o evento, criamos este <strong>questionário</strong> com algumas perguntas sobre seus <strong>interesses e expectativas</strong>.
          As respostas serão usadas para montar um <strong>cronograma personalizado</strong>, sugerindo as palestras, workshops e estandes interativos mais alinhados aos seus objetivos.
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
        <OrangeButton onClick={handleButtonClick} text="Iniciar Questionário" />
      </div>
    </div>
  );
};

export default PaginaPrincipal;
