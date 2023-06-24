import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../store/store";
import { GetViagemUsuarioAutenticado } from "../../store/Viagem.store";
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

export default function MinhasViagens() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const viagens = useSelector((root: RootState) => root.viagemStore.viagens);

  useEffect(() => {
    dispatch(GetViagemUsuarioAutenticado());
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4">Minhas Viagens</h2>

        {viagens.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {viagens.map((viagem) => (
              <div
                key={viagem.id}
                className="bg-white p-4 shadow-md rounded-md flex flex-col"
              >
                <h3 className="text-lg font-semibold mb-2">{viagem.nome}</h3>
                <p className="mb-4">Orçamento: R$ {viagem.orcamento}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg mb-4">Você não possui viagens cadastradas.</p>
        )}
    
        <Link
          to="/criarviagem"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
            Cadastrar Viagem
        </Link>
      </div>
      {viagens.length > 0 && <Footer />}
    </>
  );
}
