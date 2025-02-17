import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function PaginaAtual(props: any) {
  let idRespostaInicio = null;
  const prevResposta = props.prevRespostas.find(
    (res: any) => res.idResolvida === props.idAtual
  );
  if (prevResposta) {
    idRespostaInicio = prevResposta.idResposta;
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object({
    respostaId: Yup.string().required("Você precisa selecionar uma resposta antes de continuar."),
  });

  return (
    <div className="flex flex-col w-[100vw] py-4 justify-around min-h-screen">
      <h1 className="text-5xl font-semibold text-black mt-48 ml-16">Questão {props.idAtual + 1}</h1>
      <h2 className="text-4xl text-black mt-12 ml-16">{props.pergunta}</h2>

      <Formik
        key={props.idAtual}
        enableReinitialize={true}
        initialValues={{ respostaId: idRespostaInicio || "" }}
        validationSchema={validationSchema} // Adicionando a validação
        onSubmit={(values) => {
          if (props.qtdPerguntas - 1 === props.idAtual) {
            props.setEnviar(true);
          }
          props.nextStep({ respostaId: Number(values.respostaId) });
        }}
      >
        {({ values }) => (
          <Form className="flex flex-col flex-grow mt-14 px-12">
            {props.respostas.map((res: any) => (
              <div key={res.id} className="mb-6">
                <Field
                  type="radio"
                  name="respostaId"
                  value={res.id}
                  id={`resposta-${res.id}`}
                  className="hidden"
                />
                <label
                  htmlFor={`resposta-${res.id}`}
                  className={`flex p-10 border-2 cursor-pointer transition-all duration-200 ${
                    String(values.respostaId) === String(res.id)
                      ? "bg-[#BAD66B] text-green-800 text-4xl"
                      : "bg-white text-4xl text-black hover:bg-gray-200 rounded-xl shadow-lg"
                  }`}
                >
                  {res.texto}
                </label>
              </div>
            ))}

            {/* Mensagem de erro se nenhuma resposta for selecionada */}
            <ErrorMessage
              name="respostaId"
              component="div"
              className="text-red-500 text-4xl mt-2"
            />

            {props.idAtual !== 0 && (
              <button
                type="button"
                className="w-82 mt-6 p-6 text-green-800 text-3xl ml-auto bg-[#BAD66B]"
                onClick={() =>
                  props.prevStep({
                    respostaId:
                      values.respostaId !== ""
                        ? Number(values.respostaId)
                        : idRespostaInicio,
                  })
                }
              >
                ← Voltar à anterior
              </button>
            )}

            <div className="fixed bottom-0 left-0 w-full flex flex-col items-center">
              {/* QR Code acima do botão */}
              <img src="/qrcode.png" alt="QR Code" className="w-32 h-32 mb-12 ml-auto mr-8" />

              {/* Botão verde de próxima questão */}
              <button
                type="submit"
                className="w-full h-52 p-4 text-4xl font-bold text-green-800 bg-[#BAD66B]"
              >
                {props.qtdPerguntas - 1 === props.idAtual ? "Enviar" : "Próxima Questão"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}




{/* <div className="flex flex-col min-h-screen bg-white">
// <div className="flex justify-center mt-44">
//   <LogoHorizontalLaranja />
// </div>

// <div className="flex-grow flex flex-col mt-28">
//   <h1 className="text-black text-5xl leading-snug font-bold ml-12">
//     <div>Questão {props.idAtual + 1}</div>
//   </h1>
//   <p className="mt-12 text-black text-4xl ml-12">
//     {props.pergunta || "Carregando"}
//   </p>

//   <div className="mt-16 space-y-6 px-14"> 
//     {props.respostas.length > 0  ? props.respostas.map((resposta:any, index:any) => (
//       <div
//         key={index}
//         className="relative bg-gradient-to-r from-gray-100 to-orange-100 rounded-lg shadow-md flex flex-col w-full"
//       >
//         <div className="p-10">
//           <h2 className="text-black text-4xl">{resposta}</h2>
//         </div>
//       </div>
//     )) :<div className="relative bg-gradient-to-r from-gray-100 to-orange-100 rounded-lg shadow-md flex flex-col w-full">
//             <div className="p-10">
//               <h2 className="text-black text-4xl"></h2>
//             </div>
//           </div>}
//           </div>
//         </div>*/}

// {/* Adicionando o QR Code na extrema direita 
// <div className="flex justify-end items-center mt-12 px-8">
//   <img
//     src="/qrcode.png"
//     alt="QR Code"
//     className="w-42 h-36"
//   />
// </div>*/}

// {/* Botão com espaçamento adicional 
// <div className="flex items-center justify-center h-52 text-4xl mt-16">

//   <OrangeButton onClick={props.prevStep} text="Voltar" />
//   <OrangeButton onClick={props.nextStep} text="Próxima" />
// </div>
// </div>*/}