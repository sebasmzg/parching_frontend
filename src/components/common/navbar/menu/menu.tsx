"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { Button, Modal } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authslice";
import LoginForm from "@/components/loginForm/login";
import CloseIcon from "@mui/icons-material/Close";
import Register from "@/components/signupForm/register";
import { RootState } from "@/store/store";


export default function AccountMenu() {
  const dispatch = useDispatch();
  const router = useRouter();

  /* Obtener estado de autenticación desde Redux */
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  let loggedUser = { name: "", avatar: "" };
  if(isAuth) {
    loggedUser = {
      name: localStorage.getItem("userName") || "",
      avatar: localStorage.getItem("userAvatar") || "",
    };
  }

  /* menu functions */
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /* sign out */
  const handleLogout = async () => {
    dispatch(logout());
    localStorage.clear();
    console.log("User signed out");
    router.push("/");
  };

  /* login modal state */
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const [openModalRegister, setOpenModalRegister] = React.useState(false);
  const handleOpenModalLogin = () => setOpenModalLogin(true);
  const handleOpenModalRegister = () => setOpenModalRegister(true);
  const handleCloseModalLogin = () => setOpenModalLogin(false);
  const handleCloseModalRegister = () => setOpenModalRegister(false);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        {/* user verification */}
        {isAuth ? (
          <>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "20px",
                boxShadow: 3,
                backgroundColor: "#165252",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#013b58",
                },
              }}
              onClick={() => router.push("/events")}
            >
              Add Event
            </Button>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{
                  ml: 2,
                  borderRadius: "50%",
                  bgcolor: "background.paper",
                  boxShadow: 3,
                }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  sx={{ width: 40, height: 40 }}
                  src={loggedUser.avatar || undefined}
                />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Box>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                borderRadius: "20px",
                boxShadow: 3,
                mr: 2,
                color: "#165252",
                fontWeight: "bold",
                borderColor: "#165252",
                backgroundColor: "#d2deec",
                "&:hover": {
                  backgroundColor: "#013b58",
                  color: "white",
                  borderColor: "#013b58",
                },
              }}
              onClick={handleOpenModalLogin}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "20px",
                boxShadow: 3,
                backgroundColor: "#165252",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#013b58",
                  color: "white",
                  borderColor: "#013b58",
                },
              }}
              onClick={handleOpenModalRegister}
            >
              Sign up
            </Button>
          </Box>
        )}
      </Box>

      {/* Modal para Login */}
      <Modal
        open={openModalLogin}
        onClose={handleCloseModalLogin}
        aria-labelledby="login-modal"
        aria-describedby="login-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(5px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            bgcolor: "transparent",
            boxSizing: "border-box",
            width: "100%",
            maxWidth: "450px",
            maxHeight: "600px",
          }}
        >
          {/* Botón de cerrar */}
          <IconButton
            onClick={handleCloseModalLogin}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Formulario de login */}
          <LoginForm />
        </Box>
      </Modal>

      {/* Modal para Register */}
      <Modal
        open={openModalRegister}
        onClose={handleOpenModalRegister}
        aria-labelledby="login-modal"
        aria-describedby="login-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(5px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            bgcolor: "transparent",
            boxSizing: "border-box",
            width: "100%",
            maxWidth: "450px",
            maxHeight: "600px",
          }}
        >
          {/* Botón de cerrar */}
          <IconButton
            onClick={handleCloseModalRegister}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Formulario de register */}
          <Register />
        </Box>
      </Modal>

      {/* menu items */}
      {isAuth && (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.2))",
                mt: 1.5,
                borderRadius: 2,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar
              sx={{ bgcolor: "primary.main" }}
              src={loggedUser.avatar || undefined}
            />
            <Link href="/profile" passHref>
              <Button sx={{ ml: 2, color: "text.primary" }}>
                {loggedUser.name}
              </Button>
            </Link>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <Link href="/post" passHref>
              <Button sx={{ ml: 2, color: "text.primary" }}>Events</Button>
            </Link>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      )}
    </>
  );
}
