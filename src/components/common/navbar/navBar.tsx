// navBar.tsx
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
import { useTheme } from "@mui/material";

const NavBar: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState<boolean>(false);
  const theme = useTheme();

  const toggleDarkMode = React.useCallback(() => {
    setDarkMode((prevMode) => !prevMode);
  }, []);

  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: darkMode ? "#1a1a1a" : "#165252",
          width: "100%",
          height: "64px",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              component="a"
              href="/"
              sx={{ mr: 2, display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              <img
                src="/assets/img/parchingHome.png"
                alt="Logo"
                style={{ height: "50px", width: "110px" }}
              />
            </Box>
            <Box
              component="a"
              href="/"
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            >
              home
            </Box>
            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
              <IconButton size="small" sx={{ ml: 1 }}>
                <Translate />
              </IconButton>
              <IconButton
                sx={{ ml: 1 }}
                onClick={toggleDarkMode}
                color="inherit"
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <AccountMenu />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default NavBar;