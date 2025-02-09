import React from "react";

interface ButtonProps {
  onClick: () => void;
  text: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled} // Bloquear clique quando estiver carregando
      className={`w-full h-52 font-bold text-green-800 ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
      }`}
      style={{ backgroundColor: "#BAD66B" }}
    >
      {disabled ? "Carregando..." : text}
    </button>
  );
};

export default Button;

