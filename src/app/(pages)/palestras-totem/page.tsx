"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OrangeButton from "../../../components/Button";
import LogoHorizontalLaranja from "../../../components/LogoHorizontalLaranja";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/app/services/axios";
import withClient from "@/app/utils/withClient";

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
  const [isExiting, setIsExiting] = useState(false);
  const [idUsuario, setIdUsuario] = useState<number | null> (null);
  const [palestrasRecomendadas, setPalestrasRecomendadas] = useState<PalestraList>([]); //Guarda as palestras Recomendadas do usuario
  const searchParams = useSearchParams();
  const [currentLectureIndex, setCurrentLectureIndex] = useState<{[key: string]: number}>({});
  const diasDaSemana = ["seg", "ter", "qua", "qui", "sex"];
const diasPalestra = ["10", "11", "12", "13", "14"];

const mapearDias = (dia: string) => {
    const index = diasPalestra.indexOf(dia); // Encontra o índice do dia na lista diasPalestra
    if (index !== -1) {
        return diasDaSemana[index]; // Retorna o dia da semana correspondente
    } else {
        return "Dia não encontrado"; // Retorna uma mensagem de erro se o dia não for encontrado
    }
};

// Primeiro agrupamos as palestras por dia
const groupedLectures = palestrasRecomendadas.reduce((acc: {[key: string]: Palestra[]}, palestra) => {
  const dia = palestra.Data.toString().slice(8, 10);
  if (!acc[dia]) {
    acc[dia] = [];
  }
  acc[dia].push(palestra);
  return acc;
}, {});

// Função para mudar a palestra exibida
const handleLectureChange = (dia: string, direction: 'next' | 'prev') => {
    setCurrentLectureIndex(prev => ({
      ...prev,
      [dia]: direction === 'next' 
        ? (prev[dia] || 0) + 1 
        : (prev[dia] || 0) - 1
    }));
}

  const handleBackToHome = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push("/agradecimento");
    }, 500);
  };

   // Função para carregar as palestras, depende de idUsuario já estar definido
   const carregarPalestras = async () => {
    try {
    //   if (idUsuario === null) {
    //     throw new Error("ID do usuário não definido");
    //   }
      const palestras: any = await getPalestrasUsuario(router);
      setPalestrasRecomendadas(palestras);
    } catch (error) {
      console.error("Erro ao carregar palestras:", error);
      alert(error);
      router.replace("/");
    }
  };

  // Função para carregar o ID do usuário a partir da URL ou do localStorage
  const carregarIdUsuario = async () => {
    try {
      const idQuery = searchParams.get("idUsuario");
      if (idQuery) {
        setIdUsuario(Number(idQuery));
      } else {
        const idLocal = localStorage.getItem("idUsuario");
        if (idLocal) {
          setIdUsuario(Number(idLocal));
        } else {
          throw new Error("Usuário não encontrado!");
        }
      }
    } catch (error) {
      console.error("Erro ao carregar idUsuario:", error);
      alert(error);
      router.replace("/");
    }
  };

  // Inicializa o carregamento quando o componente monta
//   useEffect(() => {
//     const init = async () => {
//       await carregarIdUsuario();
//     };
//     init();
//   }, []);

  // Uma alternativa é reagir à mudança de idUsuario para carregar as palestras:
  useEffect(() => {
    // if (idUsuario !== null) {
      carregarPalestras();
    // }
  }, [palestrasRecomendadas]);

  //Apenas para teste, deve ser apagado do codigo final
//   useEffect(()=>{
//     // console.log("essas sao as palestras", palestrasRecomendadas);
//     // console.log("Do usuario", idUsuario);
//   }, [palestrasRecomendadas, idUsuario]);

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/background_cristo.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        className="flex flex-col min-h-screen"
        initial={{ x: 0 }}
        animate={{ x: isExiting ? "-100vw" : 0 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
      >
      <div className="flex justify-center mt-20">
        <LogoHorizontalLaranja />
      </div>

      <div className="text-center mt-10">
        <h1 className="text-black text-4xl leading-snug">
          Essas são todas as palestras que temos para você
        </h1>
      </div>
      <div className="mb-16">

  <div className="overflow-auto h-[58vh]">
  {Object.entries(groupedLectures).map(([dia, palestras]) => {
    const currentIndex = currentLectureIndex[dia] || 0;
    const currentPalestra = palestras[currentIndex % palestras.length];
    const totalPalestras = palestras.length;

    return (
      <div className="flex items-center mt-12 ml-16" key={dia}>
        {/* Coluna da data */}
        <div className="flex flex-col items-center mr-10">
        <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-orange-500 mr-8"></div>
                <span className="text-black text-5xl font-bold">
                    {dia} {/**Coloca os dias da palestra*/}
                </span>
                </div>
                <span className="text-gray-500 text-2xl -mr-8">
                {mapearDias(dia)}
                </span>
        </div>

        {/* Card da palestra */}
        <div className="relative bg-gradient-to-r from-gray-100 to-orange-100 rounded-lg shadow-md flex flex-col w-4/5">
          {/* Conteúdo da palestra */}
          <div className="p-10">
            <h2 className="text-black font-bold text-4xl max-w-[90%]">
              {currentPalestra.nome}
            </h2>
            <p className="text-gray-600 text-xl">{currentPalestra.tema}</p>
                <p className="text-gray-600 mt-2 text-2xl">
                    {currentPalestra.Data.toString().slice(8, 10) + 
                    "-" + currentPalestra.Data.toString().slice(5, 7) + 
                    "-" + currentPalestra.Data.toString().slice(0, 4) + ", " + 
                    currentPalestra.horario.toString().slice(11, 13) + "h"}
                </p>
                <p className="text-gray-500 mt-1 text-2xl">
                    Local: <span className="font-bold">{currentPalestra.local}</span>
                </p>
          </div>

          {/* Setas de navegação */}
          {totalPalestras > 1 && (
            <>
              <div
                className="absolute right-0 top-0 h-full bg-orange-600 rounded-r-lg flex items-center justify-center w-14 cursor-pointer"
                onClick={() => handleLectureChange(dia, 'next')}
              >
                <span className="text-white text-3xl">{">"}</span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  })}
  </div>
</div>

        <div>
          <button
            type="button"
            className="w-82 p-6 text-green-800 text-3xl ml-auto bg-[#BAD66B] flex"
            onClick={() => { { router.push("/cronograma") } }}
          >
            ← Voltar para suas palestras
          </button>
        </div>
<div className="flex-grow flex items-end justify-center h-54 text-4xl">
        <OrangeButton onClick={handleBackToHome} text="Concluído" />
      </div>
    </motion.div>
  </div>
  );
};


//Faz a requisicao para o back e, caso tenha erro, mostra o erro na tela e depois redireciona para a tela inicial
async function getPalestrasUsuario (router:any ){
  try {
    const palestras = await api.get(`palestra`);
    console.log ("As palestras sao:", palestras);
    return palestras.data.data;
  } catch(error: any){
    const mesnagemError = error.response?.data?.message || "Erro desconhecido.";
    alert (`Erro ao buscar palestras\n ${mesnagemError}`);
    router.push("/");
  }
}

export default withClient(PaginaCadastro);