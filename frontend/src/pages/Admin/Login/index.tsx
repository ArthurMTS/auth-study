import { useState, useContext } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { PageRoutes } from "@/pages";
import { UserContext } from "@/contexts/user";
import { iUser } from "@/config/types";

export const LoginAdmin = () => {
  const {setUser, setLoggedAdmin} = useContext(UserContext);
  const [loggedInAdmin, setLoggedInAdmin] = useState<iUser>({email: "", password: "", admin: true, name: "" });
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoggedInAdmin((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loggedInAdmin),
      }).then((response) => response.json())
      .then((loggedInUser) => {
        if (loggedInUser) {
          setLoggedAdmin(true);
          alert("Olá, "+loggedInUser.name+"! Como vai?"); 
          window.location.href = "/dashboard"
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
      <Typography sx={{ fontSize: 26, textAlign: "center", }}>
        Entre ou crie uma nova conta de administrador
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <TextField
          type="email"
          name="email"
          onChange={handleInputChange}
          value={loggedInAdmin.email}
          placeholder="informe seu email"
        />
        <TextField
          type="password"
          name="password"
          onChange={handleInputChange}
          value={loggedInAdmin.password}
          placeholder="informe sua senha"
        />
        <Button onClick={handleLogin}>Log IN</Button>
      </Box>
      <Typography>
        Caso não tenha um conta, basta{" "}
        <Link to={PageRoutes.signinAdmin}>Cadastrar-se</Link>.
      </Typography>
    </Box>
  );
};
