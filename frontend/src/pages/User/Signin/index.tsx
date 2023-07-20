import { useState, useContext, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "@/utils/validation";

import { PageRoutes } from "@/pages";
import { api } from "@/config/api";
import { UserContext } from "@/contexts/user";
import { iUser } from "@/config/types";

export const SigninUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.email) {
      if (user.admin) navigate("/dashboard");
      else navigate("/home");
    }
  }, [user]);

  const handleSignin = async () => {
    if (validateEmail(email)) setEmailError("Valid Email :)");
    else {
      setEmailError("Enter valid Email!");
      alert("e-mail inválido!");
    }
    const response = await api.get<iUser[]>("/users");

    const exist = response.data.some(
      (user) => !user.admin && user.email === email && user.name === username
    );

    if (exist) {
      alert("Já existe um usuário cadastrado com esses nome e email");
    } else {
      api.post("/users", {
        name: username,
        admin: false,
        email,
        password,
      });

      alert("Usuário cadastrado");
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
      <Typography sx={{ fontSize: 26 }}>Cadastre-se</Typography>

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
        Caso já tenha uma conta, basta <Link to={PageRoutes.login}>Logar</Link>.
      </Typography>
    </Box>
  );
};
