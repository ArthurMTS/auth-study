import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { useState } from "react";

interface PasswordInputProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export const PasswordInput = ({
  value,
  placeholder,
  onChange,
  error = false,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <OutlinedInput
      type={showPassword ? "text" : "password"}
      onChange={(event) => onChange(event.target.value)}
      value={value}
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
      placeholder={placeholder}
      error={error}
    />
  );
};
