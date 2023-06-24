import { Link } from "react-router-dom";
import {
  GetUsuarioByEmailAsync,
  ValidarUsuario,
} from "../../store/Usuario.store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import ApiFactory from "../../Api/ApiFactory";
import { ApiClientBase } from "../../Api/ApiClientBase";
import { useNavigate } from "react-router-dom";
import { getLoggedUser } from "../../helpers/userHelper";
export default function Logar() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState<boolean | undefined>(
    undefined
  );
  const [isParteDoisLoginLoaded, setIsParteDoisLoginLoaded] =
    useState<boolean>(false);
  const [isInicializado, setIsInicializado] = React.useState<boolean>(false);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const validarUsuario = useSelector(
    (root: RootState) => root.usuarioStore.validarUsuario
  );

  const onSwitchInnerLoginScreen = () => {
    setIsParteDoisLoginLoaded(!isParteDoisLoginLoaded);
  };

  const onClickLogar = () => {
    dispatch(ValidarUsuario(email, senha));
  };

  useEffect(() => {
    if (validarUsuario === true) {
      ApiFactory.updateClient(email, senha);
      setLoginStatus(true);
      localStorage.setItem("auth", email);
      dispatch(GetUsuarioByEmailAsync(String(localStorage.getItem("auth"))));
      setTimeout(() => {
        const timeout = setTimeout(() => {
          navigate("/explorar"); // Redireciona para a rota explorar
        }, 2000);
      });
    } else if (validarUsuario === false) {
      console.error("senha incorreta");
      setLoginStatus(false);
    } else {
      console.error("validarusuario não é nem true nem false");
    }
  }, [validarUsuario]);

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <img
          src={require("../../resources/viajalogo.png")}
          alt="Logo da Empresa"
          className="h-24 mx-auto mb-4"
        />
        <p className="text-center text-gray-600 mb-4">Logar para continuar</p>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="rounded-lg border-2 border-gray-300 px-4 py-2 mb-4 w-full"
          hidden={isParteDoisLoginLoaded}
        />
        <input
          type="password"
          placeholder="Senha"
          className="rounded-lg border-2 border-gray-300 px-4 py-2 mb-4 w-full"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          hidden={!isParteDoisLoginLoaded}
        />
        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg w-full"
          onClick={onSwitchInnerLoginScreen}
          hidden={isParteDoisLoginLoaded}
        >
          Continuar
        </button>
        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg w-full"
          onClick={onClickLogar}
          hidden={!isParteDoisLoginLoaded}
        >
          Logar
        </button>
        <span
          className="text-gray-500 font-bold cursor-pointer my-4"
          onClick={onSwitchInnerLoginScreen}
          hidden={!isParteDoisLoginLoaded}
        >
          Alterar o email
        </span>
        <p
          hidden={loginStatus === undefined}
          className={
            loginStatus === false
              ? "text-center text-red-600 my-4"
              : "text-center text-green-600 my-4"
          }
        >
          {loginStatus === false ? "As credenciais estão incorretas" : null}
          {loginStatus === true ? "Logado com sucesso, redirecionando.." : null}
        </p>
        <p className="text-center text-gray-600 my-4">ou</p>
        <Link to="/registrar">
          <button
            type="submit"
            className="bg-white hover:bg-gray-100 text-blue-500 font-bold py-2 px-4 rounded-lg shadow w-full"
          >
            Criar uma conta
          </button>
        </Link>
        <hr className="my-4" />
        <img
          src={require("../../resources/ViajaFooterLogin.png")}
          alt="Logo"
          className="mx-auto h-20"
        />
      </div>
    </div>
  );
}
