import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import { AppDispatch } from "./store";
import ApiFactory from "../Api/ApiFactory";
import { Hotel, Restaurante } from "../Api/ApiProvider";
const RestauranteStore = createSlice({
  name: "restauranteState",
  initialState: {
    restaurante: {} as Restaurante,
    restaurantes: [] as Restaurante[],
  },
  reducers: {
    setRestaurante(state, action: PayloadAction<Restaurante>) {
      state.restaurante = action.payload;
    },
    setRestaurantes(state, action: PayloadAction<Restaurante[]>) {
      state.restaurantes = action.payload;
    },
  },
});

export const { setRestaurantes, setRestaurante } = RestauranteStore.actions;

export default RestauranteStore.reducer;

export function GetAllRestaurantesAsync(): AppThunk {
  return async function (dispatch: AppDispatch | any) {
    const client = ApiFactory.GetClient();
    client
      .restauranteAll()
      .then((result) => {
        dispatch(setRestaurantes(result));
      })
      .catch((err) => {
        console.error(`Erro ao obter Restaurantes: ${err.message}`);
      });
  };
}

export function GetRestaurantesById(id: number): AppThunk {
  return async function (dispatch: AppDispatch | any) {
    const client = ApiFactory.GetClient();
    client
      .restauranteGET(id)
      .then((result) => {
        dispatch(setRestaurante(result));
      })
      .catch((err) => {
        console.error(`Erro ao obter Restaurantes: ${err.message}`);
      });
  };
}
