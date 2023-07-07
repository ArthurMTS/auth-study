import { useContext, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { UserContext } from "@/contexts/user";
import { useToast } from "@/hooks/useToast";
import { validateEmail, validatePassword } from "@/utils/validation";
import { updateUser } from "@/config/types";

export const Home = () => {
  const { popUser, logout, user, update } = useContext(UserContext);
  const { handleToastError } = useToast();
  const [username, setUsername] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleLogOut = () => {
    logout();
  };

  const handleUpdate = () => {
    if (username.trim() === "" || email.trim() === "" || password.trim() === "") {
      handleToastError("Nenhum campo vazio.");
      return;
    }

    if (!validatePassword(password)) {
      handleToastError("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    if (!validateEmail(email)) {
      handleToastError("O email fornecido não é válido.");
      return;
    }

    const newUser: updateUser = {
      name: username,
      email: email,
      password: password,
      admin: 0
    }

    update(newUser, user.id);
  };

  const handleDelete = () => {
    popUser();
  };

  return (
    <Box sx={{ width: 500, margin: "20px auto" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: 26 }}>Bem-vindo, {user.name}.</Typography>
        <Button
          sx={{ background: "#eb2142", color: "#fff" }}
          onClick={handleLogOut}
        >
          Log Out
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <TextField
          type="text"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          placeholder="informe seu nome"
        />
        <TextField
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          placeholder="informe seu email"
        />
        <OutlinedInput
          type={showPassword ? "text" : "password"}
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          placeholder="mude sua senha"
        />
        <Button
          sx={{ background: "#21eb4d", color: "#fff" }}
          onClick={handleUpdate}
        >
          Atualizar
        </Button>
        <Button
          sx={{ background: "#ff0026", color: "#fff" }}
          onClick={handleDelete}
        >
          Excluir Usuário
        </Button>
      </Box>
    </Box>
  );
};