"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import AccountMenu from "./menu/menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Translate from "@mui/icons-material/Translate";
import CssBaseline from "@mui/material/CssBaseline";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const NavBar: React.FC = () => {
  /* const [darkMode, setDarkMode] = React.useState<boolean>(false);

  const toggleDarkMode = React.useCallback(() => {
    setDarkMode((prevMode) => !prevMode);
  }, []);
 */
  const [user] = useAuthState(auth);
  const router = useRouter();
  const apiUser = sessionStorage.getItem("user");

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          /* backgroundColor: darkMode ? "#1a1a1a" : "#165252", */
          width: "100%",
          height: "64px",
          backgroundColor: "#165252",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Logo alineado a la izquierda */}
            <Box
              component="a"
              href="/"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="/assets/img/parchingHome.png"
                alt="Logo"
                style={{ height: "50px", width: "110px" }}
              />
            </Box>

            {/* Contenedor de botones alineado a la derecha */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
                {(user || apiUser) && (
                <Box
                  component="a"
                  href="/post"
                  sx={{
                  marginRight: 2,
                  display: { xs: "none", md: "flex" },
                  textDecoration: "none",
                  color: "white",
                  }}
                >
                  <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ borderRadius: "20px" }}
                  onClick={() => router.push("/post")}
                  >
                  Events
                  </Button>
                </Box>
                )}
              <IconButton size="small" sx={{ mx:2 }}>
                <Translate />
              </IconButton>
              {/* <IconButton
                sx={{ ml: 1 }}
                onClick={toggleDarkMode}
                color="inherit"
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton> */}
              <AccountMenu />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
