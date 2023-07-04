import { useContext, useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { UserContext } from "@/contexts/user";
import { iUser } from "@/config/types";
import { Header, PasswordInput } from "@/components";
import { deleteUser, login, updateUser } from "@/utils/user";

export const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.name) navigate("/");
    else if (user.name && user.admin) navigate("/dashboard");
  }, [user]);

  const handleLogOut = () => setUser({} as iUser);
  const handleUpdate = async () => {
    const response = await updateUser(user.id, username, email, password);
    if (response) {
      const user = await login(email, password, false);
      setUser(user);
      alert("Dados atualizados com sucesso!");
    } else alert("Sinto muito, ocorreu um erro!");
  };
  const handleDelete = async () => {
    if (!confirm("Essa ação é irreversível, tem certeza que deseja continuar?"))
      return;
    const response = await deleteUser(user.id);
    if (response) {
      alert("Usuário excluido com sucesso");
      setUser({} as iUser);
      navigate("/");
    }
  };

  return (
    <Box sx={{ width: 500, margin: "20px auto" }}>
      <Header title="Bem-vindo" username={user.name} onLogOut={handleLogOut} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <TextField
          type="text"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          placeholder="informe seu nome"
        />
        <TextField
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          placeholder="informe seu email"
        />
        <PasswordInput
          placeholder="mude sua senha"
          value={password}
          onChange={setPassword}
        />
        <Button
          sx={{ background: "#21eb4d", color: "#fff" }}
          onClick={handleUpdate}
          disabled={
            username === user.name &&
            email === user.email &&
            password === user.password
          }
        >
          Atualizar
        </Button>
        <Button
          sx={{ background: "#ff0026", color: "#fff" }}
          onClick={handleDelete}
        >
          Excluir Usuário
        </Button>
      </Box>
    </Box>
  );
};
