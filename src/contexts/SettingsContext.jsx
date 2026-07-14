import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

const apiUrl = import.meta.env.VITE_API_URL;

const defaultAppName = import.meta.env.VITE_DEFAULT_APP_NAME;
const defaultFallbackColor = import.meta.env.VITE_DEFAULT_FALLBACK_COLOR;

function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [settingsError, setSettingsError] = useState("");

  useEffect(() => {
    setSettingsError("");

    axios
      .get(`${apiUrl}/settings`)
      .then((res) => {
        const loadedSettings = res.data.results;

        setSettings(loadedSettings);

        document.title = loadedSettings?.app_name ?? defaultAppName;
      })
      .catch((error) => {
        console.error(error);

        document.title = defaultAppName;

        setSettingsError(
          "Si è verificato un errore durante il caricamento dell'applicazione.",
        );
      });
  }, []);

  const appName = settings?.app_name ?? defaultAppName;

  const fallbackColor = settings?.fallback_color ?? defaultFallbackColor;

  const contextValue = {
    settings,
    settingsError,
    appName,
    fallbackColor,
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
