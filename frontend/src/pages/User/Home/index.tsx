import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { UserContext } from "@/contexts/user";
import { iUser } from "@/config/types";
import { api } from "@/config/api";

export const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.name) navigate("/");
    else if (user.name && user.admin) navigate("/dashboard");
  }, [user]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleLogOut = () => {
    setUser({} as iUser);
  };
  const handleUpdate = async () => {
    const response = await api.put(`/users/${user.id}`, {
      name: username,
      email,
      password,
    });

    if (response.data) {
      const response = await api.post("/users/login", {
        email,
        password,
        admin: false,
      });
      setUser(response.data);
      alert("Dados atualizados com sucesso!");
    } else {
      alert("Sinto muito, ocorreu um erro!");
    }
  };
  const handleDelete = async () => {
    if (!confirm("Essa ação é irreversível, tem certeza que deseja continuar?"))
      return;
    const response = await api.delete(`/users/${user.id}`);
    if (response.data) {
      alert("Usuário excluido com sucesso");
      setUser({} as iUser);
      navigate("/");
    }
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
        <OutlinedInput
          type={showPassword ? "text" : "password"}
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          placeholder="mude sua senha"
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