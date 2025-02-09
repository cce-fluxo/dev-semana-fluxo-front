"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import OrangeButton from "../../../components/Button";
import LogoHorizontalLaranja from "../../../components/LogoHorizontalLaranja";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/axios";

// Definir esquema de validação
const schema = yup.object().shape({
  nomeCompleto: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  periodo: yup.string().required("Período é obrigatório"),
  curso: yup.string().required("Curso é obrigatório"),
});

const PaginaCadastro: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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
      router.push("/sefques");
    } catch (error: any) {
      console.error("Erro ao cadastrar usuário:", error.response?.data || error.message);
      alert("Erro ao cadastrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background_cadastro.png')" }}
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

        <label htmlFor="periodoCurso" className="text-black text-4xl mb-10 w-full text-left mt-6">
          Período e Curso
        </label>
        <div className="flex w-full gap-1">
          <input
            type="text"
            id="periodo"
            {...register("periodo")}
            placeholder="Digite o período"
            className="border-4 border-gray-400 bg-transparent text-black px-4 py-8 rounded-xl w-1/2 text-4xl"
          />
          <input
            type="text"
            id="curso"
            {...register("curso")}
            placeholder="Digite o curso"
            className="border-4 border-gray-400 bg-transparent text-black px-4 py-8 rounded-xl w-1/2 text-4xl"
          />
        </div>
        <p className="text-red-500 text-4xl flex w-full justify-between">
            <span>{errors.periodo?.message}</span>
            <span>{errors.curso?.message}</span>
        </p>
      </form>
        <div className="flex-1 w-full flex items-end text-4xl">
          <OrangeButton onClick={handleSubmit(handleBackToHome)} text="Cadastre-se" disabled={loading} />
        </div>
    </div>
  );
};

export default PaginaCadastro;
