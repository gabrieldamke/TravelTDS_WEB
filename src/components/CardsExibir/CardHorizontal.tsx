import React from "react";
import { Hotel, AtracaoTuristica, Restaurante } from "../../Api/ApiProvider";
import Estrelas from "./EstrelasAvaliacao";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const onClick = () => {
    let tipo = "" as string;
    let id = "" as string;
    if (item instanceof AtracaoTuristica) {
      tipo = "atracaoturistica";
      id = String(item.id);
    } else if (item instanceof Restaurante) {
      tipo = "restaurante";
      id = String(item.id);
    } else if (item instanceof Hotel) {
      tipo = `hotel`;
      id = String(item.id);
    }
    navigate(`/detalhes/${tipo}/${id}`);
  };
  const converterBase64ParaImagem = (base64String: string) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  const renderizarConteudo = (item: ItemType) => {
    if (item instanceof Hotel) {
      const { id, nome, local, classificacao, imagemBase64 } = item;
      const imagem = imagemBase64
        ? converterBase64ParaImagem(imagemBase64)
        : null;
      return (
        <>
          {imagem && (
            <img
              src={imagem}
              alt="Imagem do Hotel"
              className="mb-2 h-48 w-48 object-cover rounded-lg shadow-lg"
            />
          )}
          <h2 className="text-lg font-semibold">{nome}</h2>
          <p>{local?.endereco}</p>
          <Estrelas
            classificacao={classificacao === undefined ? 0 : classificacao}
          />
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
              className="mb-2 h-48 w-48 object-cover rounded-lg shadow-lg"
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
            <img
              src={imagem}
              alt="Imagem do Restaurante"
              className="mb-2 h-48 w-48 object-cover rounded-lg shadow-lg"
            />
          )}
          <h2 className="text-lg font-semibold">{nome}</h2>
          <p>Local: {local?.cidade}</p>
          <p>Tipo de Cozinha: {tipoCozinha?.nome}</p>
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
      } shadow-lg`}
      onClick={onClick}
    >
      {renderizarConteudo(item)}
    </div>
  );
};

export default CardHorizontal;
