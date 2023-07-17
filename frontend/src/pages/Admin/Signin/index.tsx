import { useState, useEffect, useContext } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { PageRoutes } from "@/pages";
import { api } from "@/config/api";
import { UserContext } from "@/contexts/user";
import { iUser } from "@/config/types";

export const SigninAdmin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.email) {
      if (user.admin) navigate("/dashboard");
      else navigate("/home");
    }
  }, []);

  const handleSignin = async () => {
    const response = await api.get<iUser[]>("/users");

    const exist = response.data.some(
      (user) => user.admin && user.email === email && user.name === username
    );

    if (exist) {
      alert("Já existe um usuário cadastrado com esse nome e email");
    } else {
      api.post("/users", {
        name: username,
        admin: true,
        email,
        password,
      });

      alert("Usuário administrador cadastrado");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "500px",
        margin: "20px auto",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
      }}
    >
      <Typography sx={{ fontSize: 26 }}>
        Cadastre um novo administrador
      </Typography>

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
        <Button onClick={handleSignin}>Sign IN</Button>
      </Box>
      <Typography>
        Caso já tenha uma conta, basta{" "}
        <Link to={PageRoutes.loginAdmin}>Logar</Link>.
      </Typography>
    </Box>
  );
};
