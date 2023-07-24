import { api } from "@/config/api";
import { iUser } from "@/config/types";

export function getUsers() {
  return api.get<iUser[]>("/users");
}

export function createAdminUser(
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

export function login(email: string, password: string, admin: boolean) {
  return api
    .post("/users/login", {
      email,
      password,
      admin: admin,
    })
    .then((response) => response.data);
}

export function removeUser(id: number) {
  return api.delete(`/users/${id}`);
}

export function load() {
  return api.get<iUser[]>("/users").then((response) => response.data);
}
