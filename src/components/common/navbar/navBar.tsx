import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import AccountMenu from './menu/menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" className="navbar" sx={{backgroundColor: darkMode ? 'undefined' : '#3C4556'}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Belleza',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {/* Enlaces de navegación */}
              home
            </Box>
            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
              {/* Icono de cambiar tema */}
              <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
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
