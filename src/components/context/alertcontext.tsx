import { createContext, useContext } from "react";
import { toast } from "react-toastify";

// interfaz 
export interface AlertContexType {
  showAlert: (message: string, 
              type?: 'success' | 'error') => void;
}

const AlertContext = createContext<AlertContexType | undefined>(undefined);

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

// hook para usar el contexto
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert debe ser usado dentro de un AlertProvider');
  }
  return context;
};
