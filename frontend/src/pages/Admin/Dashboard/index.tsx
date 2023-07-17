import { Box, Button, Typography } from "@mui/material";

import { useContext, useState } from "react";
import { UserContext } from "@/contexts/user";
import { User } from "@/components";

export const Dashboard = () => {
  const {setLoggedAdmin, loggedAdmin} = useContext(UserContext)
  const [acessed, setAcessed] = useState(0);
  
  const handleLogOut = () => {
    setAcessed(1);
    setLoggedAdmin(false);
  };

  if(loggedAdmin==false) {
    window.location.href = "/admin";
    if(acessed==0) {
      alert("Faça seu Login para acessar essa tela!")
    }
    return
  }

  return (
    <Box sx={{ width: 500, margin: "20px auto" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: 26 }}>
          Painel de Admin, nome-admin
        </Typography>
        <Button
          sx={{ background: "#eb2142", color: "#fff" }}
          onClick={handleLogOut}
        >
          Log Out
        </Button>
      </Box>

      <Box
        sx={{ marginTop: 5, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <User id={0} name="Nome do usuário 1" email="user1@mail.com" />
        <User id={1} name="Nome do usuário 2" email="user2@mail.com" />
        <User id={2} name="Nome do usuário 3" email="user3@mail.com" />
      </Box>
    </Box>
  );
};
