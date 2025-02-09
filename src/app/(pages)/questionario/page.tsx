"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/services/axios";
import PaginaAtual from "@/components/PaginaAtual";
import LoadPage from "@/components/LoadPage";
import LogoHorizontalLaranja from "../../../components/LogoHorizontalLaranja";

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
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  
  // Initialize other state variables
  const [todasPerguntas, setTodasPerguntas] = useState<any[]>([]);
  const [dados, setDados] = useState<any>(null);
  const [idAtual, setIdAtual] = useState(0);
  const [pergunta, setPergunta] = useState("");
  const [respostas, setRespostas] = useState<listRespostaId>([]);
  const [jaResolvidas, setJaResolvidas] = useState<listRespostaPergunta>([]);
  const [enviar, setEnviar] = useState(false);
  const [qtdPerguntas, setQtdPerguntas] = useState(0);
  const [carregando, setCarregando] = useState(true);

  // Initialize user data from localStorage after component mounts
  useEffect(() => {
    const id = localStorage.getItem("idUsuario");
    const parsedId = id ? Number(id) : null;
    setUsuarioId(parsedId);
    
    if (parsedId) {
      setDados({
        usuarioId: parsedId,
        metodoEnvio: "email",
        respostas: [],
      });
      setCarregando(false);
    }
  }, []);

  const handleNextStep = (newData: any) => {
    setDados((prev: any) => {
      const updatedRespostas = prev.respostas.map((resposta:any, index:number) => {
        if (index === idAtual) {
          return {
            ...resposta,
            ...newData,
          };
        }
        return resposta;
      });
  
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

    if (qtdPerguntas - 1 != idAtual ) {
      setIdAtual(idAtual + 1);
    } else {
      setCarregando(true);
    }
  };

  const handlePrevStep = (newData: any) => {
    // ... rest of handlePrevStep implementation remains the same
  };

  useEffect(() => {
    if (enviar && dados) {
      const enviarCronograma = async () => {
        setEnviar(false);
        try {
          router.push("/cronograma");
        } catch (error) {
          console.error("Erro ao enviar os dados:", error);
        }
      };
  
      enviarCronograma();
    }
  }, [dados, enviar, router]);

  useEffect(() => {
    const fetchPerguntas = async () => {
      try {
        const response = await api.get("/pergunta");
        const perguntas = response.data.data;
        setQtdPerguntas(perguntas.length);

        if (perguntas.length > 0) {
          setTodasPerguntas(perguntas);

          const novasRespostas = perguntas.map((pergunta: any) => ({
            perguntaId: pergunta.id,
            respostaId: "",
          }));

          setDados((prev: any) => ({
            ...prev,
            respostas: novasRespostas,
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar perguntas:", error);
      }
    };

    if (usuarioId) {
      fetchPerguntas();
    }
  }, [usuarioId]);

  useEffect(() => {
    if (todasPerguntas.length > 0) {
      const perguntaRecebida = todasPerguntas[idAtual];
      setPergunta(perguntaRecebida?.pergunta || "");
      setRespostas(
        perguntaRecebida?.respostas.map((r: any) => ({
          texto: r.texto_resposta,
          id: r.id,
        })) || []
      );
    }
  }, [idAtual, todasPerguntas]);

  if (!dados) {
    return <LoadPage />;
  }

  return (
    !carregando ? (
      <div 
        className="flex flex-col items-center justify-center min-h-screen w-full h-full"
        style={{ backgroundImage: "url('background_cadastro.png')" }}
      >
        <div className="mt-44">
          <LogoHorizontalLaranja />
        </div>

        <PaginaAtual 
          idAtual={idAtual} 
          pergunta={pergunta} 
          respostas={respostas} 
          data={dados}
          nextStep={handleNextStep}
          prevStep={handlePrevStep}
          prevRespostas={jaResolvidas}
          qtdPerguntas={qtdPerguntas}
          enviar={enviar}
          setEnviar={setEnviar} 
        />
      </div>
    ) : (
      <LoadPage/>
    )
  );
};

export default Questionario;