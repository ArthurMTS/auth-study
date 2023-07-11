import { api } from "@/config/api";
import { Box, Button, Typography } from "@mui/material";

interface UserProps {
  id: number;
  name: string;
  email: string;
  remove: (id: number) => void;
}

export const User = ({ id, name, email, remove }: UserProps) => {
  const handleRemove = () => {
    const result = confirm(
      `Realmente quer excluir o usuário ${name}!\nClique OK ou Cancel.`
    );
    if (result) {
      remove(id);
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
