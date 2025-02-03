"use client";

import React, { useState } from "react";
import OrangeButton from "../../../../components/Button";
import LogoHorizontalLaranja from "../../../../components/LogoHorizontalLaranja";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/axios";

const PaginaCadastro: React.FC = () => {
  const router = useRouter();
  const { setToken } = useAuth();

  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    periodo: "",
    curso: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBackToHome = async () => {
    try {
      const response = await api.post("/usuario", {
        nome: formData.nomeCompleto,
        email: formData.email,
        periodo: formData.periodo,
        curso: formData.curso,
      }); //KKKKKKKKKKK mt feio kkkkkkkkkkk

      const { token } = response.data; // Supondo que o backend retorna um token
      setToken(token);

      console.log("Usuário cadastrado com sucesso:", response.data);
      router.push("/qrcode");
    } catch (error: any) {
      console.error("Erro ao cadastrar usuário:", error.response?.data || error.message);
      alert("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div
      className="flex flex-col h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/background_diferente.png')",
      }}
    >
      <div className="flex justify-center mt-44">
        <LogoHorizontalLaranja />
      </div>

      <div className="flex justify-center mt-28 text-5xl text-black">
        <p>Insira suas informações</p>
      </div>

      <div className="flex flex-col items-center mt-32 px-12 w-full">
        <label htmlFor="nomeCompleto" className="text-black text-4xl mb-4 w-full text-left">
          Nome Completo
        </label>
        <input
          type="text"
          id="nomeCompleto"
          name="nomeCompleto"
          placeholder="Digite seu nome completo"
          value={formData.nomeCompleto}
          onChange={handleChange}
          className="border-4 border-gray-400 bg-transparent text-black px-4 py-8 rounded-xl w-full text-4xl"
        />
      </div>

      <div className="flex flex-col items-center mt-6 px-12 w-full">
        <label htmlFor="email" className="text-black text-4xl mb-10 w-full text-left">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite seu e-mail"
          value={formData.email}
          onChange={handleChange}
          className="border-4 border-gray-400 bg-transparent text-black px-4 py-8 rounded-xl w-full text-4xl"
        />
      </div>

      <div className="flex flex-col items-center mt-6 px-12 w-full">
        <label htmlFor="periodoCurso" className="text-black text-4xl mb-10 w-full text-left">
          Período e Curso
        </label>
        <div className="flex w-full gap-1">
          <input
            type="text"
            id="periodo"
            name="periodo"
            placeholder="Digite o período"
            value={formData.periodo}
            onChange={handleChange}
            className="border-4 border-gray-400 bg-transparent text-black px-4 py-8 rounded-xl w-1/2 text-4xl"
          />
          <input
            type="text"
            id="curso"
            name="curso"
            placeholder="Digite o curso"
            value={formData.curso}
            onChange={handleChange}
            className="border-4 border-gray-400 bg-transparent text-black px-4 py-8 rounded-xl w-1/2 text-4xl"
          />
        </div>
      </div>

      <div className="flex-grow flex items-end justify-center h-54 text-4xl">
        <OrangeButton onClick={handleBackToHome} text="Cadastre-se" />
      </div>
    </div>
  );
};

export default PaginaCadastro;
