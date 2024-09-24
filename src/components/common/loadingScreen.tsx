import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const LoadingScreen: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f5f5f5', // Color de fondo de la pantalla
      }}
    >
      <CircularProgress size={80} />
      <Typography
        variant="h6"
        sx={{
          marginTop: 2,
          color: '#3f51b5', // Color del texto
        }}
      >
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;