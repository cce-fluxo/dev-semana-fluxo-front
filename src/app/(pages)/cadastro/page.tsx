"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import OrangeButton from "../../../components/Button";
import LogoHorizontalLaranja from "../../../components/LogoHorizontalLaranja";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/axios";
import Dropdown from "../../../components/Dropdown";

const periodos = Array.from({ length: 15 }, (_, i) => i + 1);

const cursos = [
    "Administração",
    "Arquitetura e Urbanismo",
    "Artes Cênicas",
    "Artes Visuais - Escultura",
    "Artes Visuais - Gravura",
    "Astronomia",
    "Bacharelado em Letras",
    "Bacharelado em Psicologia",
    "Bacharelado em Química - M",
    "Biblioteconomia e Gestão de Unid Informação",
    "Biblioteconomia Gestão Unid Inform - Cid Univ",
    "Ciência da Computação",
    "Ciências Atuariais",
    "Ciências Atuariais / Estatística (Básico)",
    "Ciências Biológicas (Básico)",
    "Ciências Biológicas - M",
    "Ciências Biológicas - Modalidade Médica",
    "Ciências Biológicas: Biofísica",
    "Ciências Biológicas: Biofísica - X",
    "Ciências Biológicas: Biotecnologia - X",
    "Ciências Biológicas: Microbiol e Imunologia",
    "Ciências Contábeis",
    "Ciências Contábeis - Cid Univ",
    "Ciências Contábeis - EAD",
    "Ciências Econômicas",
    "Ciências Matemáticas e da Terra",
    "Ciências Sociais",
    "Complexo de Formação de Professores",
    "Comunicação Social (Básico)",
    "Comunicação Visual Design",
    "Conservação e Restauração",
    "Dança",
    "Defesa e Gestão Estratégica Internacional",
    "Design de Interiores",
    "Design Industrial",
    "Direito",
    "Educação Física",
    "Enfermagem",
    "Enfermagem - M",
    "Engenharia (Básico)",
    "Engenharia (Núcleo Comum) - M",
    "Engenharia Ambiental",
    "Engenharia Civil - M",
    "Engenharia de Computação e Informação",
    "Engenharia de Controle e Automação",
    "Engenharia de Petróleo",
    "Engenharia de Produção - M",
    "Engenharia Matemática",
    "Engenharia Mecânica - M",
    "Escola de Química (Núcleo Comum)",
    "Estatística",
    "Farmácia",
    "Farmácia - M",
    "Filosofia",
    "Física",
    "Física Médica",
    "Fisioterapia",
    "Fonoaudiologia",
    "Gastronomia",
    "Geografia",
    "Geologia",
    "Gestão Pública Desenv Econômico e Social",
    "História",
    "História da Arte",
    "Jornalismo",
    "Letras",
    "Letras - Libras",
    "Licenciatura em Artes Visuais",
    "Licenciatura em Ciências Biológicas",
    "Licenciatura em Ciências Biológicas - EAD",
    "Licenciatura em Ciências Biológicas - M",
]

// Definir esquema de validação
const schema = yup.object().shape({
  nomeCompleto: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  periodo: yup.string().required("Período é obrigatório"),
  curso: yup.string().required("Curso é obrigatório"),
});

const PaginaCadastro: React.FC = () => {
  const router = useRouter();
  const { setToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange', // Adicione esta linha
  });

  const handleBackToHome = async (data: any) => {
    setLoading(true);
    try {
      const response = await api.post("/usuario", {
        nome: data.nomeCompleto,
        email: data.email,
        periodo: data.periodo,
        curso: data.curso,
      });

      const idUsuario = response.data.id;
      if (idUsuario) {
        localStorage.setItem("idUsuario", idUsuario);
      }

      console.log("Usuário cadastrado com sucesso:", response.data);
      setIsExiting(true);
      setTimeout(() => {
        router.push("/sefques");
      }, 500);
    } catch (error: any) {
      console.error("Erro ao cadastrar usuário:", error.response?.data || error.message);
      alert("Erro ao cadastrar. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background_cadastro.png')" }}
    >
      <motion.div
        className="flex flex-col min-h-screen"
        initial={{ x: 0 }}
        animate={{
          x: isExiting ? "-100vw" : 0,
          opacity: isExiting ? 0 : 1,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex justify-center mt-44">
          <LogoHorizontalLaranja />
        </div>

        <div className="flex justify-center mt-28 text-5xl text-black">
          <p>Insira suas informações</p>
        </div>

        <form onSubmit={handleSubmit(handleBackToHome)} className="flex flex-col items-center mt-32 w-full px-12">
          <label htmlFor="nomeCompleto" className="text-black text-4xl mb-4 w-full text-left">
            Nome Completo
          </label>
          <input
            type="text"
            id="nomeCompleto"
            {...register("nomeCompleto")}
            placeholder="Digite seu nome completo"
            className="border-4 border-gray-400 bg-transparent text-black px-4 py-8 rounded-xl w-full text-4xl"
          />
          <p className="text-red-500 text-4xl">{errors.nomeCompleto?.message}</p>

          <label htmlFor="email" className="text-black text-4xl mb-10 w-full text-left mt-6">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="Digite seu e-mail"
            className="border-4 border-gray-400 bg-transparent text-black px-4 py-8 rounded-xl w-full text-4xl"
          />
          <p className="text-red-500 text-4xl">{errors.email?.message}</p>

          <div className="flex w-full gap-6 mt-8">
            <Dropdown id="periodo" label="Período" options={periodos} register={register} error={errors.periodo?.message} />
            <Dropdown id="curso" label="Curso" options={cursos} register={register} error={errors.curso?.message} />
          </div>

        </form>

        <div className="flex-1 w-full flex items-end text-4xl">
          <OrangeButton onClick={handleSubmit(handleBackToHome)} text="Cadastre-se" disabled={loading} />
        </div>
      </motion.div>
    </div>
  );
};

export default PaginaCadastro;