"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import OrangeButton from "../../../components/Button";

const PaginaPrincipal: React.FC = () => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const firstImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (firstImageRef.current) {
        setContainerDimensions({
          width: firstImageRef.current.naturalWidth,
          height: firstImageRef.current.naturalHeight,
        });
      }
    };

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
    router.push("/sefques");
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
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="flex-grow flex flex-col justify-center text-center px-20 mt-20">
        <h1 className="text-white text-3xl leading-snug">
          <span>
            A Semana Fluxo (SEF) é um evento anual gratuito voltado ao público universitário, organizado pela Fluxo Consultoria, empresa júnior da UFRJ.
          </span>
        </h1>

        {/* Carrossel */}
        <div className="relative mt-32 flex flex-col items-center">
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

        <p className="mt-28 text-white text-3xl leading-relaxed">
          O principal objetivo é conectar os estudantes ao mercado de trabalho, apresentando possibilidades de carreira para futuros profissionais de engenharia e áreas correlatas.
          Por meio de palestras, workshops e estandes interativos, o evento promove o contato direto com empresas, oferecendo uma visão prática e atualizada das demandas e oportunidades profissionais.
        </p>

        <div className="flex justify-end mt-44">
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