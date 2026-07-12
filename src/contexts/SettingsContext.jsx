import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const SettingsContext = createContext();

const apiUrl = import.meta.env.VITE_API_URL;

function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [settingsError, setSettingsError] = useState("");

  useEffect(() => {
    setSettingsError("");

    axios
      .get(`${apiUrl}/settings`)
      .then((res) => {
        setSettings(res.data.results);
      })
      .catch((error) => {
        console.error(error);

        setSettingsError(
          "Si è verificato un errore durante il caricamento dell'applicazione.",
        );
      });
  }, []);

  const contextValue = {
    settings,
    settingsError,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}

function useSettings() {
  return useContext(SettingsContext);
}

export { SettingsProvider, useSettings };
