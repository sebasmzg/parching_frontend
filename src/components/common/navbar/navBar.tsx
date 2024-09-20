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
  const [user] = useAuthState(auth);
  const router = useRouter();
  const apiUser = sessionStorage.getItem("user");

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0))",
          display: "flex",
          alignItems: "center",
          boxShadow: 0,
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
            {/* Logo aligned to the left */}
            <Box
              component="a"
              href="/"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="/assets/img/parchingHome.png"
                alt="Logo"
                style={{ height: "110px", width: "auto" }}
              />
            </Box>

            {/* Button container aligned to the right */}
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
              <IconButton size="small" sx={{ mx: 2, color: 'black' }}>
                <Translate />
              </IconButton>
              <AccountMenu />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
