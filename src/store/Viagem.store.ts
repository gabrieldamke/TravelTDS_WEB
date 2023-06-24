import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Viagem } from "../Api/ApiProvider";
import { AppDispatch, AppThunk } from "./store";
import ApiFactory from "../Api/ApiFactory";

const ViagemStore = createSlice({
  name: "viagem",
  initialState: {
    viagem: {} as Viagem,
    viagens: [] as Viagem[],
  },
  reducers: {
    setViagem(state, action: PayloadAction<Viagem>) {
      state.viagem = action.payload;
    },
    setViagens(state, action: PayloadAction<Viagem[]>) {
      state.viagens = action.payload;
    },
  },
});

export const { setViagem, setViagens } = ViagemStore.actions;

export default ViagemStore.reducer;

export function GetViagemByIdAsync(id: number): AppThunk {
  return async function (dispatch: AppDispatch | any) {
    const client = ApiFactory.GetClient();
    client
      .viagemGET(id)
      .then((result) => {
        dispatch(setViagem(result));
      })
      .catch((err) => {
        console.error(`Erro ao obter Viagem: ${err.message}`);
      });
  };
}

export function GetViagemUsuarioAutenticado(): AppThunk {
  return async function (dispatch: AppDispatch | any) {
    const client = ApiFactory.GetClient();
    client
      .viagens()
      .then((result) => {
        dispatch(setViagens(result));
      })
      .catch((err) => {
        console.error(`Erro ao obter Viagem: ${err.message}`);
      });
  };
}

export function PostViagem(viagem: Viagem): AppThunk {
  return async function (dispatch: AppDispatch | any) {
    const client = ApiFactory.GetClient();
    client
      .viagemPOST(viagem)
      .then((result) => {
        dispatch(setViagem(result));
      })
      .catch((err) => {
        console.error(`Erro ao adicionar Viagem: ${err.message}`);
      });
  };
}
