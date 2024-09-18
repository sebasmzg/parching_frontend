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
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import LoginForm from "@/components/loginForm/login";
import CloseIcon from "@mui/icons-material/Close";

export default function AccountMenu() {
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
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.removeItem("user");
    router.push("/");
  };

  /* login modal state */
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        {/* user verification */}
        {user ? (
          <>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "20px", boxShadow: 3 }}
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
                <Avatar sx={{ width: 40, height: 40 }}>M</Avatar>
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: "20px", boxShadow: 3 }}
            onClick={handleOpenModal}
          >
            Login
          </Button>
        )}
      </Box>

      {/* Modal para Login */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
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
            onClick={handleCloseModal}
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

      {/* menu items */}
      {user && (
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
            <Avatar sx={{ bgcolor: "primary.main" }}>M</Avatar>
            <Link href="/profile" passHref>
              <Button sx={{ ml: 2, color: "text.primary" }}>Profile</Button>
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