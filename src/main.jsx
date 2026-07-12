import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// Foglio di stile custom
import "./assets/css/index.css";

import App from "./App.jsx";
import { SettingsProvider } from "./contexts/SettingsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </StrictMode>,
);
