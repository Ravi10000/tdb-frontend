import { api } from "#api/api";
import { getAccessToken } from "#api/api";

export const fetchProducts = (skip) => api.get("/products?skip=" + skip);
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (data) =>
  api.post("/products", data, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });
export const updateProduct = (data) =>
  api.put("/products", data, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteProduct = (id) =>
  api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
