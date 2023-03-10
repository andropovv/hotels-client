import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/auth";
import RoomsTypesReducer from "./slices/roomTypes";
import RoomsReducer from "./slices/room";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    roomTypes: RoomsTypesReducer,
    rooms: RoomsReducer,
  },
});
