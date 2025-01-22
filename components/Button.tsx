import React from "react";

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="w-full h-52 bg-orange-500 text-white font-bold"
      style={{ backgroundColor: "#CC5831" }}
    >
      {text}
    </button>
  );
};

export default Button;

