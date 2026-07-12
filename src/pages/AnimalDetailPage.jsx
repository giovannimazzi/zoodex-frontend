import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaArrowUp,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { useSettings } from "../contexts/SettingsContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function AnimalDetailPage() {
  const { slug } = useParams();
  const { settings } = useSettings();

  const [animal, setAnimal] = useState(null);

  const [navigation, setNavigation] = useState({
    previous: null,
    next: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    setAnimal(null);

    axios
      .get(`${apiUrl}/animals/${slug}`)
      .then((res) => {
        setAnimal(res.data.results);

        setNavigation(
          res.data.navigation ?? {
            previous: null,
            next: null,
          },
        );
      })
      .catch((error) => {
        console.error(error);

        if (error.response?.status === 404) {
          setError("L'animale richiesto non è stato trovato.");
        } else {
          setError(
            "Si è verificato un errore durante il caricamento dell'animale.",
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [slug]);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Caricamento animale...</span>
        </div>

        <p className="text-muted mt-3 mb-0">Caricamento animale...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>

        <div className="text-center">
          <Link to="/animals" className="btn btn-outline-secondary">
            <FaArrowLeft className="me-2" />
            Torna agli animali
          </Link>
        </div>
      </div>
    );
  }

  if (!animal) {
    return null;
  }

  const dexNumber = String(animal.id).padStart(4, "0");

  return (
    <div className="container py-4">
      {/* Navigazione superiore */}

      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <Link to="/animals" className="btn btn-outline-secondary">
          <FaArrowLeft className="me-2" />
          Torna agli animali
        </Link>

        <div className="d-flex flex-wrap gap-2">
          {navigation.previous ? (
            <Link
              to={`/animals/${navigation.previous.slug}`}
              className="btn btn-outline-warning"
              title={`Animale precedente: ${navigation.previous.name}`}
            >
              <FaChevronLeft className="me-2" />
              Precedente: {navigation.previous.name}
            </Link>
          ) : (
            <button
              type="button"
              className="btn btn-outline-secondary"
              disabled
            >
              <FaChevronLeft className="me-2" />
              Nessun precedente
            </button>
          )}

          {navigation.next ? (
            <Link
              to={`/animals/${navigation.next.slug}`}
              className="btn btn-outline-warning"
              title={`Animale successivo: ${navigation.next.name}`}
            >
              Successivo: {navigation.next.name}
              <FaChevronRight className="ms-2" />
            </Link>
          ) : (
            <button
              type="button"
              className="btn btn-outline-secondary"
              disabled
            >
              Nessun successivo
              <FaChevronRight className="ms-2" />
            </button>
          )}
        </div>
      </div>

      {/* Titolo */}

      <div className="text-center border-bottom border-2 pb-3 mb-3">
        <span className="d-block text-secondary fs-4 fw-normal lh-1 mb-2">
          #{dexNumber}
        </span>

        <h1 className="mb-1">{animal.name}</h1>

        {animal.scientific_name && (
          <p className="fst-italic text-muted fs-5 mb-0">
            {animal.scientific_name}
          </p>
        )}
      </div>

      {/* Immagini fantasy e reale */}

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <div className="card h-100 shadow-sm animal-detail-info-card">
            <div className="card-header fw-bold text-center">
              Versione Fantasy
            </div>

            <div className="card-body p-2">
              <div className="animal-detail-main-image bg-light d-flex align-items-center justify-content-center">
                <img
                  src={animal.card_image}
                  alt={`${animal.name} in versione fantasy`}
                  className="animal-detail-fantasy-image"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card h-100 shadow-sm animal-detail-info-card">
            <div className="card-header fw-bold text-center">Animale Reale</div>

            <div className="card-body p-2">
              <div className="animal-detail-main-image bg-light d-flex align-items-center justify-content-center">
                <img
                  src={animal.real_image}
                  alt={`${animal.name} nella realtà`}
                  className="animal-detail-real-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Descrizione */}

      <div className="card shadow-sm mb-3 animal-detail-info-card">
        <div className="card-header fw-bold">Descrizione</div>

        <div className="card-body">
          <p className="lead mb-0">
            {animal.description || "Descrizione non disponibile."}
          </p>
        </div>
      </div>

      {/* Dati fisici */}

      <div className="card shadow-sm mb-3 animal-detail-info-card">
        <div className="card-header fw-bold">Dati fisici</div>

        <div className="card-body">
          <div className="row g-2 text-center justify-content-center">
            <div className="col-6 col-lg-3">
              <div className="border rounded bg-light p-3 h-100">
                <small className="text-muted d-block">Peso</small>

                <strong className="fs-5">
                  {animal.weight_kg !== null
                    ? `${Number(animal.weight_kg)} kg`
                    : "-"}
                </strong>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div className="border rounded bg-light p-3 h-100">
                <small className="text-muted d-block">Lunghezza</small>

                <strong className="fs-5">
                  {animal.length_cm !== null
                    ? `${Number(animal.length_cm)} cm`
                    : "-"}
                </strong>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div className="border rounded bg-light p-3 h-100">
                <small className="text-muted d-block">Altezza</small>

                <strong className="fs-5">
                  {animal.height_cm !== null
                    ? `${Number(animal.height_cm)} cm`
                    : "-"}
                </strong>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div className="border rounded bg-light p-3 h-100">
                <small className="text-muted d-block">Longevità</small>

                <strong className="fs-5">
                  {animal.lifespan_years !== null
                    ? `${animal.lifespan_years} anni`
                    : "-"}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Classe, dieta e stato di conservazione */}

      <div className="row g-3 mb-3 justify-content-center">
        <div className="col-12 col-md-4">
          <div
            className="card h-100 shadow-sm animal-detail-info-card"
            style={{
              borderColor: animal.animal_class.color,
              borderWidth: "3px",
            }}
          >
            <div className="card-header fw-bold">Classe</div>

            <div className="card-body text-center p-3">
              <img
                src={animal.animal_class.image}
                alt={animal.animal_class.name}
                className="animal-detail-taxonomy-image rounded-circle mb-2"
                style={{
                  backgroundColor: animal.animal_class.color,
                }}
              />

              <h2 className="h5">{animal.animal_class.name}</h2>

              <p className="text-muted mb-0">
                {animal.animal_class.description ||
                  "Descrizione non disponibile."}
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div
            className="card h-100 shadow-sm animal-detail-info-card"
            style={{
              borderColor: animal.diet.color,
              borderWidth: "3px",
            }}
          >
            <div className="card-header fw-bold">Dieta</div>

            <div className="card-body text-center p-3">
              <img
                src={animal.diet.image}
                alt={animal.diet.name}
                className="animal-detail-taxonomy-image mb-2"
                style={{
                  backgroundColor: animal.diet.color,
                }}
              />

              <h2 className="h5">{animal.diet.name}</h2>

              <p className="text-muted mb-0">
                {animal.diet.description || "Descrizione non disponibile."}
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div
            className="card h-100 shadow-sm animal-detail-info-card"
            style={{
              borderColor: animal.conservation_status.color,
              borderWidth: "3px",
            }}
          >
            <div className="card-header fw-bold">Stato di conservazione</div>

            <div className="card-body text-center p-3">
              <img
                src={animal.conservation_status.image}
                alt={animal.conservation_status.name}
                className="animal-detail-taxonomy-image mb-2"
              />

              <h2 className="h5">{animal.conservation_status.name}</h2>

              <p className="text-muted mb-0">
                {animal.conservation_status.description ||
                  "Descrizione non disponibile."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Continenti */}

      <div className="card shadow-sm mb-3">
        <div className="card-header fw-bold">Continenti</div>

        <div className="card-body">
          {animal.continents.length > 0 ? (
            <div className="row align-items-center g-3">
              <div className="col-12 col-lg-3 text-center">
                {settings?.globe_image ? (
                  <img
                    src={settings.globe_image}
                    alt="Globo terrestre"
                    className="animal-detail-globe-icon img-fluid d-block mx-auto"
                  />
                ) : (
                  <p className="text-muted mb-0">Globo non disponibile.</p>
                )}
              </div>

              <div className="col-12 col-lg-9">
                <div className="row g-3 justify-content-center">
                  {animal.continents.map((continent) => (
                    <div key={continent.id} className="col-12 col-md-6">
                      <div
                        className="card h-100 animal-detail-info-card"
                        style={{
                          borderColor: continent.color,
                          borderWidth: "2px",
                        }}
                      >
                        <div className="card-body p-3 text-center">
                          <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                            <span
                              className="continent-dot"
                              style={{
                                backgroundColor: continent.color,
                              }}
                            ></span>

                            <h3 className="h6 fw-bold mb-0">
                              {continent.name}
                            </h3>
                          </div>

                          <p className="text-muted mb-0">
                            {continent.description ||
                              "Descrizione non disponibile."}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted text-center mb-0">
              Nessun continente associato.
            </p>
          )}
        </div>
      </div>

      {/* Habitat */}

      <div className="card shadow-sm mb-3">
        <div className="card-header fw-bold">Habitat</div>

        <div className="card-body">
          {animal.habitats.length > 0 ? (
            <div className="row g-3 justify-content-center">
              {animal.habitats.map((habitat) => (
                <div key={habitat.id} className="col-12 col-lg-6">
                  <div
                    className="card h-100 animal-detail-info-card"
                    style={{
                      borderColor: habitat.color,
                      borderWidth: "2px",
                    }}
                  >
                    <div className="card-body p-2 text-center">
                      <img
                        src={habitat.image}
                        alt={habitat.name}
                        className="animal-detail-habitat-image img-fluid d-block mx-auto"
                      />

                      <h3 className="h5">
                        <span
                          className="badge"
                          style={{
                            backgroundColor: habitat.color,
                          }}
                        >
                          {habitat.name}
                        </span>
                      </h3>

                      <p className="text-muted mb-0">
                        {habitat.description || "Descrizione non disponibile."}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted text-center mb-0">
              Nessun habitat associato.
            </p>
          )}
        </div>
      </div>

      {/* Abilità */}

      <div className="card shadow-sm mb-3">
        <div className="card-header fw-bold">Abilità</div>

        <div className="card-body">
          {animal.abilities.length > 0 ? (
            <div className="row g-3 justify-content-center">
              {animal.abilities.map((ability) => (
                <div key={ability.id} className="col-12 col-md-6 col-xl-4">
                  <div
                    className="card h-100 animal-detail-info-card"
                    style={{
                      borderColor: ability.color,
                      borderWidth: "2px",
                    }}
                  >
                    <div className="card-body p-2 text-center">
                      <img
                        src={ability.image}
                        alt={ability.name}
                        className="animal-detail-ability-image img-fluid d-block mx-auto mb-2"
                      />

                      <h3 className="h5">
                        <span
                          className="badge"
                          style={{
                            backgroundColor: ability.color,
                          }}
                        >
                          {ability.name}
                        </span>
                      </h3>

                      <p className="text-muted mb-0">
                        {ability.description || "Descrizione non disponibile."}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted text-center mb-0">
              Nessuna abilità associata.
            </p>
          )}
        </div>
      </div>

      {/* Torna su */}

      <div className="text-center">
        <button type="button" className="btn btn-warning" onClick={scrollToTop}>
          <FaArrowUp className="me-2" />
          Torna su
        </button>
      </div>
    </div>
  );
}
