import { Copyright, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const {
    email,
    password,
    emailError,
    passwordError,
    setEmail,
    setPassword,
    setEmailError,
    setPasswordError,
    user,
    setUser,
    handleRegister,
    handleLogin,
    handleLogOut,
    hasAccount,
    setHasAccount,
  } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "max",
        height: "650px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="form-container">
        <h2>Faiza Cafe {hasAccount ? "Login Form" : "Register Now"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
          />
          {hasAccount ? (
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
          ) : (
            <button type="submit" onClick={handleRegister}>
              Register
            </button>
          )}

          <Grid container>
            <Grid item>
              <Typography
                variant="body2"
                sx={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => setHasAccount(!hasAccount)}
              >
                {hasAccount
                  ? "Don't have an account? - Register Now"
                  : "Already have an account ? - Login"}
              </Typography>
            </Grid>
            <Copyright sx={{ mt: 0, mb: 4 }} />
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default Auth;
