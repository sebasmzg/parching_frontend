"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
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

  @media (max-width: 768px) {
    padding: 0 10px;
  }
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

const StyledButton = styled(Button)`
  background-color: var(--blue);
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-size: 1rem;

  &:hover {
    background-color: var(--blueSoft);
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

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    // Aquí iría la lógica para el registro
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
          Sign Up
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
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
              "& .MuiInputLabel-root": {
                color: "var(--blue)",
              },
            }}
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
          />
          <TextField
            label="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
              "& .MuiInputLabel-root": {
                color: "var(--blue)",
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <StyledButton variant="contained" fullWidth onClick={handleRegister}>
            Register
          </StyledButton>
        </StyledForm>

        <Typography
          align="center"
          sx={{ margin: "20px 0", color: "var(--blue)" }}
        >
          or
        </Typography>

        <GoogleButton
          onClick={handleGoogleLoginRegister}
        >
          <img src="/assets/img/google.png" alt="Google logo" />
          Sign up with Google
        </GoogleButton>

        <FooterBox>
          <StyledTypography variant="body2">
            Do you have an account already?{" "}
            <Link href="/login" underline="none">
              Login
            </Link>
          </StyledTypography>
        </FooterBox>
      </StyledPaper>
    </MainContainer>
  );
};

export default Register;
