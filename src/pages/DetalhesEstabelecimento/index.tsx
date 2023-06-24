import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import DetalhesEstabelecimento from "../../components/Detalhes/DetalhesEstabelecimento";
import { useParams } from "react-router-dom";
import { AtracaoTuristica, Hotel, Restaurante } from "../../Api/ApiProvider";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { GetRestaurantesById } from "../../store/Restaurante.store";
import { GetAtracaoTuristicaById } from "../../store/AtracaoTuristica.store";
import { GetHotelById, setHotel } from "../../store/Hotel.store";
import { RootState } from "../../store/store";

export default function DetalhesEstabelecimentoPage() {
  const params = useParams();
  const { tipo, id } = params;
  console.log(tipo, id);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const restaurante = useSelector(
    (root: RootState) => root.restauranteStore.restaurante
  );
  const hotel = useSelector((root: RootState) => root.hotelState.hotel);
  const atracaoturistica = useSelector(
    (root: RootState) => root.atracaoTuristicaState.atracaoTuristica
  );
  const [estabelecimentoSelecionado, setEstabelecimentoSelecionado] = useState<
    Restaurante | Hotel | AtracaoTuristica
  >();
  const onLoadPage = () => {
    if (tipo && id) {
      switch (tipo) {
        case "restaurante":
          dispatch(GetRestaurantesById(Number(id)));
          break;
        case "atracaoturistica":
          dispatch(GetAtracaoTuristicaById(Number(id)));
          break;
        case "hotel":
          dispatch(GetHotelById(Number(id)));
          break;
      }
    }
  };
  useEffect(() => {
    onLoadPage();
  }, []);

  useEffect(() => {
    if (restaurante.id) {
      setEstabelecimentoSelecionado(restaurante);
    } else if (hotel.id) {
      setEstabelecimentoSelecionado(hotel);
    } else if (atracaoturistica.id) {
      setEstabelecimentoSelecionado(atracaoturistica);
    }
  }, [restaurante, hotel, atracaoturistica]);
  return (
    <>
      <Header />
      {estabelecimentoSelecionado !== undefined && (
        <DetalhesEstabelecimento
          estabelecimento={estabelecimentoSelecionado}
        ></DetalhesEstabelecimento>
      )}
      {estabelecimentoSelecionado === undefined && (
        <div className="flex items-center justify-center h-screen">
          <img
            src={require("../../resources/notfound.jpg")}
            className="h-96 w-96"
          />
        </div>
      )}
    </>
  );
}
