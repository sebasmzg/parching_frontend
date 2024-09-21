"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "../store/store"; // Usamos directamente el store
import { AppStore } from "../store/store"; // Tipos de store y persistStore

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const persistorRef = useRef(persistStore(store)); // persistStore inicializado aquí

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
}
