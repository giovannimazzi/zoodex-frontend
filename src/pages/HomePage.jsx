import { Link } from "react-router-dom";
import { FcBinoculars } from "react-icons/fc";

import ImageWithFallback from "../components/ImageWithFallback";
import { useSettings } from "../contexts/SettingsContext";

export default function HomePage() {
  const { settings, settingsError, appName } = useSettings();

  if (settingsError) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger text-center" role="alert">
          {settingsError}
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Caricamento {appName}...</span>
        </div>

        <p className="text-muted mt-3 mb-0">Caricamento {appName}...</p>
      </div>
    );
  }

  return (
    <div className="container py-4 text-center">
      <h1 className="visually-hidden">{appName}</h1>

      <ImageWithFallback
        src={settings.hero_logo}
        alt={appName}
        title={appName}
        className="img-fluid d-block mx-auto mb-2"
        fallback={
          <span className="display-1 fw-bold text-danger">🦜{appName}</span>
        }
      />

      <h2 className="fw-bold mb-0 text-danger">Know Them All</h2>

      <p className="h2 fw-bold mb-3 text-success">Conoscili Tutti</p>

      <p className="lead fw-medium mx-auto mb-4 w-75">
        <strong>{appName}</strong> è un archivio digitale dedicato alla scoperta
        di animali reali reinterpretati in chiave <strong>fantasy</strong>.
        <br />
        Attraverso schede dettagliate, immagini, habitat, abilità e altre
        caratteristiche zoologiche, vuole trasformare la
        <strong> curiosità</strong> in <strong>conoscenza</strong>, avvicinando
        bambini e ragazzi al mondo della natura con lo stesso spirito di
        <strong> esplorazione</strong> e <strong>meraviglia</strong> che ha reso
        celebre il <strong>Pokédex</strong> dei Pokémon.
      </p>

      <p className="mb-0 text-muted">Archivio composto da</p>

      <h2 className="display-5 fw-bold">{settings.animals_count ?? 0}</h2>

      <p className="mb-4 text-muted">animali catalogati</p>

      <Link className="btn btn-warning btn-lg" to="/animals">
        <FcBinoculars className="me-2" />
        OSSERVA GLI ANIMALI
        <FcBinoculars className="ms-2" />
      </Link>
    </div>
  );
}
