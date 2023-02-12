import { createSlice } from "@reduxjs/toolkit";
import httpService from "../../services/http.service";

const authorizationSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
    },
    fetchCurrentUserPending: (state) => {
      state.isLoading = true;
    },
    fetchCurrentUserSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    fetchCurrentUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const {
  logout,
  fetchCurrentUserPending,
  fetchCurrentUserSuccess,
  fetchCurrentUserFailure,
} = authorizationSlice.actions;

export { logout };

export const signIn = (payload) => async (dispatch) => {
  try {
    dispatch(fetchCurrentUserPending());
    const { data } = await httpService.post("auth/signInWithPassword", payload);
    localStorage.setItem("access_token", data.accessToken);
    dispatch(fetchCurrentUserSuccess(data));
  } catch (error) {
    dispatch(fetchCurrentUserFailure(error));
  }
};

export const signUp = (payload) => async (dispatch) => {
  try {
    dispatch(fetchCurrentUserPending());
    const { data } = await httpService.post("auth/signUp", payload);
    localStorage.setItem("access_token", data.accessToken);
    dispatch(fetchCurrentUserSuccess(data));
  } catch (error) {
    dispatch(fetchCurrentUserFailure(error));
  }
};

export const selectIsAuth = (state) => Boolean(state.auth.currentUser);

export default authorizationSlice.reducer;

// TODO: после релоада авторизация очищается
