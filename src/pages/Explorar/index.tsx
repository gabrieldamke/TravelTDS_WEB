import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import React, { useMemo } from "react";
import { GetAllHoteisAsync } from "../../store/Hotel.store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import CardHorizontal, {
  TamanhoCard,
} from "../../components/CardsExibir/CardHorizontal";
import ArrayCardsHorizontais from "../../components/CardsExibir/ArrayCardsHorizontais";
import { GetAllAtracoesTuristicasAsync } from "../../store/AtracaoTuristica.store";
import { GetAllRestaurantesAsync } from "../../store/Restaurante.store";
import { GetUsuarioByEmailAsync } from "../../store/Usuario.store";
export default function Home() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const hoteis = useSelector((root: RootState) => root.hotelState.hoteis);
  const atracoes = useSelector(
    (root: RootState) => root.atracaoTuristicaState.atracoesTuristicas
  );
  const restaurantes = useSelector(
    (root: RootState) => root.restauranteStore.restaurantes
  );

  const navigate = useNavigate();

  const getAuth = () => {
    if (
      localStorage.getItem("auth") === null ||
      localStorage.getItem("auth") === undefined
    ) {
      return undefined;
    } else
      return dispatch(
        GetUsuarioByEmailAsync(String(localStorage.getItem("Auth")))
      );
  };
  React.useEffect(() => {
    dispatch(GetAllHoteisAsync());
    dispatch(GetAllAtracoesTuristicasAsync());
    dispatch(GetAllRestaurantesAsync());
  }, []);

  React.useEffect(() => {
    console.log(hoteis);
    console.log(atracoes);
  }, [atracoes, hoteis]);
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
      <div className="container mx-auto px-12">
        <ArrayCardsHorizontais
          items={restaurantes}
          titulo="Desfrute de uma experiência gastronômica inesquecível!"
          subtitulo="Delicie-se com pratos cuidadosamente preparados em um ambiente sofisticado!"
          tamanho={TamanhoCard.ExtraPequeno}
        />
      </div>
      <div className="container mx-auto px-12">
        <ArrayCardsHorizontais
          items={atracoes}
          titulo="Descubra as maravilhas turísticas do mundo!"
          subtitulo="Explore uma variedade encantadora de destinos incríveis!"
          tamanho={TamanhoCard.ExtraPequeno}
        />
      </div>
      <div className="container mx-auto px-12">
        <ArrayCardsHorizontais
          items={hoteis}
          titulo="Descubra os Melhores Hotéis para Você!"
          subtitulo="As Opções Mais Populares!"
          tamanho={TamanhoCard.ExtraPequeno}
        />
      </div>
      <Footer />
    </main>
  );
}
