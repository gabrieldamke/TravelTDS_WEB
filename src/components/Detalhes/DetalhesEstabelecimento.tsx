import React from "react";
import { Hotel, AtracaoTuristica, Restaurante } from "../../Api/ApiProvider";

type ItemType = Hotel | AtracaoTuristica | Restaurante | undefined;

interface DetalhesEstabelecimentoProps<T> {
  estabelecimento: T;
}

const DetalhesEstabelecimento: React.FC<
  DetalhesEstabelecimentoProps<ItemType>
> = ({ estabelecimento }) => {
  if (estabelecimento instanceof Hotel) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Detalhes do Hotel</h2>
        <p>ID: {estabelecimento.id}</p>
        <p>Nome: {estabelecimento.nome}</p>
        <p>Endereço: {estabelecimento.local?.endereco}</p>
        <p>Classificação: {estabelecimento.classificacao}</p>
        <p>Tipos de Quarto:</p>
        <ul>
          {estabelecimento.tiposQuarto &&
            estabelecimento.tiposQuarto.map((quarto, index) => (
              <li key={index}>
                {quarto.nome} - Preço: R${quarto.precoDiaria}
              </li>
            ))}
        </ul>
        <img
          src={`data:image/png;base64,${estabelecimento.imagemBase64}`}
          alt="Imagem do hotel"
        />
      </div>
    );
  }

  if (estabelecimento instanceof AtracaoTuristica) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          Detalhes da Atração Turística
        </h2>
        <p>ID: {estabelecimento.id}</p>
        <p>Nome: {estabelecimento.nome}</p>
        <p>Descrição: {estabelecimento.descricao}</p>
        <p>Valor do Ingresso: R${estabelecimento.valorIngresso}</p>
        <img
          src={`data:image/png;base64,${estabelecimento.imagemBase64}`}
          alt="Imagem da atração turística"
        />
      </div>
    );
  }

  if (estabelecimento instanceof Restaurante) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Detalhes do Restaurante</h2>
        <p>ID: {estabelecimento.id}</p>
        <p>Nome: {estabelecimento.nome}</p>
        <p>Local: {estabelecimento.local?.cidade}</p>
        <p>Tipo de Cozinha: {estabelecimento.tipoCozinha?.nome}</p>
        <p>Valor Médio: R${estabelecimento.valorMedio}</p>
        <img
          src={`data:image/png;base64,${estabelecimento.imagemBase64}`}
          alt="Imagem do restaurante"
        />
      </div>
    );
  }

  return null;
};

export default DetalhesEstabelecimento;
