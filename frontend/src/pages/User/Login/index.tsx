import { useContext, useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { PageRoutes } from "@/pages";
import { api } from "@/config/api";
import { UserContext } from "@/contexts/user";
import { PasswordInput } from "@/components";

export const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.name && !user.admin) navigate("/home");
    else if (user.name && user.admin) navigate("/dashboard");
  }, [user]);

  const handleLogin = async () => {
    if (email === "" || password === "") return;
    const response = await api.post("/users/login", {
      email,
      password,
      admin: false,
    });
    if (response.data === "") {
      alert("Usuário não encontrado. Por favor confira seus dados.");
    } else {
      setUser(response.data);
      navigate("/home");
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
        Entre em sua conta ou cadastre-se
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
        <Button onClick={handleLogin}>Log IN</Button>
      </Box>
      <Typography>
        Caso não tenha um conta, basta{" "}
        <Link to={PageRoutes.signin}>Cadastrar-se</Link>.
      </Typography>
    </Box>
  );
};
