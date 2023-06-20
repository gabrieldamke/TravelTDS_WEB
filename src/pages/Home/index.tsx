import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import React, { useMemo } from "react";
import { GetAllHoteisAsync } from "../../store/Hotel.store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import CardHorizontal, {
  TamanhoCard,
} from "../../components/CardsExibir/CardHorizontal";
import ArrayCardsHorizontais from "../../components/CardsExibir/ArrayCardsHorizontais";
export default function Home() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const hoteis = useSelector((root: RootState) => root.hotelState.hotel);

  React.useEffect(() => {
    dispatch(GetAllHoteisAsync());
  }, []);

  return (
    <main>
      <Header />
      <div className="bg-blue-900 py-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Planeje sua próxima viagem
          </h1>
          <p className="text-xl text-white">
            Descubra excelentes opções de hospedagem, restaurantes e atrações
            turísticas que se adequam ao seu orçamento.
          </p>
        </div>
      </div>
      <div className="container mx-auto">
        <ArrayCardsHorizontais
          items={hoteis}
          titulo="Descubra os Melhores Hotéis para Você!"
          subtitulo="As Opções Mais Populares!"
          tamanho={TamanhoCard.ExtraPequeno}
        />
      </div>
    </main>
  );
}
