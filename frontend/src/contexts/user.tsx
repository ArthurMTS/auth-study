import { createContext, ReactNode, useState } from "react";

import { iUser } from "@/config/types";
import { useStorage } from "@/hooks/useStorage";

interface iUserContext {
  user: iUser;
  users?: iUser[];
  loggedUser: boolean;
  loggedAdmin: boolean;
  setUser: (user: iUser) => void;
  setLoggedUser: (state: boolean) => void;
  setLoggedAdmin: (state: boolean) => void;
  getUsers: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as iUserContext);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useStorage<iUser>("user", {} as iUser);
  const [loggedUser, setLoggedUser] = useStorage("logged", false);
  const [loggedAdmin, setLoggedAdmin] = useStorage("logged", false);
  const [users, setUsers] = useState<iUser[]>();

  function getUsers() {
    try {
      const response = fetch("http://localhost:5000/users/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(users),
      })
        .then(response => response.json())
        .then(user => setUsers(user));
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setLoggedAdmin,
        loggedUser,
        setLoggedUser,
        loggedAdmin,
        getUsers,
        users,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
