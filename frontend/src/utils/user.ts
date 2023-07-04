import { api } from "@/config/api";

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const getUser = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  admin: boolean
) => {
  const response = await api.post("/users", {
    name,
    email,
    password,
    admin,
  });

  return response.data;
};

export const updateUser = async (
  id: number,
  name: string,
  email: string,
  password: string,
) => {
  const response = await api.put(`/users/${id}`, {
    name,
    email,
    password,
  });
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export const login = async (
  email: string,
  password: string,
  admin: boolean
) => {
  const response = await api.post("/users/login", {
    email,
    password,
    admin,
  });
  return response.data;
};
