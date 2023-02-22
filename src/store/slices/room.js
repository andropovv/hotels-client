import { createSlice } from "@reduxjs/toolkit";
import httpService from "../../services/http.service";

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchRoomPending: (state) => {
      state.isLoading = true;
    },
    fetchRoomSuccess: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    fetchRoomFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    bookRoomSuccess: (state, action) => {
      state.isLoading = false;
      state.items[state.items.findIndex((r) => r._id === action.payload._id)] =
        action.payload;
    },
  },
});
const {
  fetchRoomFailure,
  fetchRoomPending,
  fetchRoomSuccess,
  bookRoomSuccess,
} = roomsSlice.actions;

export const getRooms = () => async (dispatch) => {
  try {
    dispatch(fetchRoomPending());
    const { data } = await httpService.get("rooms");
    dispatch(fetchRoomSuccess(data));
  } catch (error) {
    dispatch(fetchRoomFailure(error));
  }
};

export const bookNumber = (roomType) => async (dispatch) => {
  try {
    dispatch(fetchRoomPending());
    const { data } = await httpService.patch("rooms/book", { roomType });
    dispatch(bookRoomSuccess(data));
  } catch (error) {
    dispatch(fetchRoomFailure(error));
  }
};

export const unbookNumber = (roomId) => async (dispatch) => {
  try {
    dispatch(fetchRoomPending());
    const { data } = await httpService.patch("rooms/unbook", { roomId });
    dispatch(bookRoomSuccess(data));
  } catch (error) {
    dispatch(fetchRoomFailure(error));
  }
};

export const getRoomsByUserId = (userId) => (state) => {
  if (state.rooms.items && userId) {
    return state.rooms.items.filter(
      (r) => r.bookedBy === userId && r.bookedBy !== null
    );
  }
};

export const selectIsRooms = (state) => Boolean(state.rooms.items);
export const getIsRoomsLoading = () => (state) => state.rooms.isLoading;
export const getAllRooms = () => (state) => {
  return state.rooms.items;
};
export const getBooked = (roomType, userId) => (state) => {
  return state.rooms.items.find(
    (i) => i.type === roomType && i.bookedBy === userId
  );
};

export default roomsSlice.reducer;
