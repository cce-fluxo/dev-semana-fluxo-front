"use client";

import React, { useEffect, useState } from "react";
import OrangeButton from "../../../../components/Button";
import LogoHorizontalLaranja from "../../../../components/LogoHorizontalLaranja";
import { useRouter } from "next/navigation";
import api from "@/app/services/axios";

const PaginaCadastro: React.FC = () => {
  const router = useRouter();
  const usuarioId = 1; //pegar qual usuario esta logado no momento;
  const handleBackToHome = () => {
    router.push("/");
  };

  //requiscao backend
  const [dados, setDados] = useState ({
    usuarioId: usuarioId,
    metodoEnvio: "email",
    respostas: [],
  });

  const [qtdPerguntas, setQtdPerguntas] = useState(0); //quantas perguntas foram recebidas
  const [pergunta, setPergunta] = useState(""); //texto da pergunta recebida
  const [respostas, setRespostas] = useState([]); //lista com o texto das respostas
  const paginas: string[] = []; //rotas que serao disponiveis com base na qtd de pergunta
  const [idAtual, setIdAtual] = useState (0); //id da pergunta atual

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPerguntas(); //faz a requisição pro back das perguntas
      const todasPerguntas = response.data.data; //armazena todas as perguntas

      if (response.data?.data.length > 0) {

        const perguntaRecebida = todasPerguntas[idAtual]; //pega a pergunta atual pelo Id
        setPergunta(perguntaRecebida.pergunta); // Pega o texto da pergunta
        setRespostas(perguntaRecebida.respostas.map((r:any) => r.texto_resposta)); //pega o texto das respostas da pergunta
        setQtdPerguntas(response.data.data.length); //pega a quantidade de perguntas recebidas
        for (let i = 0; i < qtdPerguntas; i++){ //Guarda quais serao as rotas com base na qtd de perguntas recebidas
          paginas.push(`questionario/${i}`)
        }

        //*PREPARANDO OS DADOS QUE SERAO ENVIADOS AO FINAL DO FORMULARIO*//
        const novasRespostas = todasPerguntas.map((pergunta: any) => ({
          perguntaId: pergunta.id, // Assumindo que 'id' existe na resposta da API
          respostaId: "" // Inicialmente vazio
        }));
  
        // Atualizar o estado 'dados' com as novas respostas
        setDados(prev => ({
          ...prev,
          respostas: novasRespostas
        })); //Dados prontos para serem usados;

        console.log("qtd perguntas", qtdPerguntas);
        console.log(paginas);
        console.log(dados);
      }
    };

    fetchData();
  }, [qtdPerguntas]);


  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex justify-center mt-44">
        <LogoHorizontalLaranja />
      </div>

      <div className="flex-grow flex flex-col mt-28">
        <h1 className="text-black text-5xl leading-snug font-bold ml-12">
          <div>Questão {idAtual + 1}</div>
        </h1>
        <p className="mt-12 text-black text-4xl ml-12">
          {pergunta || "Carregando"}
        </p>

        <div className="mt-16 space-y-6 px-14"> 
          {respostas.length > 0  ? respostas.map((resposta, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-r from-gray-100 to-orange-100 rounded-lg shadow-md flex flex-col w-full"
            >
              <div className="p-10">
                <h2 className="text-black text-4xl">{resposta}</h2>
              </div>
            </div>
          )) :<div className="relative bg-gradient-to-r from-gray-100 to-orange-100 rounded-lg shadow-md flex flex-col w-full">
                  <div className="p-10">
                    <h2 className="text-black text-4xl"></h2>
                  </div>
                </div>}
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

//retorna todas as perguntas
async function getPerguntas() {
  try {
    const response = await api.get("/pergunta");
    return response;
  } catch (error) {
    console.error("Erro ao buscar perguntas:", error);
    return { data: { data: [] } }; // Retorna um formato esperado para evitar erro
  }
}
