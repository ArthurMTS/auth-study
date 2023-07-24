import { api } from "@/config/api";

interface userFields {
  email: string;
  password?: string;
  name: string;
  admin: boolean;
}

export function deleteUser(id: number) {
  return api.delete(`/users/${id}`);
}

export function update(id: number, params: userFields) {
  return api.put(`/users/${id}`, params);
}

export function login(email: string, password: string, admin: boolean) {
  return api
    .post("/users/login", {
      email,
      password,
      admin: admin,
    })
    .then((response) => response.data);
}

export function signin(
  username: string,
  admin: boolean,
  email: string,
  password: string
) {
  return api.post("/users", {
    name: username,
    admin: admin,
    email,
    password,
  });
}
