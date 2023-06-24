import {
  BrowserRouter,
  Routes as RouterContext,
  Route,
} from "react-router-dom";
import Home from "../pages/Explorar";
import Logar from "../pages/Autenticacao/Logar";
import Registrar from "../pages/Autenticacao/Registrar";
import MeuPerfil from "../pages/MeuPerfil/index";
import DetalhesEstabelecimentoPage from "../pages/DetalhesEstabelecimento";
import LandingPage from "../pages/Home";
import Viagens from "../pages/MinhasViagens";
import CriarViagem from "../pages/MinhasViagens/CriarViagem";
import React from "react";
const Routes = () => {
  return (
    <BrowserRouter>
      <RouterContext>
        <Route path="/" element={<LandingPage />} index />
        <Route path="logar" element={<Logar />} />
        <Route path="registrar" element={<Registrar />} />
        <Route
          path="/detalhes/:tipo/:id"
          element={<DetalhesEstabelecimentoPage />}
        />
        <Route path="perfil" element={<MeuPerfil />} />
        <Route path="explorar" element={<Home />} />
        <Route path="viagens" element={<Viagens />} />
        <Route path="criarviagem" element={<CriarViagem />} />
      </RouterContext>
    </BrowserRouter>
  );
};
export default Routes;
