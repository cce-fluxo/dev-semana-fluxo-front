"use client";

import React from "react";
import { useRouter } from "next/navigation";
import OrangeButton from "../../../../components/Button";

const PaginaPrincipal: React.FC = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/sefques");
  };

  const images = [
    "/foto1.png",
    "/qrcode.png",
  ];

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="flex-grow flex flex-col justify-center text-center px-20 mt-20">
        <h1 className="text-white text-3xl leading-snug">
          <span>
            A Semana Fluxo (SEF) é um evento anual gratuito voltado ao público universitário, organizado pela Fluxo Consultoria, empresa júnior da UFRJ.
          </span>
        </h1>

        <img
          src={images[0]}
          alt="Descrição da imagem"
          className="mt-32 max-w-full h-auto"
        />

        <p className="mt-28 text-white text-3xl leading-relaxed">
          O principal objetivo é conectar os estudantes ao mercado de trabalho, apresentando possibilidades de carreira para futuros profissionais de engenharia e áreas correlatas. 
          Por meio de palestras, workshops e estandes interativos, o evento promove o contato direto com empresas, oferecendo uma visão prática e atualizada das demandas e oportunidades profissionais.
        </p>

        <div className="flex justify-end mt-44">
          <img
            src={images[1]}
            alt="QR Code"
            className="w-42 h-36"
          />
        </div>
      </div>

      <div className="flex items-center justify-center h-52 text-4xl">
        <OrangeButton onClick={handleButtonClick} text="Prosseguir" />
      </div>
    </div>
  );
};

export default PaginaPrincipal;
