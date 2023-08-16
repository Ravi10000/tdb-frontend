import axios from "axios";
export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});
export const setAccessToken = (token) =>
  localStorage.setItem("tdb_access_token", token);
export const getAccessToken = () => localStorage.getItem("tdb_access_token");
export const removeAccessToken = () =>
  localStorage.removeItem("tdb_access_token");

