import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice'; // Importa el reducer del authslice

export const store = configureStore({
  reducer: {
    auth: authReducer, // Aquí indicas el reducer del authslice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
