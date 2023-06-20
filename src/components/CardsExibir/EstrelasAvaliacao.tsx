import React from "react";

interface EstrelasProps {
  classificacao: number;
}

const Estrelas: React.FC<EstrelasProps> = ({ classificacao }) => {
  const renderizarEstrelas = () => {
    const estrelas: JSX.Element[] = [];
    for (let i = 1; i <= 10; i++) {
      const corEstrela: "yellow" | "gray" = i <= classificacao ? "yellow" : "gray";
      estrelas.push(
        <span
          key={i}
          className={`text-2xl mr-1 ${
            corEstrela === "yellow" ? "text-yellow-500" : "text-gray-500"
          }`}
        >
          ★
        </span>
      );
    }
    return estrelas;
  };

  return <div className="flex items-center">{renderizarEstrelas()}</div>;
};

export default Estrelas;