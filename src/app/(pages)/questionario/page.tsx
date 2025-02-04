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
};

type respostaPergunta = {
  idResolvida: number;
  idResposta: number;
};

type listRespostaId = respostaId[];
type listRespostaPergunta = respostaPergunta[];

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
  const [jaResolvidas, setJaResolvidas] = useState<listRespostaPergunta>([]);

  const handleNextStep = (newData: any) => {
    setDados((prev: any) => {
      // Atualiza a resposta da pergunta atual
      const updatedRespostas = prev.respostas.map((resposta:any, index:number) => {
        // Se o índice da resposta for o idAtual, atualiza com newData
        if (index === idAtual) {
          return {
            ...resposta,
            ...newData, // Aqui você mescla as novas informações, como { respostaId: 5 }
          };
        }
        return resposta; // Caso contrário, mantém as respostas anteriores
      });
  
      // Retorna o novo objeto de dados, mantendo os valores antigos, mas com respostas atualizadas
      return {
        ...prev,
        respostas: updatedRespostas,
      };
    });

    setJaResolvidas((prev: any[]) => {
      const index = prev.findIndex((res) => res.idResolvida === idAtual);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { idResolvida: idAtual, idResposta: newData.respostaId };
        return updated;
      } else {
        return [...prev, { idResolvida: idAtual, idResposta: newData.respostaId }];
      }
    });
  
    // Atualiza o idAtual para a próxima pergunta
    setIdAtual(idAtual + 1);
  };

  const handlePrevStep = (newData: any) => {
    setDados((prev: any) => {
      // Atualiza a resposta da pergunta atual
      const updatedRespostas = prev.respostas.map((resposta:any, index:number) => {
        // Se o índice da resposta for o idAtual, atualiza com newData
        if (index === idAtual) {
          return {
            ...resposta,
            ...newData, // Aqui você mescla as novas informações, como { respostaId: 5 }
          };
        }
        return resposta; // Caso contrário, mantém as respostas anteriores
      });
  
      // Retorna o novo objeto de dados, mantendo os valores antigos, mas com respostas atualizadas
      return {
        ...prev,
        respostas: updatedRespostas,
      };
    });
  
    // Atualiza o idAtual para a próxima pergunta
    setJaResolvidas((prev: any[]) => {
      const index = prev.findIndex((res) => res.idResolvida === idAtual);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { idResolvida: idAtual, idResposta: newData.respostaId };
        return updated;
      } else {
        return [...prev, { idResolvida: idAtual, idResposta: newData.respostaId }];
      }
    });

    if (idAtual >= 1)
    {
      setIdAtual(idAtual - 1);
    }
  };

  useEffect(() =>{
    console.log(dados);
    console.log(respostas);
    console.log("Ja resolvida", jaResolvidas);
  }, [dados, respostas, jaResolvidas])

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
    prevStep={handlePrevStep}
    prevRespostas = {jaResolvidas} />
  );
};

export default Questionario;
