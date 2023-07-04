import { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Header, User } from "@/components";
import { iUser } from "@/config/types";
import { UserContext } from "@/contexts/user";
import { getUsers } from "@/utils/user";

export const Dashboard = () => {
  const [users, setUsers] = useState<iUser[]>([]);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.name || !user.admin) navigate("/admin");
  }, [user]);
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers().then((users) =>
        users.filter((user: iUser) => !user.admin)
      );
      setUsers(users);
    };

    fetchUsers();
  }, []);

  const handleLogOut = () => setUser({} as iUser);

  return (
    <Box sx={{ width: 500, margin: "20px auto" }}>
      <Header
        title="Painel de Admin"
        username={user.name}
        onLogOut={handleLogOut}
      />

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
