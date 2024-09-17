import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import AccountMenu from "./menu/menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Translate from '@mui/icons-material/Translate'; // Importa el icono de traducción
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTranslation } from 'react-i18next'; 

function NavBar() {
  // Estado del tema (claro u oscuro)
  const [darkMode, setDarkMode] = React.useState(false);

  // Alternar entre claro y oscuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Crear tema dinámico basado en el estado
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  // Función para alternar el idioma
  const { i18n } = useTranslation();
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: darkMode ? "undefined" : "#165252",
          width: "100%",
          height: "64px", // Ajusta la altura aquí si es necesario
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ width: "100%", paddingLeft: 0, paddingRight: 0 }}
          >
            <Box
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                alignItems: "center",
              }}
            >
              <img
                src="/assets/img/parchingHome.png"
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
              {/* Botón de traducción */}
              <IconButton
                onClick={toggleLanguage}
                size="small"
                sx={{ ml: 1 }}
              >
                <Translate />
              </IconButton>
              {/* Icono de cambiar tema */}
              <IconButton
                sx={{ ml: 1 }}
                onClick={toggleDarkMode}
                color="inherit"
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              {/* Menú del usuario */}
              <AccountMenu />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default NavBar;
