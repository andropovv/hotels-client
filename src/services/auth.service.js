import axios from "axios";
import localStorageService from "./localStorage.service";
import config from "../config.json";
import httpService from "./http.service";

const httpAuth = axios.create({
  baseURL: config.apiEndpoint + "/auth",
});

const authService = {
  register: async (payload) => {
    const { data } = await httpAuth.post(`/signUp`, payload);
    return data;
  },
  login: async ({ email, password }) => {
    const { data } = await httpAuth.post(`/signInWithPassword`, {
      email,
      password,
    });
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post("token", {
      refresh_token: localStorageService.getRefreshToken(),
    });
    return data;
  },
  getMe: async () => {
    const { data } = await httpService.get("auth/getMe");
    return data;
  },
  updateMe: async (payload) => {
    const { data } = await httpService.patch("auth/update", payload);
    return data;
  },
};
export default authService;
