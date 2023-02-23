import { createSlice } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";
import localStorageService from "../../services/localStorage.service";

const initialState = localStorageService.getAccessToken()
  ? {
      currentUser: null,
      isLoading: false,
      error: null,
      userId: localStorageService.getUserId(),
      isLoggedIn: true,
    }
  : {
      currentUser: null,
      isLoading: false,
      error: null,
      userId: null,
      isLoggedIn: false,
    };

const authorizationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.userId = null;
      state.dataLoaded = false;
      state.isLoading = false;
    },
    fetchCurrentUserPending: (state) => {
      state.isLoading = true;
    },
    fetchCurrentUserSuccess: (state, action) => {
      state.isLoading = false;
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
    },
    fetchMeSuccess: (state, action) => {
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
  fetchMeSuccess,
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

export const getMe = () => async (dispatch) => {
  try {
    dispatch(fetchCurrentUserPending());
    const data = await authService.getMe();
    dispatch(fetchMeSuccess(data));
  } catch (error) {
    dispatch(fetchCurrentUserFailure(error));
  }
};

export const updateUser = (payload) => async (dispatch) => {
  try {
    dispatch(fetchCurrentUserPending());
    const data = await authService.updateMe(payload);
    dispatch(fetchMeSuccess(data));
  } catch (error) {
    dispatch(fetchCurrentUserFailure(error));
  }
};

export const removeUser = () => async (dispatch) => {
  try {
    dispatch(fetchCurrentUserPending());
    await authService.remove();
    dispatch(logOut());
  } catch (error) {
    dispatch(fetchCurrentUserFailure(error));
  }
};

export const getIsLoggedIn = () => (state) => state.auth.isLoggedIn;
export const getIsLoading = () => (state) => state.auth.isLoading;
export const getUser = () => (state) => state.auth?.currentUser;

export default authorizationSlice.reducer;
