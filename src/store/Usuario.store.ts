import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import { AppDispatch } from "./store";
import ApiFactory from "../Api/ApiFactory";
import { Usuario } from "../Api/ApiProvider";
const UsuarioStore = createSlice({
  name: "usuarioState",
  initialState: {
    usuario: {} as Usuario,
    validarUsuario: {} as boolean,
    novoUsuario: {} as boolean,
    validarEmail: {} as boolean,
  },
  reducers: {
    setUsuario(state, action: PayloadAction<Usuario>) {
      state.usuario = action.payload;
    },
    setValidarUsuario(state, action: PayloadAction<boolean>) {
      state.validarUsuario = action.payload;
    },
    setNovoUsuario(state, action: PayloadAction<boolean>) {
      state.novoUsuario = action.payload;
    },
    setValidarEmail(state, action: PayloadAction<boolean>) {
      state.validarEmail = action.payload;
    },
  },
});

export const {
  setUsuario,
  setValidarUsuario,
  setNovoUsuario,
  setValidarEmail,
} = UsuarioStore.actions;

export default UsuarioStore.reducer;

export function GetUsuarioByIdAsync(id: number): AppThunk {
  return async function (dispatch: AppDispatch | any) {
    const client = ApiFactory.GetClient();
    client
      .usuarioGET(id)
      .then((result) => {
        dispatch(setUsuario(result));
      })
      .catch((err) => {
        console.error(`Erro ao obter usuário: ${err.message}`);
      });
  };
}

export function GetUsuarioByEmailAsync(email: string): AppThunk {
  return async function (dispatch: AppDispatch | any) {
    const client = ApiFactory.GetClient();
    client
      .email(email)
      .then((result) => {
        dispatch(setUsuario(result));
        localStorage.setItem("user", JSON.stringify(result));
      })
      .catch((err) => {
        console.error(`Erro ao obter usuário: ${err.message}`);
      });
  };
}

export function PostUsuario(u: Usuario): AppThunk {
  return async function (dispatch: AppDispatch | any) {
    const client = ApiFactory.GetClient();
    client
      .usuarioPOST(u)
      .then((result) => {
        dispatch(setNovoUsuario(true));
        localStorage.setItem("user", JSON.stringify(result));
      })
      .catch((err) => {
        console.error(`Erro ao obter usuário: ${err}`);
      });
  };
}

export function ValidarUsuario(
  email: string | undefined,
  senha: string | undefined
): AppThunk {
  return async function (dispatch: AppDispatch | any) {
    const client = ApiFactory.GetClient();
    client
      .validar(email, senha)
      .then((result: boolean) => {
        dispatch(setValidarUsuario(result));
      })
      .catch((err) => {
        console.error(`Erro ao verificar a validação de login: ${err.message}`);
      });
  };
}

export function ValidarEmail(email: string | undefined): AppThunk {
  return async function (dispatch: AppDispatch | any) {
    const client = ApiFactory.GetClient();
    client
      .verificaremailexiste(email)
      .then((result: boolean) => {
        dispatch(setValidarEmail(result));
      })
      .catch((err) => {
        console.error(`Erro ao verificar a validação de email: ${err.message}`);
      });
  };
}
