import React from "react";
import CardHorizontal, { ItemType, TamanhoCard } from "./CardHorizontal";

interface ArrayCardsHorizontaisProps {
  items: ItemType[];
  titulo?: string;
  subtitulo?: string;
  tamanho: TamanhoCard;
}

const ArrayCardsHorizontais: React.FC<ArrayCardsHorizontaisProps> = ({
  items,
  titulo,
  subtitulo,
  tamanho,
}) => {
  if (items.length === 0) {
    return null;
  }
  return (
    <div>
      {titulo && <h1 className="text-2xl font-bold mb-1">{titulo}</h1>}
      {subtitulo && <h2 className="text-lg font-regular mb-2 text-gray-500">{subtitulo}</h2>}
      <div className="flex space-x-4">
        {items.map((item, index) => (
          <CardHorizontal key={index} item={item} tamanho={tamanho} />
        ))}
      </div>
    </div>
  );
};

export default ArrayCardsHorizontais;
