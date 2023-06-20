import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import { AppDispatch } from "./store";
import ApiFactory from "../Api/ApiFactory";
import { Hotel } from "../Api/ApiProvider";
const HotelStore = createSlice({
  name: "hotelState",
  initialState: {
  hotel: [] as Hotel[]
},
  reducers: {
    setHotel(state, action: PayloadAction<Hotel[]>) {
      state.hotel = action.payload;
    }
  },
});

export const { setHotel } = HotelStore.actions;

export default HotelStore.reducer;

export function GetAllHoteisAsync(): AppThunk {
  return async function (dispatch: AppDispatch | any) {
    const client = ApiFactory.GetClient();
    client
      .hotelAll()
      .then((result) => {
        dispatch(setHotel(result));
      })
      .catch((err) => {
        console.error(`Erro ao obter Hotéis: ${err.message}`);
      });
  };
}
