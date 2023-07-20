import { useContext, useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { UserContext } from "@/contexts/user";
import { useNavigate } from "react-router-dom";
import { iUser } from "@/config/types";
import { api } from "@/config/api";

interface editParams {
  email: string;
  password?: string;
  name: string;
  admin: boolean;
}

export const Home = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.email || user.admin) navigate("/");
    else {
      setUsername(user.name);
      setEmail(user.email);
    }
  }, []);

  const handleUpdate = async () => {
    const params: editParams = {
      email: email,
      password: password,
      name: username,
      admin: user.admin,
    };

    if (!params.password) {
      delete params.password;
    }
    await api.put(`/users/${user.id}`, params);
    alert("Dados atualizados com sucesso!");
    handleLogOut();
  };
  const handleLogOut = () => {
    setUser({} as iUser);
    navigate("/");
  };
  const handleDelete = async () => {
    await api.delete(`/users/${user.id}`);
    alert("Dados excluidos com sucesso!");
    handleLogOut();
  };

  return (
    <Box sx={{ width: 500, margin: "20px auto" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: 26 }}>Bem-vindo, {user.name}.</Typography>
        <Button
          sx={{ background: "#eb2142", color: "#fff" }}
          onClick={handleLogOut}
        >
          Log Out
        </Button>
      </Box>

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
        <TextField
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          placeholder="informe sua senha"
        />
        <TextField
          type="password"
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          value={passwordConfirmation}
          placeholder="confirme sua senha"
        />
        <Button
          sx={{ background: "#21eb4d", color: "#fff" }}
          onClick={handleUpdate}
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
