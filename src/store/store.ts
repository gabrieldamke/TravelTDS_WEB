import {
  Action,
  ThunkAction,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import hotelReducer from "../store/Hotel.store";
import atracaoTuristicaReducer from "../store/AtracaoTuristica.store";
import restauranteReducer from "./Restaurante.store";
import usuarioReducer from "./Usuario.store";
import viagemReducer from "./Viagem.store";
import destinoReducer from "./Destino.store";
// ...

const store = configureStore({
  reducer: {
    hotelState: hotelReducer,
    atracaoTuristicaState: atracaoTuristicaReducer,
    restauranteStore: restauranteReducer,
    usuarioStore: usuarioReducer,
    viagemStore: viagemReducer,
    destinoStore: destinoReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<String>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
