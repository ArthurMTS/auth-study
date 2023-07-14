import { UserContext } from "@/contexts/user";
import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { ConfirmationPopup } from "@/components/ConfirmPopup";

interface UserProps {
  id: number;
  name: string;
  email: string;
}

export const User = ({ id, name, email }: UserProps) => {
  const { popAdmin } = useContext(UserContext);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleRemove = () => setShowConfirmation(true);

  const onClickButtonCancel = () => setShowConfirmation(false);

  const onClickButtonConfirm = () => {
    setShowConfirmation(false);
    popAdmin(id);
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
      <Box>
        <ConfirmationPopup
          message="Tem certeza que deseja excluir esse usuário?"
          open={showConfirmation}
          onConfirm={onClickButtonConfirm}
          onCancel={onClickButtonCancel}
        />
      </Box>
    </Box>
  );
};
