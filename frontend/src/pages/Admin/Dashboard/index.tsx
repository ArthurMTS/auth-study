import { useContext, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { User } from "@/components";
import { iUser } from "@/config/types";
import { UserContext } from "@/contexts/user";
import { api } from "@/config/api";

export const Dashboard = () => {
  const [users, setUsers] = useState<iUser[]>([]);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.name || !user.admin) navigate("/admin");
  }, [user]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await api.get("/users");
      const users = response.data.filter((user: iUser) => !user.admin);
      setUsers(users);
    };

    fetchUsers();
  }, []);

  const handleLogOut = () => {
    setUser({} as iUser);
  };

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
        {users.map((user) => (
          <User
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
          />
        ))}
      </Box>
    </Box>
  );
};
