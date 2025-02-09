"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import OrangeButton from "../../../components/Button";
import LogoHorizontalLaranja from "../../../components/LogoHorizontalLaranja";

const PaginaPrincipal: React.FC = () => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const firstImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {

    const img = new Image();
    img.src = "/foto1.png";
    img.onload = () => {
      setContainerDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
  }, []);

  const handleButtonClick = () => {
    router.push("/qrcode");
  };

  const images = [
    "/foto1.png",
    "/foto2real.jpeg",
    "/foto3.jpg"
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex justify-center mt-40">
        <LogoHorizontalLaranja />
      </div>

      <div className="flex-grow flex flex-col justify-center px-20">
        <h1 className="text-black text-3xl leading-snug m-6">
          A <strong>Semana Fluxo (SEF)</strong> é um evento anual gratuito voltado ao <strong>público universitário</strong>, organizado pela <strong>Fluxo Consultoria</strong>, empresa júnior da UFRJ.
        </h1>

        {/* Carrossel */}
        <div className="relative mt-10 flex flex-col items-center">
          <div 
            className="relative flex justify-center items-center overflow-hidden rounded-2xl"
            style={{
              width: `${containerDimensions.width}px`,
              height: `${containerDimensions.height}px`,
              maxWidth: '100%',
              margin: '0 auto',
            }}
          >
            <button 
              onClick={previousImage}
              className="absolute left-0 z-10 p-4 bg-orange-500 rounded text-white hover:bg-orange-600"
            >
              ←
            </button>
            
            <img
              ref={currentImageIndex === 0 ? firstImageRef : null}
              src={images[currentImageIndex]}
              alt={`Imagem ${currentImageIndex + 1}`}
              className="w-full h-full object-contain rounded-2xl"
            />
            
            <button 
              onClick={nextImage}
              className="absolute right-0 z-10 p-4 bg-orange-500 rounded text-white hover:bg-orange-600"
            >
              →
            </button>
          </div>
          
          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentImageIndex === index ? "bg-orange-500" : "bg-gray-300"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <p className="mt-10 text-black text-3xl leading-relaxed ml-6">
          O principal objetivo é <strong>conectar</strong> os estudantes ao mercado de trabalho, apresentando <strong>possibilidades de carreira</strong> para futuros profissionais de engenharia e áreas correlatas.
          Por meio de palestras, workshops e estandes interativos, o evento promove o <strong>contato direto com empresas</strong>, oferecendo uma visão prática e atualizada das demandas e oportunidades profissionais.
        </p>

        <div className="flex justify-end -mt-8">
          <img
            src="/qrcode.png"
            alt="QR Code"
            className="w-42 h-36"
          />
        </div>
      </div>

      <div className="flex items-center justify-center h-52 text-4xl">
        <OrangeButton onClick={handleButtonClick} text="Prosseguir" />
      </div>
    </div>
  );
};

export default PaginaPrincipal;
