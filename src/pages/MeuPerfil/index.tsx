import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React from "react";
import {
  GetUsuarioByEmailAsync,
  GetUsuarioByIdAsync,
} from "../../store/Usuario.store";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { getLoggedUser } from "../../helpers/userHelper";
import { Usuario } from "../../Api/ApiProvider";
import { useNavigate } from "react-router-dom";

export default function MeuPerfil() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
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
  const [usuario, setUsuario] = React.useState<Usuario | undefined>(() => {
    let x = getLoggedUser()?.usuario;
    return x;
  });

  const renderizarImagemPerfil = () => {
    if (usuario?.imagemPerfilBase64) {
      const imagemUrl = `data:image/jpeg;base64,${usuario.imagemPerfilBase64}`;
      return (
        <div className="flex justify-center mb-4">
          <img
            src={imagemUrl}
            alt="Imagem de Perfil"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
      );
    } else {
      return null;
    }
  };

  const renderizarViagensTotais = () => {
    const totalViagens = usuario?.viagens?.length || 0;
    return <p className="text-gray-600 mb-2">Viagens totais: {totalViagens}</p>;
  };

  const handleEditarPerfil = () => {
    // Lógica para redirecionar ou abrir uma página de edição de perfil
    console.log("Editar perfil");
  };

  return (
    <div>
      <div className="bg-gray-200 min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white max-w-md mx-auto p-8 rounded-lg shadow-lg">
            {renderizarImagemPerfil()}
            {usuario ? (
              <div>
                <h1 className="text-2xl font-bold mb-2">{usuario.nome}</h1>
                <p className="text-gray-600 mb-2">{usuario.email}</p>
                <p className="text-gray-600 mb-4">{usuario.telefone}</p>
                {renderizarViagensTotais()}
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleEditarPerfil}
                >
                  Editar Perfil
                </button>
              </div>
            ) : (
              <p className="text-center text-gray-600">Carregando perfil...</p>
            )}
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
