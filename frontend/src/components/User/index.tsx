import { Box, Button, Typography } from "@mui/material";

import { api } from "@/config/api";

interface UserProps {
  id: number;
  name: string;
  email: string;
}

export const User = ({ id, name, email }: UserProps) => {
  const handleRemove = async () => {
    if (!confirm("Essa ação é irreversível, tem certeza que deseja continuar?"))
      return;
    const response = await api.delete(`/users/${id}`);
    if (response.data) {
      alert("Usuário removido com sucesso");
      location.reload();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: 18, fontWeight: 600 }}>{name}</Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 400, fontStyle: "italic" }}>
        {email}
      </Typography>
      <Button
        sx={{ background: "#ff0026", color: "#fff" }}
        onClick={handleRemove}
      >
        Remover
      </Button>
    </Box>
  );
};
