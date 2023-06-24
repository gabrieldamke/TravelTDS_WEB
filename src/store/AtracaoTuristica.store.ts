import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import { AppDispatch } from "./store";
import ApiFactory from "../Api/ApiFactory";
import { AtracaoTuristica } from "../Api/ApiProvider";
const AtracaoTuristicaSore = createSlice({
  name: "AtracaoTuristicaSore",
  initialState: {
    atracaoTuristica: {} as AtracaoTuristica,
    atracoesTuristicas: [] as AtracaoTuristica[],
  },
  reducers: {
    setAtracaoTuristica(state, action: PayloadAction<AtracaoTuristica>) {
      state.atracaoTuristica = action.payload;
    },
    setAtracoesTuristicas(state, action: PayloadAction<AtracaoTuristica[]>) {
      state.atracoesTuristicas = action.payload;
    },
  },
});

export const { setAtracoesTuristicas, setAtracaoTuristica } =
  AtracaoTuristicaSore.actions;

export default AtracaoTuristicaSore.reducer;

export function GetAllAtracoesTuristicasAsync(): AppThunk {
  return async function (dispatch: AppDispatch | any) {
    const client = ApiFactory.GetClient();
    client
      .atracaoTuristicaAll()
      .then((result) => {
        dispatch(setAtracoesTuristicas(result));
      })
      .catch((err) => {
        console.error(`Erro ao obter Atraçções Turísticas: ${err.message}`);
      });
  };
}

export function GetAtracaoTuristicaById(id: number): AppThunk {
  return async function (dispatch: AppDispatch | any) {
    const client = ApiFactory.GetClient();
    client
      .atracaoTuristicaGET(id)
      .then((result) => {
        dispatch(setAtracaoTuristica(result));
      })
      .catch((err) => {
        console.error(`Erro ao obter Atraçções Turísticas: ${err.message}`);
      });
  };
}
