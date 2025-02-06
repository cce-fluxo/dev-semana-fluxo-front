"use client";

import React, { useEffect } from "react";
import OrangeButton from "../../../components/Button";
import LogoHorizontalLaranja from "../../../components/LogoHorizontalLaranja";
import { useRouter } from "next/navigation";
import api from "@/app/services/axios";

const PaginaCadastro: React.FC = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/questionario");
  };

  const idUsuario = 1;
  const palestrasRecomendadas = getPalestrasUsuario(idUsuario);

  useEffect(()=>{
    console.log("essas sao as palestras", palestrasRecomendadas);
  }, [palestrasRecomendadas]);

  return (
    <div className="flex flex-col min-h-screen bg-white">

      <div className="flex justify-center mt-20">
        <LogoHorizontalLaranja />
      </div>


      <div className="text-center mt-10">
        <h1 className="text-black text-4xl leading-snug">
          Segue o cronograma elaborado com base nas suas respostas.
        </h1>
      </div>


      {[7, 8, 9, 10, 11].map((day, index) => (
        <div className="flex items-center mt-12 ml-16" key={index}>

          <div className="flex flex-col items-center mr-10">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-orange-500 mr-8"></div>
              <span className="text-black text-5xl font-bold">
                {day.toString().padStart(2, "0")}
              </span>
            </div>
            <span className="text-gray-500 text-2xl -mr-8">
              {["Seg", "Ter", "Qua", "Qui", "Sex"][index]}
            </span>
          </div>

          <div className="relative bg-gradient-to-r from-gray-100 to-orange-100 rounded-lg shadow-md flex flex-col w-4/5">
            <div className="p-10">
              <h2 className="text-black font-bold text-4xl">
                Lorem ipsum dolor sit amet consectetur.
              </h2>
              <p className="text-gray-600 mt-2 text-2xl">07/04/25, 13h às 14h</p>
              <p className="text-gray-500 mt-1 text-2xl">
                Empresa: <span className="font-bold">Lorem ipsum</span>
              </p>
            </div>

            <div className="absolute right-0 top-0 h-full bg-orange-600 rounded-r-lg flex items-center justify-center w-14">
              <span className="text-white text-3xl">{">"}</span>
            </div>
          </div>
        </div>
      ))}

      <div className="flex-grow flex items-end justify-center h-54 text-4xl">
        <OrangeButton onClick={handleBackToHome} text="Concluído" />
      </div>
    </div>
  );
};

export default PaginaCadastro;

async function getPalestrasUsuario (id:number){

  const palestras = await api.get(`cronograma/${2}`);
  return palestras;
}