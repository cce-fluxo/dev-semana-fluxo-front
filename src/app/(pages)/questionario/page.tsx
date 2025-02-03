"use client";

import React, { useEffect, useState } from "react";
import OrangeButton from "../../../components/Button";
import LogoHorizontalLaranja from "../../../components/LogoHorizontalLaranja";
import { useRouter } from "next/navigation";
import api from "@/app/services/axios";
import PaginaAtual from "@/components/PaginaAtual";

type respostaId = {
  id: number;
  texto: string;
}

type listRespostaId = respostaId[];

const Questionario: React.FC = () => {
  const router = useRouter();
  const usuarioId = 1; // pegar qual usuario esta logado no momento

  // Estado para armazenar todas as perguntas carregadas do backend
  const [todasPerguntas, setTodasPerguntas] = useState<any[]>([]);
  const [dados, setDados] = useState({
    usuarioId: usuarioId,
    metodoEnvio: "email",
    respostas: [],
  });

  const [idAtual, setIdAtual] = useState(0); // id da pergunta atual
  const [pergunta, setPergunta] = useState(""); // texto da pergunta recebida
  const [respostas, setRespostas] = useState<listRespostaId>([]); // lista com o texto das respostas

  const handleNextStep = ()=>{
    setIdAtual(idAtual+1);
  };

  const handlePrevStep = (newData: any) => {
    if (idAtual >= 1){
      setIdAtual(idAtual - 1);
    }
  };

  useEffect(() =>{
    console.log(dados);
    console.log(respostas);
  }, [dados, respostas])

  // Faz a requisição das perguntas apenas uma vez
  useEffect(() => {
    const fetchPerguntas = async () => {
      try {
        const response = await api.get("/pergunta"); // Aguarda a resposta da API
        const perguntas = response.data.data;

        if (perguntas.length > 0) {
          setTodasPerguntas(perguntas);

          const novasRespostas = perguntas.map((pergunta: any) => ({
            perguntaId: pergunta.id,
            respostaId: "", // Inicialmente vazio
          }));

          setDados((prev) => ({
            ...prev,
            respostas: novasRespostas,
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar perguntas:", error);
      }
    };

    fetchPerguntas();
  }, []); // Executa apenas uma vez

  // Atualiza a pergunta e as respostas quando `idAtual` muda
  useEffect(() => {
    if (todasPerguntas.length > 0) {
      const perguntaRecebida = todasPerguntas[idAtual]; // Pega a pergunta pelo ID atual

      setPergunta(perguntaRecebida?.pergunta || ""); // Atualiza o texto da pergunta
      setRespostas(
        perguntaRecebida?.respostas.map((r: any) => ({
          texto: r.texto_resposta,
          id: r.id,
        })) || []
      );
    }
  }, [idAtual, todasPerguntas]); // Executa quando `idAtual` ou `todasPerguntas` mudar

  return (
    <PaginaAtual 
    idAtual={idAtual} 
    pergunta={pergunta} 
    respostas={respostas} 
    data={dados}
    nextStep={handleNextStep}
    prevStep={handlePrevStep} />
  );
};

export default Questionario;
