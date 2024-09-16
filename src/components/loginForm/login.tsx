"use client";

import React, { useState } from "react";
import {
  TextField,
  Typography,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styled from "styled-components";

// Styled Components
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 20px;
`;

const StyledPaper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  border-radius: 16px;
  background-color: var(--lightBlue);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledButton = styled.button`
  background-color: var(--blue);
  color: white;
  padding: 12px;
  border-radius: 8px;
  border: none;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--blueSoft);
  }
`;

const GoogleButton = styled.button`
  background-color: transparent;
  color: #db4437;
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
  border: none;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c23321;
    color: white;
  }

  img {
    margin-right: 8px;
    width: 40px;
    height: 40px;
  }
`;

const FooterBox = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;

  a {
    color: var(--blueSoft);
    font-weight: bold;
    &:hover {
      text-decoration: underline;
      color: var(--blueSoft);
    }
  }
`;

const StyledTypography = styled(Typography)`
  color: var(--violet);
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // Aquí iría la lógica para el login
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleGoogleLoginRegister = () => {
    // Aquí iría la lógica para iniciar sesión con Google
    console.log("Login con Google");
  };

  return (
    <MainContainer>
      <StyledPaper>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "var(--blue)", fontWeight: "bold" }}
        >
          Sign in
        </Typography>
        <StyledForm>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
              "& .MuiInputLabel-root": {
                color: "var(--blue)",
              },
            }}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
              "& .MuiInputLabel-root": {
                color: "var(--blue)",
              },
            }}
          />
          <StyledButton onClick={handleLogin}>Login</StyledButton>
        </StyledForm>

        <Typography
          align="center"
          sx={{ margin: "20px 0", color: "var(--blue)" }}
        >
          or
        </Typography>

        <GoogleButton onClick={handleGoogleLoginRegister}>
          <img src="/assets/img/google.png" alt="Google logo" />
          Sign in with Google
        </GoogleButton>

        <FooterBox>
          <StyledTypography variant="body2">
            Don't have an account?{" "}
            <Link href="/signup" underline="none">
              Sign up
            </Link>
          </StyledTypography>
        </FooterBox>
      </StyledPaper>
    </MainContainer>
  );
};

export default Login;
