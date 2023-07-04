import { useContext, useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { PageRoutes } from "@/pages";
import { api } from "@/config/api";
import { UserContext } from "@/contexts/user";
import { PasswordInput } from "@/components";

export const SigninAdmin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.name && user.admin) navigate("/dashboard");
    else if (user.name && !user.admin) navigate("/home");
  }, [user]);

  const handleSignin = async () => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      password !== passwordConfirmation
    )
      return;
    const response = await api.post("/users", {
      name: username,
      admin: true,
      email,
      password,
    });
    if (response.data) {
      alert("Administrador cadastrado com sucesso!");
      navigate("/admin");
    } else alert("Não foi possível cadastrar o Administrador");
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
        <PasswordInput
          placeholder="informe sua senha"
          value={password}
          onChange={setPassword}
        />
        <PasswordInput
          placeholder="confirme sua senha"
          value={passwordConfirmation}
          onChange={setPasswordConfirmation}
          error={password != passwordConfirmation}
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
