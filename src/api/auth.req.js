import { api, getAccessToken } from "./api";

export const registerUser = async (data) =>
  api.post("/auth/register", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const verifyOTP = async (data) =>
  api.post("/auth/verify", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const signinUser = async (data) =>
  api.post("/auth/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const fetchProfile = () =>
  api.get("/auth/profile", {
    headers: {
      "Content-Type": "application/json",
      ...(getAccessToken() && { Authorization: `Bearer ${getAccessToken()}` }),
    },
  });
