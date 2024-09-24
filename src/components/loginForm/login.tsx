"use client";

import React, { useState } from "react";
import {
  TextField,
  Typography,
  Link,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import {
  useSignInWithGoogle
} from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { ApiService } from "@/services/actions";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, setLoading, setError } from "@/store/authslice";
import { RootState } from "@/store/store";


const Login: React.FC = () => {
  interface UserState {
    email: string;
    password?: string;
    id: string;
    name: string;
    avatar?: string;
  }

  const initialState: UserState = {
    email: "",
    password: "",
    id: "",
    name: "",
    avatar: "",
  };

  const apiService = new ApiService();
  const [user, setUser] = useState<UserState>(initialState);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const storeUserInLocalStorage = (user: UserState) => {
    localStorage.setItem("userId", user.id);
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userAvatar", user.avatar || "");
  };

  const handleGoogleLogin = async () => {
    dispatch(setLoading(true));
    try {
      const res = await signInWithGoogle();
      if (res?.user) {
        const googleUser = {
          email: res.user.email || "",
          id: res.user.uid || uuidv4(),
          name: res.user.displayName || "",
          avatar: res.user.photoURL || "",
        };
        /* const token = await res.user.getIdToken();
        const userIn = await apiService.loginUser(googleUser.email, token); */
        /* console.log("User in:", userIn); */
        console.log("Google user id:", googleUser.id);
        console.log("google user: ", googleUser);
        
        dispatch(loginSuccess(googleUser));
        storeUserInLocalStorage(googleUser);
        setUser(initialState);
        router.push("/post");
      }
    } catch (error) {
      dispatch(setError("Error signing in with Google"));
      console.error("Error signing in with Google", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      dispatch(setError("Please fill all fields"));
      return;
    }
    dispatch(setLoading(true));

    try {
      const apiResponse = await apiService.loginUser(user.email, user.password);
      const userIn = await apiService.getUserById(apiResponse);
      const userLogged = {
        email: userIn.email,
        id: userIn.id,
        avatar: userIn.profilePicture,
        name: userIn.name,
      };

      dispatch(loginSuccess(userLogged));
      storeUserInLocalStorage(userLogged);
      setUser(initialState);
      router.push("/post");
    } catch (error) {
      dispatch(setError("Error signing in"));
      console.error("Error signing in", error);
    } finally {
      dispatch(setLoading(false));
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

        {error && (
          <Snackbar open={!!error} autoHideDuration={6000}>
            <Alert severity="error" sx={{ width: "100%" }}>
              {error}
            </Alert>
          </Snackbar>
        )}

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
              "& .MuiOutlinedInput-root": { borderRadius: 3 },
              "& .MuiInputLabel-root": { color: "var(--blue)" },
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
              "& .MuiOutlinedInput-root": { borderRadius: 3 },
              "& .MuiInputLabel-root": { color: "var(--blue)" },
            }}
          />
          <StyledButton type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </StyledButton>
        </StyledForm>

        <Typography align="center" sx={{ margin: "20px 0", color: "var(--blue)" }}>
          or login with
        </Typography>

        <GoogleButton onClick={handleGoogleLogin} disabled={loading}>
          <img src="/assets/img/google.png" alt="Google logo" />
        </GoogleButton>

        <FooterBox>
          <StyledTypography variant="body2">
            Dont have an account?
            <Link href="/signup" underline="none">
              Sign up
            </Link>
          </StyledTypography>
        </FooterBox>
      </StyledPaper>
    </MainContainer>
  );
};

// Styled Components (mantener igual)

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
  text-align: center;
  font-size: 18px;
`;

export default Login;

function uuidv4(): string {
  throw new Error("Function not implemented.");
}
