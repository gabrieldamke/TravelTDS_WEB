import React from "react";
import { Hotel, AtracaoTuristica, Restaurante } from "../../Api/ApiProvider";
import Estrelas from "./EstrelasAvaliacao";

interface CardHorizontalProps<T> {
  item: T;
  tamanho: TamanhoCard;
}
export enum TamanhoCard {
  Pequeno,
  Medio,
  Grande,
  ExtraPequeno,
}
export type ItemType = Hotel | AtracaoTuristica | Restaurante;

const CardHorizontal: React.FC<CardHorizontalProps<ItemType>> = ({
  item,
  tamanho,
}) => {
  // Método para converter uma string base64 em imagem
  const converterBase64ParaImagem = (base64String: string) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  // Renderiza o conteúdo específico para cada tipo de item
  const renderizarConteudo = (item: ItemType) => {
    if (item instanceof Hotel) {
      const { id, nome, endereco, classificacao, imagemBase64 } = item;
      const imagem = imagemBase64
        ? converterBase64ParaImagem(imagemBase64)
        : null;
      return (
        <>
          {imagem && (
            <img src={imagem} alt="Imagem do Hotel" className="mb-2" />
          )}
          <h2 className="text-lg font-semibold">{nome}</h2>
          <p>{endereco}</p>
          <Estrelas classificacao={classificacao === undefined ? 0 : classificacao} />
        </>
      );
    } else if (item instanceof AtracaoTuristica) {
      const { id, nome, descricao, imagemBase64 } = item;
      const imagem = imagemBase64
        ? converterBase64ParaImagem(imagemBase64)
        : null;
      return (
        <>
          {imagem && (
            <img
              src={imagem}
              alt="Imagem da Atração Turística"
              className="mb-2"
            />
          )}
          <h2 className="text-lg font-semibold">{nome}</h2>
          <p>{descricao}</p>
        </>
      );
    } else if (item instanceof Restaurante) {
      const { id, nome, local, tipoCozinha, imagemBase64 } = item;
      const imagem = imagemBase64
        ? converterBase64ParaImagem(imagemBase64)
        : null;
      return (
        <>
          {imagem && (
            <img src={imagem} alt="Imagem do Restaurante" className="mb-2" />
          )}
          <h2 className="text-lg font-semibold">{nome}</h2>
          <p>Local: {local?.cidade}</p>
          <p>Tipo de Cozinha: {tipoCozinha}</p>
        </>
      );
    }
    return null;
  };

  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer ${
        tamanho === TamanhoCard.ExtraPequeno
          ? "w-1/5"
          : tamanho === TamanhoCard.Pequeno
          ? "w-1/4"
          : tamanho === TamanhoCard.Medio
          ? "w-1/3"
          : "w-1/2"
      }`}
    >
      {renderizarConteudo(item)}
    </div>
  );
};

export default CardHorizontal;
