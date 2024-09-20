import React, { createContext, useContext } from 'react';
import { toast } from 'react-toastify';

interface AlertContextType {
  showAlert: (message: string, type?: 'success' | 'error') => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const showAlert = (message: string, type: 'success' | 'error' = 'success') => {
    type === 'success' ? toast.success(message) : toast.error(message);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert');
  }
  return context;
};
