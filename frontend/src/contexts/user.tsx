import { createContext, ReactNode, useState} from "react";

import { iUser } from "@/config/types";
import { useStorage } from "@/hooks/useStorage";

interface iUserContext {
  user: iUser;
  loggedUser: boolean;
  setUser: (user: iUser) => void;
  setLoggedUser: (state: boolean) => void;
  setLoggedAdmin: (state: boolean) => void;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as iUserContext);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useStorage<iUser>("user", {} as iUser);
  // const [loggedUser, setLoggedUser] = useState(Boolean);
  const [loggedUser, setLoggedUser] = useStorage("logged", false);
  const [loggedAdmin, setLoggedAdmin] = useStorage("logged", false);

  return (
    <UserContext.Provider value={{ user, setUser, setLoggedAdmin, loggedUser, setLoggedUser }}>
      {children}
    </UserContext.Provider>
  );
};
