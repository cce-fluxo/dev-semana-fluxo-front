"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/services/axios";
import PaginaAtual from "@/components/PaginaAtual";
import LoadPage from "@/components/LoadPage";
import LogoHorizontalLaranja from "../../../components/LogoHorizontalLaranja";
import withClient from "@/app/utils/withClient";



//Isso aqui é um tipo para uso interno do codigo
type respostaId = {
  id: number;
  texto: string;
};

//Isso aqui é um tipo para uso interno do codigo
type respostaPergunta = {
  idResolvida: number;
  idResposta: number;
};

type listRespostaId = respostaId[];
type listRespostaPergunta = respostaPergunta[];

const Questionario: React.FC = () => {
  const router = useRouter();
  const usuarioId = Number(localStorage.getItem("idUsuario")); // pegar qual usuario esta logado no momento (Tem que fazer para o codigo todo, acho que com context)

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
  const [jaResolvidas, setJaResolvidas] = useState<listRespostaPergunta>([]); //lista com as perguntas e as respostas que ja foram marcadas, serve para deixar marcada a resposta se o usuario mudar de pagina
  const [enviar, setEnviar] = useState(false); //vira true na ultima pergunta serve para enviar para o back
  const [qtdPerguntas, setQtdPerguntas] = useState(0);//verifica quantas perguntas tem (é mais para controle interno do codigo)
  const [carregando, setCarregando] = useState(false); //verifica se a pagina esta carregando

  //Atualiza para a proxima pagina se clicar no botao voltar e atualiza as informações
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

    //Verifica se uma pergunta ja foi resolvida
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
    if (qtdPerguntas - 1 != idAtual ) {
      setIdAtual(idAtual + 1);
    }else {
      setCarregando(true);
    }
  };


  //Atualiza para a proxima pagina se clicar no botao voltar e atualiza as informações
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

  //Envia as respostas do usuario para o Back
  useEffect(() => {
    if (enviar) {
      const enviarCronograma = async (data: any) => {
        setEnviar(false);
        try {
          // Envia os dados no corpo da requisição
          const response = await api.post("/submit", data);
          router.push("/cronograma");
          // Opcional: processe ou retorne a resposta
        } catch (error) {
          console.error("Erro ao enviar os dados:", error);
          // Opcional: trate o erro conforme necessário
        }
      };
  
      // Chama a função passando os dados
      enviarCronograma(dados);
    }
  }, [dados]);

  // Pega as perguntas do back
  useEffect(() => {
    const fetchPerguntas = async () => {
      try {
        const response = await api.get("/pergunta"); // Aguarda a resposta da API
        const perguntas = response.data.data;
        setQtdPerguntas(perguntas.length);

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
  }, []); 

  // Atualiza a pergunta e as respostas quando `idAtual` muda, ou seja quando trocamos de pagina
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

   //Apenas para teste, retirar do codigo final
   useEffect(() =>{
    console.log(dados);
    console.log(respostas);
    console.log("Ja resolvida", jaResolvidas);
    console.log("qtdPerguntas", qtdPerguntas);
    console.log("Esta carregando", carregando);
  }, [dados, respostas, jaResolvidas, qtdPerguntas, carregando])

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
      <LoadPage />
    )
  );
};

export default withClient(Questionario);
