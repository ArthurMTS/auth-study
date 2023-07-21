import { Box, Button, Typography } from "@mui/material";

import { useContext, useState } from "react";
import { UserContext } from "@/contexts/user";
import { User } from "@/components";
import { iUser } from "@/config/types";

export const Dashboard = () => {
  const { setLoggedAdmin, loggedAdmin, user, getUsers, users } =
    useContext(UserContext);
  const [acessed, setAcessed] = useState(0);

  const handleLogOut = () => {
    setAcessed(1);
    setLoggedAdmin(false);
  };

  const handleDelete = (id: number | undefined) => {
    if (confirm("deseja deletar o usuário?")) {
      try {
        const response = fetch(`http://localhost:5000/users/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        alert("Deletado!");
        window.location.reload();
      } catch (error) {
        console.error("Erro:", error);
      }
    }
  };

  if (loggedAdmin == false || user.admin == false) {
    window.location.href = "/admin";
    if (acessed == 0) {
      alert("Faça seu login de admin para acessar essa tela!");
    }
    return;
  }

  getUsers();

  return (
    <Box sx={{ width: 500, margin: "20px auto" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: 26 }}>
          Painel de Admin, {user.name}
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
        {users?.map((itemUser: iUser) => {
          if (itemUser.admin == false) {
            return (
              <>
                <User
                  key={itemUser.id}
                  id={itemUser.id}
                  name={itemUser.name}
                  email={itemUser.email}
                  handleRemove={() => handleDelete(itemUser.id)}
                />
              </>
            );
          }
        })}
      </Box>
    </Box>
  );
};
