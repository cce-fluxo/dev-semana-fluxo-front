import { Field, Form, Formik } from "formik";

type respostaSelecionada = {
  id: number; // Apenas o ID da resposta
};

export default function PaginaAtual(props: any) {
  return (
    <div className="flex flex-col w-[100vw] py-4 justify-around border-2 border-black">
      <h1 className="">{props.pergunta}</h1>
      <Formik
        initialValues={{ respostaSelecionada: 0 }} // Define um valor inicial (0 ou qualquer ID default)
        onSubmit={(values) => {
          console.log('Resposta Selecionada:', values.respostaSelecionada); // Aqui você verá o id selecionado
          props.nextStep(values);
        }}
      >
        {({ values }) => (
          <Form>
            {/* Mapeia as respostas com radio buttons */}
            {props.respostas.map((res: any) => (
              <div key={res.id} className="mb-4">
                {/* Esconde o radio button */}
                <Field 
                  type="radio" 
                  name="respostaSelecionada" // Aqui o name será "respostaSelecionada"
                  value={res.id} // O valor será o ID da resposta
                  id={`resposta-${res.id}`} // Adiciona um id único
                  className="hidden" // Esconde a bolinha
                />
                {/* Estiliza o label para parecer um botão */}
                <label
                  htmlFor={`resposta-${res.id}`} 
                  className={`flex p-4 border-2 cursor-pointer transition-all duration-200 ${
                    values.respostaSelecionada === res.id
                      ? 'bg-blue-500 text-white' // Estilo quando selecionado
                      : 'bg-white text-black hover:bg-gray-200'
                  }`}
                >
                  {res.texto}
                </label>
              </div>
            ))}

            <button type="submit" className="mt-4 p-2 bg-blue-500 text-white">
              Próximo
            </button>
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