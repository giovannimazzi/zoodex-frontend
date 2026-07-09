import { NavLink } from "react-router-dom";
import { useSettings } from "../contexts/SettingsContext";

export default function Header() {
  const { settings } = useSettings();

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-light bg-light shadow-sm fixed-top">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            {settings ? (
              <img
                src={settings.navbar_logo}
                alt={settings.app_name}
                style={{ height: "80px", marginTop: "-20px" }}
              />
            ) : (
              <div
                className="spinner-border spinner-border-sm"
                role="status"
              ></div>
            )}
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Apri/chiudi navigazione"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/animals">
                  Animali
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
