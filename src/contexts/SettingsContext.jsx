import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const SettingsContext = createContext();

const apiUrl = import.meta.env.VITE_API_URL;

function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    axios
      .get(`${apiUrl}/settings`)
      .then((res) => setSettings(res.data.results))
      .catch((e) => alert("ERRORE: " + e.message))
      .finally(() => console.log("Chiamata settings finita"));
  }, []);

  const contextValue = {
    settings,
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
