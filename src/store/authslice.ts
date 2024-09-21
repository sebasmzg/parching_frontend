import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Estado inicial del slice de autenticación
interface AuthState {
  isAuth: boolean;
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  } | null;
  loading: boolean;
  error: string | null;
}

// Estado inicial vacío (ningún usuario autenticado)
const initialState: AuthState = {
  isAuth: false,
  user: null,
  loading: false,
  error: null,
};

// Creación del slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Acción para manejar el estado de carga
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // Acción para manejar el éxito del inicio de sesión
    loginSuccess: (state, action: PayloadAction<{ id: string; email: string; name: string; avatar?: string }>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      state.isAuth = true;
    },
    // Acción para manejar errores durante la autenticación
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Acción para manejar el cierre de sesión
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

// Exporta las acciones que has definido
export const { setLoading, loginSuccess, setError, logout } = authSlice.actions;

// Exporta el reducer para añadirlo al store
export default authSlice.reducer;
