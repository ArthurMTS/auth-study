import { useEffect, useContext, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { PageRoutes } from "@/pages";
import { api } from "@/config/api";
import { UserContext } from "@/contexts/user";

export const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.email) {
      if (user.admin) navigate("/dashboard");
      else navigate("/home");
    }
  }, [user]);

  const handleLogin = async () => {
    const data = await api
      .post("/users/login", {
        email,
        password,
        admin: false,
      })
      .then((response) => response.data);
    if (data) {
      delete data.password;
      setUser(data);
      navigate("/home");
    } else alert("Usuário não encontrado");
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
        <TextField
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          placeholder="informe sua senha"
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
