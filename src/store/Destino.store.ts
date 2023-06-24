import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Destino } from "../Api/ApiProvider";
import { AppDispatch, AppThunk } from "./store";
import ApiFactory from "../Api/ApiFactory";

const DestinoStore = createSlice({
  name: "AtracaoTuristicaSore",
  initialState: {
    destino: {} as Destino,
    destinos: [] as Destino[],
  },
  reducers: {
    setDestino(state, action: PayloadAction<Destino>) {
      state.destino = action.payload;
    },
    SetDestinos(state, action: PayloadAction<Destino[]>) {
      state.destinos = action.payload;
    },
  },
});

export const { setDestino, SetDestinos } = DestinoStore.actions;

export default DestinoStore.reducer;

export function GetAllDestinosAsync(): AppThunk {
  return async function (dispatch: AppDispatch | any) {
    const client = ApiFactory.GetClient();
    client
      .destinoAll()
      .then((result) => {
        dispatch(SetDestinos(result));
      })
      .catch((err) => {
        console.error(`Erro ao obter Destinos: ${err.message}`);
      });
  };
}
