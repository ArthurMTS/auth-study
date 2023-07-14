import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { PageRoutes } from "@/pages";
import { UserContext } from "@/contexts/user";
import { useToast } from "@/hooks/useToast";
import { validateEmail, validatePassword, validatePasswordConfirmation } from "@/utils/validation";
import { createUser } from "@/config/types";

export const SigninAdmin = () => {
  const { signin, setAuth, auth, user, admins, listUser } = useContext(UserContext);
  const { handleToastError } = useToast();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleClickShowConfirmationPassword = () =>
    setShowConfirmationPassword((show) => !show);
  const handleMouseDownConfirmationPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    setAuth(false);
    listUser();
  }, []);

  const handleSignin = () => {
    console.log(admins);
    const isEmailRegistered = admins.some(item => item.email === email);

    if(isEmailRegistered) {
      handleToastError("Email já cadastrado.");
      return;
    }

    if (!validatePassword(password)) {
      handleToastError("A senha deve ter no mínimo 8 caracteres.");
      return;
    }
  
    if (!validatePasswordConfirmation(password, passwordConfirmation)) {
      handleToastError("A senha e a confirmação de senha não são iguais.");
      return;
    }
  
    if (!validateEmail(email)) {
      handleToastError("O email fornecido não é válido.");
      return;
    }

    const newUser: createUser = {
      name: username,
      admin: 1,
      email: email,
      password: password,
    };

    signin(newUser);
    navigate("/admin");
  };

  if(auth === true && user.admin === 1) {
    return <Navigate to="/dashboard" />
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "500px",
        margin: "20px auto",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
      }}
    >
      <Typography sx={{ fontSize: 26 }}>
        Cadastre um novo administrador
      </Typography>

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
          placeholder="informe sua senha"
        />
        <OutlinedInput
          type={showConfirmationPassword ? "text" : "password"}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          value={passwordConfirmation}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmationPassword}
                onMouseDown={handleMouseDownConfirmationPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          placeholder="confirme sua senha"
          error={password != passwordConfirmation}
        />
        <Button onClick={handleSignin}>Sign IN</Button>
      </Box>
      <Typography>
        Caso já tenha uma conta, basta{" "}
        <Link to={PageRoutes.loginAdmin}>Logar</Link>.
      </Typography>
    </Box>
  );
};