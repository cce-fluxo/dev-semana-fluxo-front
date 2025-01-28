"use client";

import React from "react";
import OrangeButton from "../../../../components/Button";
import LogoHorizontalLaranja from "../../../../components/LogoHorizontalLaranja";
import { useRouter } from "next/navigation";

const PaginaCadastro: React.FC = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  const respostas = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.",
    "In condimentum facilisis porta.",
    "Sed nec diam eu diam mattis viverra nulla fringilla.",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex justify-center mt-44">
        <LogoHorizontalLaranja />
      </div>

      <div className="flex-grow flex flex-col mt-28">
        <h1 className="text-black text-5xl leading-snug font-bold ml-12">
          <div>Questão 1</div>
        </h1>
        <p className="mt-12 text-black text-4xl ml-12">
          Lorem ipsum dolor sit amet consectetur. Congue orci nunc scelerisque interdum arcu leo. Nibh scelerisque rutrum sed est.
        </p>

        <div className="mt-16 space-y-6 px-14">
          {respostas.map((resposta, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-r from-gray-100 to-orange-100 rounded-lg shadow-md flex flex-col w-full"
            >
              <div className="p-10">
                <h2 className="text-black text-4xl">{resposta}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Adicionando o QR Code na extrema direita */}
      <div className="flex justify-end items-center mt-12 px-8">
        <img
          src="/qrcode.png"
          alt="QR Code"
          className="w-42 h-36"
        />
      </div>

      {/* Botão com espaçamento adicional */}
      <div className="flex items-center justify-center h-52 text-4xl mt-16">
        <OrangeButton onClick={handleBackToHome} text="Próxima" />
      </div>
    </div>
  );
};

export default PaginaCadastro;
