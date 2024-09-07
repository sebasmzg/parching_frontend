import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Link } from '@mui/material';
import { useRouter } from 'next/router';

const Register: React.FC = () => {
  const router = useRouter();
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
      maxWidth="xs"
      sx={{
        backgroundColor: 'var(--lightBlue)',
        borderRadius: 2,
        padding: 3,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom color="var(--blue)">
        Regístrate
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Correo Electrónico"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirmar Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleRegister}
          sx={{ backgroundColor: 'var(--blue)', color: 'white' }}
        >
          Regístrate
        </Button>
      </Box>
      <Box mt={2} display="flex" justifyContent="center">
        <Typography variant="body2">
          ¿Ya tienes una cuenta?{' '}
          <Link
            href="/login"
            underline="hover"
            sx={{ color: 'var(--blueSoft)', cursor: 'pointer' }}
          >
            Inicia sesión
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
