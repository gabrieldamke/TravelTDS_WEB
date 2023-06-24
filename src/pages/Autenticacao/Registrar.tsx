import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Usuario } from "../../Api/ApiProvider";
import {
  GetUsuarioByEmailAsync,
  PostUsuario,
  ValidarEmail,
} from "../../store/Usuario.store";
import { RootState } from "../../store/store";
import ApiFactory from "../../Api/ApiFactory";

export default function Registrar() {
  const [imagemPerfilBase64, setImagemPerfilBase64] = useState(
    "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"
  );
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [displayErrorMessage, setDisplayErrorMessage] =
    useState<boolean>(false);
  const [displaySuccessMessage, setDisplaySuccessMessage] =
    useState<boolean>(false);
  const stateEmailValido = useSelector(
    (root: RootState) => root.usuarioStore.validarEmail
  );

  const stateNovoUsuario = useSelector(
    (root: RootState) => root.usuarioStore.novoUsuario
  );

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Digite um endereço de e-mail válido")
      .required("O e-mail é obrigatório"),
    nome: Yup.string().required("O nome é obrigatório"),
    senha: Yup.string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .required("A senha é obrigatória"),
    telefone: Yup.string()
      .required("O telefone é obrigatório")
      .matches(
        /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/,
        "Insira um número de telefone válido"
      ),
  });

  const handleSubmit = (e: any) => {
    console.log(e);
    if (e !== null) {
      let u = new Usuario();
      u.init({
        email: e.email,
        senha: e.senha,
        nome: e.nome,
        telefone: e.telefone,
        imagemPerfilBase64: imagemPerfilBase64,
        tipoPermissao: "Usuario",
      });
      dispatch(PostUsuario(u));
      ApiFactory.updateClient(e.email, e.senha);
      localStorage.setItem("auth", e.email);
      dispatch(GetUsuarioByEmailAsync(String(localStorage.getItem(e.email))));
      dispatch(ValidarEmail(e.email));
    }
  };

  const navigate = useNavigate();
  React.useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("auth");
  }, []);
  React.useEffect(() => {
    console.log(stateNovoUsuario);
    if (stateNovoUsuario === true) {
      setDisplaySuccessMessage(true);
      setTimeout(() => {
        console.log("Timeout de 2 segundos concluído!");
        navigate("/");
      }, 2000);
    }
  }, [stateNovoUsuario]);

  React.useEffect(() => {
    if (stateEmailValido === true) {
      setDisplayErrorMessage(true);
    } else if (stateEmailValido === false) {
      setDisplayErrorMessage(false);
    }
  }, [stateEmailValido]);

  const fadeInAnimation = useSpring({
    from: { opacity: 0, transform: "translateX(-100%)" },
    to: { opacity: 1, transform: "translateX(0%)" },
    config: { duration: 500 },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = null as any;
    if (e.target.files !== null) {
      file = e.target.files[0];
    }

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string | null;
        if (base64String) {
          setImagemPerfilBase64(base64String);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg xl:w-120">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <img
              src={require("../../resources/viajalogo.png")}
              alt="Logo da Empresa"
              className="h-24 mx-auto mb-4"
            />
            <p className="text-center text-gray-600 mb-4">
              Registrar uma conta
            </p>

            <Formik
              initialValues={{
                email: "",
                nome: "",
                senha: "",
                telefone: "",
              }}
              onSubmit={(e) => handleSubmit(e)}
              validationSchema={validationSchema}
            >
              <Form className="flex flex-col">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="rounded-lg border-2 border-gray-300 px-4 py-2 mb-3 w-full"
                  required
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message text-red-600 mb-2"
                />
                <Field
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  className="rounded-lg border-2 border-gray-300 px-4 py-2 mb-3 w-full"
                  required
                />
                <ErrorMessage
                  name="nome"
                  component="div"
                  className="error-message text-red-600 mb-2"
                />
                <Field
                  type="password"
                  name="senha"
                  placeholder="Senha"
                  className="rounded-lg text-lg border-2 border-gray-300 px-4 py-2 mb-3 w-full"
                  required
                />
                <ErrorMessage
                  name="senha"
                  component="div"
                  className="error-message text-red-600 mb-2"
                />
                <Field
                  type="text"
                  name="telefone"
                  placeholder="Telefone"
                  className="rounded-lg border-2 border-gray-300 px-4 py-2 mb-3  w-full"
                  required
                />
                <ErrorMessage
                  name="telefone"
                  component="div"
                  className="error-message text-red-600 mb-2"
                />
                Selecionar imagem de perfil
                <Field
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="rounded-lg border-2 border-gray-300 px-4 py-2 mb-2 w-full"
                />
                <ErrorMessage
                  name="profileImage"
                  component="div"
                  className="error-message text-red-600 mb-2"
                />
                <span
                  className="text-red-500 font-bold cursor-pointer my-4"
                  hidden={!displayErrorMessage}
                >
                  {`O email Já existe!`}
                </span>
                <span
                  className="text-green-500 font-bold cursor-pointer my-4"
                  hidden={!displaySuccessMessage}
                >
                  {`Conta criado com sucesso! Redirecionando para a página principal..`}
                </span>
                <button
                  type="submit"
                  className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg w-full"
                >
                  Registrar
                </button>
              </Form>
            </Formik>
            <p className="text-center text-gray-600 my-4">ou</p>
            <Link to="/logar">
              <button
                type="button"
                className="bg-white hover:bg-gray-100 text-blue-500 font-bold py-2 px-4 rounded-lg shadow w-full"
              >
                Fazer Login
              </button>
            </Link>
            <hr className="my-4" />
            <img
              src={require("../../resources/ViajaFooterLogin.png")}
              alt="Logo"
              className="mx-auto h-20"
            />
          </div>
          <div className="flex items-center justify-center">
            <animated.img
              src={require("../../resources/registerLateralDireito.png")}
              alt="Imagem lateral"
              className="w-100 h-auto max-h-96 ml-12"
              style={fadeInAnimation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
