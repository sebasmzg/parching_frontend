"use client";

import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Link, Paper, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // Aquí iría la lógica para el login
    console.log('Email:', email);
    console.log('Password:', password);
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
          Sign in
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
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
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            onClick={handleLogin}
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
            Login
          </Button>
        </Box>
        <Box mt={2} display="flex" justifyContent="center">
          <Typography variant="body2" sx={{ color: 'var(--violet)' }}>
            Dont have an account?{' '}
            <Link
              href="/signup"
              underline="none"
              sx={{
                color: 'var(--blueSoft)',
                fontWeight: 'bold',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
