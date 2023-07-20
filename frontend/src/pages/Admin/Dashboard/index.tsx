import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { User } from "@/components";
import { UserContext } from "@/contexts/user";
import { iUser } from "@/config/types";
import { api } from "@/config/api";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState<iUser[]>([]);
  const navigate = useNavigate();

  //TODO No use effect pegar user do context. If false redirect para login
  useEffect(() => {
    if (!user.email || !user.admin) navigate("/admin");
    else loadUsers();
  }, [user]);

  const loadUsers = async () => {
    const data = await api
      .get<iUser[]>("/users")
      .then((response) => response.data);

    setUsers(data.filter((currentUser) => !currentUser.admin));
  };

  const handleLogOut = () => {
    setUser({} as iUser);
    navigate("/admin");
  };

  const handleRemove = async (id: number) => {
    await api.delete(`/users/${id}`);
    loadUsers();
  };

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
        {!!users?.length &&
          users.map((currentUser) => (
            <User
              id={currentUser.id}
              name={currentUser.name}
              email={currentUser.email}
              remove={handleRemove}
            />
          ))}
      </Box>
    </Box>
  );
};
