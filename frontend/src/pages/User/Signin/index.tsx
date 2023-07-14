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
import { validateEmail, validatePassword, validatePasswordConfirmation } from "@/utils/validation";
import { UserContext } from "@/contexts/user";
import { useToast } from "@/hooks/useToast";
import { createUser } from "@/config/types";

export const SigninUser = () => {
  const { signin, setAuth, auth, user, users, listUser } = useContext(UserContext);
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
    console.log(users);
    const isEmailRegistered = users.some(item => item.email === email);

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
      admin: 0,
      email: email,
      password: password,
    };

    signin(newUser);
    navigate("/");
  };

  if(auth === true && user.admin === 0) {
    return <Navigate to="/home" />
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
      <Typography sx={{ fontSize: 26 }}>Cadastre-se</Typography>

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
        Caso já tenha uma conta, basta <Link to={PageRoutes.login}>Logar</Link>.
      </Typography>
    </Box>
  );
};