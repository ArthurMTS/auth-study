import { useContext, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { PageRoutes } from "@/pages";
import { iUser } from "@/config/types";
import { UserContext } from "@/contexts/user";

export const LoginUser = () => {
  const {setUser, setLoggedUser, loggedUser} = useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = useState<iUser>({email: "", password: "", admin: false, name: ""});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoggedInUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loggedInUser),
      }).then((response) => response.json())
      .then((loggedInUser) => {
        if (loggedInUser) {
          setLoggedUser(true);
          alert("Olá,"+loggedInUser.name+"! É um prazer contar novamente com o seu acesso!"); 
          window.location.href = "/home";
        }
        setUser(loggedInUser);
        console.log("usuario: ", loggedInUser)
      });
  
    } catch (error) {
      console.error("Erro:", error);
    }
      // Limpar os dados do usuário após o login
      // setUser({ email: "", password: "" });
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
          name="email"
          onChange={handleInputChange}
          value={loggedInUser.email}
          placeholder="informe seu email"
        />
        <TextField
          type="password"
          name="password"
          onChange={handleInputChange}
          value={loggedInUser.password}
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
