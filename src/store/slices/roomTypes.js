import { createSlice } from "@reduxjs/toolkit";
import httpService from "../../services/http.service";

const roomTypesSlice = createSlice({
  name: "roomsTypes",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchRoomTypesPending: (state) => {
      state.isLoading = true;
    },
    fetchRoomTypesSuccess: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    fetchRoomTypesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
const { fetchRoomTypesFailure, fetchRoomTypesPending, fetchRoomTypesSuccess } =
  roomTypesSlice.actions;

export const getRoomTypes = () => async (dispatch) => {
  try {
    dispatch(fetchRoomTypesPending());
    const { data } = await httpService.get("roomTypes");
    dispatch(fetchRoomTypesSuccess(data));
  } catch (error) {
    dispatch(fetchRoomTypesFailure(error));
  }
};

export const getRoomTypeById = (roomTypeId) => (state) => {
  if (state.roomTypes.items) {
    return state.roomTypes.items.find((t) => t._id === roomTypeId);
  }
};

export const selectIsRoomTypes = (state) => Boolean(state.roomTypes.items);

export default roomTypesSlice.reducer;
