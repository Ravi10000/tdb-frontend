import { api, getAccessToken } from "./api";

export const fetchUsers = (skip) =>
  api.get("/users?skip=" + skip, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
