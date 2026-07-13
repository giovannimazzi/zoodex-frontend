import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="container py-4">
      <section
        className="d-flex flex-column align-items-center justify-content-center text-center py-5"
        style={{ minHeight: "70vh" }}
      >
        <div className="display-1 fw-bold text-danger mb-3">404</div>

        <h1 className="fw-bold mb-3">Pagina non trovata</h1>

        <p className="text-secondary fs-5 mb-4">
          L'animale o la pagina che stai cercando non esiste oppure il link non
          è più disponibile.
        </p>

        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
          <Link to="/" className="btn btn-outline-secondary px-4">
            Torna alla Home
          </Link>

          <Link to="/animals" className="btn btn-danger px-4">
            Esplora gli animali
          </Link>
        </div>
      </section>
    </main>
  );
}
