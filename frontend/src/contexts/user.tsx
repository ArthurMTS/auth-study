import { createContext, ReactNode, useState } from "react";

import { iUser } from "@/config/types";

interface iUserContext {
  user: iUser;
  setUser: (user: iUser) => void;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as iUserContext);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<iUser>({} as iUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
