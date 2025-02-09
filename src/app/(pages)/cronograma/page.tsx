"use client";

import React, { useEffect, useState } from "react";
import OrangeButton from "../../../components/Button";
import LogoHorizontalLaranja from "../../../components/LogoHorizontalLaranja";
import { useRouter } from "next/navigation";
import api from "@/app/services/axios";

type Palestra = {
  Data: string;
  horario: string;
  id: number;
  local: string;
  nome: string;
  tema: string;
}; //define o tipo palestra, assim como no back para nao deixar o codigo vermelho

type PalestraList = Palestra[]; //define o tipo lista de palestras

const PaginaCadastro: React.FC = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    localStorage.removeItem("idUsuario");
    router.push("/agradecimento");
  };

  const idUsuario = Number(localStorage.getItem("idUsuario"));

  const [palestrasRecomendadas, setPalestrasRecomendadas] = useState<PalestraList>([]); //Guarda as palestras Recomendadas do usuario

  //Carrega as palestras recomendadas e guarda na variavel palestrasRecomendadas
  useEffect(()=>{

    async function carregarPalestras() {

      const palestras: any = await getPalestrasUsuario(idUsuario, router);
      setPalestrasRecomendadas(palestras); // Atualiza o estado
    }
    carregarPalestras();

  }, [idUsuario])

  //Apenas para teste, deve ser apagado do codigo final
  useEffect(()=>{
    console.log("essas sao as palestras", palestrasRecomendadas);
    console.log("Do usuario", idUsuario);
  }, [palestrasRecomendadas]);

  return (
    <div 
    className="flex flex-col min-h-screen bg-cover bg-center"
    style={{ backgroundImage: "url('/background_cristo.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >

      <div className="flex justify-center mt-20">
        <LogoHorizontalLaranja />
      </div>


      <div className="text-center mt-10">
        <h1 className="text-black text-4xl leading-snug">
          Segue o cronograma elaborado com base nas suas respostas.
        </h1>
      </div>


      {palestrasRecomendadas.map((palestra: Palestra, index) => (
        <div className="flex items-center mt-12 ml-16" key={index}>

          <div className="flex flex-col items-center mr-10">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-orange-500 mr-8"></div>
              <span className="text-black text-5xl font-bold">
                {palestra.Data.toString().slice(5, 7)} {/**Coloca os dias da palestra*/}
              </span>
            </div>
            <span className="text-gray-500 text-2xl -mr-8">
              {["Seg", "Ter", "Qua", "Qui", "Sex"][index]}
            </span>
          </div>

          <div className="relative bg-gradient-to-r from-gray-100 to-orange-100 rounded-lg shadow-md flex flex-col w-4/5">
            <div className="p-10">
              <h2 className="text-black font-bold text-4xl">
                {palestra.nome}
              </h2>
              <p className="text-gray-600 text-xl">{palestra.tema}</p>
              <p className="text-gray-600 mt-2 text-2xl">
                {palestra.Data.toString().slice(8, 10) + 
                "-" + palestra.Data.toString().slice(5, 7) + 
                "-" + palestra.Data.toString().slice(0, 4) + ", " + 
                palestra.horario.toString().slice(11, 13) + "h"}
</p>
              <p className="text-gray-500 mt-1 text-2xl">
                Local: <span className="font-bold">{palestra.local}</span>
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

//Faz a requisicao para o back e, caso tenha erro, mostra o erro na tela e depois redireciona para a tela inicial
async function getPalestrasUsuario (id:number, router:any ){
try {
  const palestras = await api.get(`usuario/findPalestras/${id}`);
  return palestras.data;
} catch(error: any){
  const mesnagemError = error.response?.data?.message || "Erro desconhecido.";
  alert (`Erro ao buscar palestras\n ${mesnagemError}`);
  router.push("/");
  
}
}