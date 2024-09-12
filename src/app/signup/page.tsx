"use client"

import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Link, Paper } from '@mui/material';
import { useRouter } from 'next/router';

const Register: React.FC = () => {
  // const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Aquí iría la lógica para el registro
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 4,
          backgroundColor: 'var(--lightBlue)',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ color: 'var(--blue)', fontWeight: 'bold' }}>
          Regístrate
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Correo Electrónico"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
              '& .MuiInputLabel-root': {
                color: 'var(--blue)',
              },
            }}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
              '& .MuiInputLabel-root': {
                color: 'var(--blue)',
              },
            }}
          />
          <TextField
            label="Confirmar Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
              '& .MuiInputLabel-root': {
                color: 'var(--blue)',
              },
            }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleRegister}
            sx={{
              backgroundColor: 'var(--blue)',
              color: 'white',
              padding: 1.5,
              borderRadius: 3,
              '&:hover': {
                backgroundColor: 'var(--blueSoft)',
              },
            }}
          >
            Regístrate
          </Button>
        </Box>
        <Box mt={2} display="flex" justifyContent="center">
          <Typography variant="body2" sx={{ color: 'var(--violet)' }}>
            ¿Ya tienes una cuenta?{' '}
            <Link
              href="/login"
              underline="none"
              sx={{
                color: 'var(--blueSoft)',
                fontWeight: 'bold',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Inicia sesión
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
