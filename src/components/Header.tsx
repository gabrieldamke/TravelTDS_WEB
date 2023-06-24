import { Outlet, Link, NavigateFunction } from "react-router-dom";
import React from "react";
import { Usuario } from "../Api/ApiProvider";
import { getLoggedUser } from "../helpers/userHelper";
const Header = () => {
  const [usuario, setUsuario] = React.useState<Usuario | undefined>(() => {
    let x = getLoggedUser()?.usuario;
    return x;
  });

  const logOut = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    window.location.reload()
  };
  return (
    <nav className="bg-blue-900">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <div>
          <img
            src={require("../resources/logobranco.png")}
            alt="Logo da Empresa"
            className="h-16"
          />
        </div>
        <ul className="flex space-x-4 text-white justify-center font-sans">
          {usuario ? (
            <>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explorar" className="hover:text-gray-300">
                  Explorar
                </Link>
              </li>
              <li>
                <Link to="/viagens" className="hover:text-gray-300">
                  Minhas Viagens
                </Link>
              </li>
              <li>
                <Link to="/perfil" className="hover:text-gray-300">
                  Perfil
                </Link>
              </li>
            </>
          ) : null}
        </ul>
        <div>
          {!usuario ? (
            <>
              <Link to="/logar" className="text-white">
                Logar
              </Link>
              <Link to="/registrar" className="text-white ml-4">
                Registrar
              </Link>
            </>
          ) : (
            <></>
          )}
          {usuario ? (
            <span onClick={logOut} className="text-white ml-4">
              Sair da conta
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Header;
