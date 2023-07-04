import { Box, Button, Typography } from "@mui/material";

interface HeaderProps {
  title: string;
  username: string;
  onLogOut: () => void;
}

export const Header = ({ title, username, onLogOut }: HeaderProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography sx={{ fontSize: 26 }}>
        {title}, {username}.
      </Typography>
      <Button sx={{ background: "#eb2142", color: "#fff" }} onClick={onLogOut}>
        Log Out
      </Button>
    </Box>
  );
};
