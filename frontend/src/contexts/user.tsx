import { createContext, ReactNode, useState } from "react";

import { createUser, iUser, updateUser, userLogin } from "@/config/types";
import { api } from "@/config/api";
import { useToast } from "@/hooks/useToast";
import { useNavigate } from "react-router-dom";

interface iUserContext {
  user: iUser;
  setUser: React.Dispatch<React.SetStateAction<iUser>>;
  signin: (data: createUser) => void;
  login: (data: userLogin) => void;
  update: (data: updateUser, id: number) => void;
  listUser: () => void;
  popUser: () => void;
  popAdmin: (id: number) => void;
  logout: () => void;
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  users: iUser[];
  admins: iUser[];
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as iUserContext);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<iUser>({} as iUser);
  const [users, setUsers] = useState<iUser[]>([]);
  const [admins, setAdmins] = useState<iUser[]>([]);
  const [auth, setAuth] = useState(false);
  const { handleToastSucess, handleToastError } = useToast();
  const navigate = useNavigate();

  const signin = async (data: createUser) => {
    try {
      const response = await api.post("/users", data);

      if (response.status === 200) {
        handleToastSucess("Usuário cadastrado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      handleToastError("Erro ao cadastrar usuário.");
    }
  };

  const login = async (data: userLogin) => {
    try {
      const response = await api.post("/users/login", data);

      if (response.status === 200) {
        if(response.data === "") {
          setUser({} as iUser);
          setAuth(false);
          handleToastError("Usuário incorreto.");
        } else {
          setUser(response.data);
          setAuth(true);
          handleToastSucess("Usuário logado com sucesso!");
          if(response.data.admin === 1) navigate("/dashboard");
          if(response.data.admin === 0) navigate("/home");
        }
      }
    } catch (error) {
      console.error("Erro ao logar usuário:", error);
      handleToastError("Erro ao logar usuário.");
    }
  };

  const popUser = async () => {
    if(user.id) {
      try {
        const response = await api.delete("/users/" + user.id);
  
        if (response.status === 200) {
          const auxAdmin = user.admin;
          setUser({} as iUser);
          setAuth(false);
          handleToastSucess("Usuário deletado com sucesso!");
          if(auxAdmin === 1) navigate("/admin");
          if(auxAdmin === 0) navigate("/");
        }
      } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        handleToastError("Erro ao deletar usuário.");
      }
    }
    else {
      handleToastError("Usuário não logado.");
    }
  };

  const popAdmin = async (id: number) => {
    if(id) {
      try {
        const response = await api.delete("/users/" + id);
  
        if (response.status === 200) {
          const newUsers = users.filter((user: iUser) => user.id !== id);
          setUsers(newUsers);
          handleToastSucess("Usuário deletado com sucesso!");
        }
      } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        handleToastError("Erro ao deletar usuário.");
      }
    }
    else {
      handleToastError("Usuário não logado.");
    }
  };

  const logout = () => {
    if(user.id) {
      const auxAdmin = user.admin;
      setUser({} as iUser);
      setAuth(false);
      handleToastSucess("Usuário deslogado com sucesso!");
      console.log(auxAdmin);
      if(auxAdmin === 1) navigate("/admin");
      if(auxAdmin === 0) navigate("/");
    }
  };

  const update = async (data: updateUser, id: number) => {
    try {
      const response = await api.put("/users/" + id, data);

      if (response.status === 200) {
        const newData: iUser = {
          id,
          ...data
        }
        setUser(newData);
        handleToastSucess("Usuário atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      handleToastError("Erro ao atualizar usuário.");
    }
  };

  const listUser = async () => {
    try {
      const response = await api.get("/users");

      if (response.status === 200) {
        const resultUser = response.data.filter((user: iUser) => user.admin === 0);
        const resultAdmin = response.data.filter((user: iUser) => user.admin === 1);
        setUsers(resultUser);
        setAdmins(resultAdmin);
        console.log(users, admins);
      }
    } catch (error) {
      console.error("Erro ao listar os usuários:", error);
      handleToastError("Erro ao listar os usuários.");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, signin, login, update, popUser, popAdmin, logout, auth, setAuth, listUser, users, admins }}>
      {children}
    </UserContext.Provider>
  );
};
