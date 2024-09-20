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
import { useRouter } from "next/navigation";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { ApiService } from "@/lib/authActions";
import { setLoading } from "@/store/authslice";


// Component

const Login: React.FC = () => {
  interface UserState {
    email: string;
    password: string;
  }

  const initialState: UserState = {
    email: "",
    password: "",
  };

  /* Api instance */
  const apiService = new ApiService();


  /* email and passwor login states*/
  const [user, setUser] = useState<UserState>(initialState);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  /* login with google */
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  /* show and hide password */
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  /* router */
  const router = useRouter();

  /* loading state */
  const [loading, setLoading] = useState(false);

  /* cambios initial state */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /* email and password login */

  const LoginFirebase = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(user.email, user.password);
      console.log(res);
      sessionStorage.setItem("user", String(true));
      setUser(initialState);
      router.push("/post");
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  /* login with google */
  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithGoogle();
      console.log(res);
      sessionStorage.setItem("user", String(true));
      if(sessionStorage.getItem("user")){
        router.push("/post");
      }
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
    console.log("Login con Google");
  };

  /* Api login */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      alert("Please fill all fields");
      return;
    }
    try {
      setLoading  (true);

      const apiResponse = await apiService.loginUser(user.email,user.password);
      console.log("API response: " + apiResponse);
      
      sessionStorage.setItem("user", String(true));
      setUser(initialState);

      router.push("/post");
    } catch (error) {
      console.error("Error signing in", error);
    } finally {
      setLoading(false);
    }
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
        <StyledForm onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            type="email"
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
          <StyledButton type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
          </StyledButton>
        </StyledForm>

        <Typography
          align="center"
          sx={{ margin: "20px 0", color: "var(--blue)" }}
        >
          or
        </Typography>

        <GoogleButton onClick={handleGoogleLogin}>
          <img src="/assets/img/google.png" alt="Google logo" />
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
  font-family: "Belleza", sans-serif;
  color: var(--violet);
`;


export default Login;
