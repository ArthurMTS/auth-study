import { Box, Button, Typography } from "@mui/material";

import { User } from "@/components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/user";
import { iUser } from "@/config/types";

export const Dashboard = () => {
  const { user, logout, listUser, users } = useContext(UserContext);
  const handleLogOut = () => {
    logout();
  };

  useEffect(() => {
    listUser();
  }, []);

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
        {users.map((element) => (
          <User id={element.id} name={element.name} email={element.email} />
        ))}
      </Box>
    </Box>
  );
};
