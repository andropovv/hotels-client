import { createSlice } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";
import localStorageService from "../../services/localStorage.service";

const initialState = localStorageService.getAccessToken()
  ? {
      currentUser: null,
      isLoading: false,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
    }
  : {
      currentUser: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
    };

const authorizationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
      state.isLoading = false;
    },
    fetchCurrentUserPending: (state) => {
      state.isLoading = true;
    },
    fetchCurrentUserSuccess: (state, action) => {
      state.isLoading = false;
      state.auth = action.payload.userId;
      state.isLoggedIn = true;
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

export const signIn = (payload) => async (dispatch) => {
  try {
    dispatch(fetchCurrentUserPending());
    const data = await authService.login(payload);
    localStorageService.setTokens(data);
    dispatch(fetchCurrentUserSuccess(data));
  } catch (error) {
    dispatch(fetchCurrentUserFailure(error));
  }
};

export const signUp = (payload) => async (dispatch) => {
  try {
    dispatch(fetchCurrentUserPending());
    const data = await authService.register(payload);
    localStorageService.setTokens(data);
    dispatch(fetchCurrentUserSuccess(data));
  } catch (error) {
    dispatch(fetchCurrentUserFailure(error));
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(logout());
};

export const getIsLoggedIn = () => (state) => state.auth.isLoggedIn;
export const getIsLoading = () => (state) => state.auth.isLoading;

export default authorizationSlice.reducer;
