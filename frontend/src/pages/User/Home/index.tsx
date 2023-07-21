import { useContext, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { UserContext } from "@/contexts/user";
import { iUser } from "@/config/types";

export const Home = () => {
  const { loggedUser, setLoggedUser, user, setUser } = useContext(UserContext);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [acessed, setAcessed] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState<iUser>({
    email: user.email,
    password: user.password,
    admin: false,
    name: user.name,
  });

  const handleLogOut = () => {
    setAcessed(1);
    setLoggedUser(false);
  };

  const handleDelete = () => {
    try {
      if (loggedInUser.password === passwordConfirmation) {
        const response = fetch(`http://localhost:5000/users/${user.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loggedInUser),
        });
        alert("usuário deletado");
        setLoggedUser(false);
      } else alert("Para excluir é necessario confirmar senha");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoggedInUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleUpdate = () => {
    try {
      if (loggedInUser.password === passwordConfirmation) {
        const response = fetch(`http://localhost:5000/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loggedInUser),
        }).then(response => response.json());
        alert("Dados atualizados");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  if (loggedUser == false || user.admin == true) {
    window.location.href = "/";
    if (acessed == 0)
      alert("Faça seu login de usuário para acessar essa tela!");
    return;
  }

  return (
    <Box sx={{ width: 500, margin: "20px auto" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: 26 }}>Bem-vindo, Visitante.</Typography>
        <Button
          sx={{ background: "#eb2142", color: "#fff" }}
          onClick={handleLogOut}
        >
          Log Out
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <TextField
          label="Name"
          name="name"
          type="text"
          onChange={handleInputChange}
          value={loggedInUser.name}
          placeholder="informe seu nome"
        />
        <TextField
          type="email"
          name="email"
          label="Email"
          onChange={handleInputChange}
          value={loggedInUser.email}
          placeholder="informe seu email"
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          onChange={handleInputChange}
          value={loggedInUser.password}
          placeholder="informe sua senha"
        />
        <TextField
          type="password"
          onChange={event => setPasswordConfirmation(event.target.value)}
          value={passwordConfirmation}
          label="Confirm Password"
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
