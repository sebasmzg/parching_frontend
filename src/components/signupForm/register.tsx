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
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { setLoading } from "@/store/authslice";
import { ApiService } from "@/lib/actions";

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
  background: linear-gradient(135deg, #165252 0%, #ffffff 100%);
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
  font-family: "Belleza", sans-serif;
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

// Component

const Register: React.FC = () => {
  interface UserState {
    email: string;
    password: string;
    confirmPassword?: string;
  }

  /* initial state */
  const initialState: UserState = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  /* user initial state */
  const [user, setUser] = useState<UserState>(initialState);

  /* login with email and password */
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  /* login with google */
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  /* show and hide password */
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* loading state */
  const [loading, setLoading] = useState(false);

  /* instancia API */
  const apiService = new ApiService();

  /* router */
  const router = useRouter();

  /* función para manejar los cambios en los datos de registro del usuario */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  /* funciones */


  /* login with google */
  const handleGoogleLoginRegister = async () => {
    try {
      const res = await signInWithGoogle;
      console.log(res);
      sessionStorage.setItem("user", "true");
      if (sessionStorage.getItem("user")) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
    console.log("Login con Google");
  };

  /* show password */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  /* hide password */

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  /* función para realizar el registro del usuario al dar click en submit */

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      /* crear usuario firebase */
      const firebaseUser = await createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      console.log("firebase user: "+firebaseUser);

      /* crear usuario base de datos */
      const apiResponse = await apiService.createUser({
        email: user.email,
        password: user.password,
      })
      console.log("API response: "+apiResponse);

      /* almacenar estado de sesión */
      sessionStorage.setItem("user", "true");
      setUser(initialState);

      router.push("/login");

    } catch (error) {
      console.error("Error signing up", error);
    } finally {
      setLoading(false);
    }

    console.log("Email:", user.email);
    console.log("Password:", user.password);
    console.log("Confirm Password:", user.confirmPassword);
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
        <StyledForm onSubmit={handleRegister}>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            fullWidth
            value={user.email}
            onChange={handleChange}
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
            name="password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            value={user.password}
            onChange={handleChange}
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
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            value={user.confirmPassword}
            onChange={handleChange}
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
          <StyledButton type="submit" disabled={loading}>{loading ? "Loading..." : "Register"}</StyledButton>
        </StyledForm>

        <Typography
          align="center"
          sx={{ margin: "20px 0", color: "var(--blue)" }}
        >
          or
        </Typography>

        <GoogleButton onClick={handleGoogleLoginRegister}>
          <img src="/assets/img/google.png" alt="Google logo" />
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
