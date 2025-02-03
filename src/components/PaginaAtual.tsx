import LogoHorizontalLaranja from "./LogoHorizontalLaranja";
import OrangeButton from "./Button";
import router from "next/router";

const handleBackToHome = () => {
  router.push("/");
};

export default function PaginaAtual(props: any){
  return (
    <div className="flex flex-col min-h-screen bg-white">
    <div className="flex justify-center mt-44">
      <LogoHorizontalLaranja />
    </div>

    <div className="flex-grow flex flex-col mt-28">
      <h1 className="text-black text-5xl leading-snug font-bold ml-12">
        <div>Questão {props.idAtual + 1}</div>
      </h1>
      <p className="mt-12 text-black text-4xl ml-12">
        {props.pergunta || "Carregando"}
      </p>

      <div className="mt-16 space-y-6 px-14"> 
        {props.respostas.length > 0  ? props.respostas.map((resposta:any, index:any) => (
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

      <OrangeButton onClick={props.prevStep} text="Voltar" />
      <OrangeButton onClick={props.nextStep} text="Próxima" />
    </div>
  </div>
  );
}