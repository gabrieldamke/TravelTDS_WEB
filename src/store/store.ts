import {
  Action,
  ThunkAction,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import hotelReducer from "../store/Hotel.store";
// ...

const store = configureStore({
  reducer: { hotelState: hotelReducer },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<String>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
