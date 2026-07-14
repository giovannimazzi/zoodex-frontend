import { Link } from "react-router-dom";

import { useSettings } from "../contexts/SettingsContext";
import ImageWithFallback from "./ImageWithFallback";

export default function AnimalCard({ animal, expandedCards, showRealImages }) {
  const { fallbackColor } = useSettings();

  const dexNumber = String(animal.id).padStart(4, "0");

  const animalClass = animal.animal_class;
  const diet = animal.diet;
  const conservationStatus = animal.conservation_status;

  const habitats = animal.habitats ?? [];
  const continents = animal.continents ?? [];
  const abilities = animal.abilities ?? [];

  const classColor = animalClass?.color ?? fallbackColor;

  return (
    <Link
      to={`/animals/${animal.slug}`}
      className="text-decoration-none text-dark d-block h-100"
    >
      <div
        className="card animal-card h-100 shadow-sm"
        style={{
          borderColor: classColor,
          borderWidth: "4px",
        }}
      >
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="text-secondary text-opacity-75">#{dexNumber}</span>

            {animalClass && (
              <span
                className="badge text-light"
                style={{ backgroundColor: classColor }}
              >
                {animalClass.name}
              </span>
            )}
          </div>

          <div className="animal-card-image bg-light mb-3 flex-shrink-0">
            <ImageWithFallback
              src={animal.card_image}
              alt={`${animal.name} in versione fantasy`}
              title={`Immagine: ${animal.name}`}
              className={`animal-card-image-content ${
                showRealImages ? "" : "active"
              }`}
              iconClassName="fs-1 opacity-50"
            />

            <ImageWithFallback
              src={animal.real_image}
              alt={`${animal.name} nella realtà`}
              title={`Immagine: ${animal.name}`}
              className={`animal-card-image-content ${
                showRealImages ? "active" : ""
              }`}
              iconClassName="fs-1 opacity-50"
            />
          </div>

          <div className="animal-card-heading d-flex align-items-center gap-3 mb-3">
            {animalClass && (
              <ImageWithFallback
                src={animalClass.image}
                alt={animalClass.name}
                title={`Classe: ${animalClass.name}`}
                width={52}
                height={52}
                className="rounded-circle flex-shrink-0"
                style={{
                  backgroundColor: classColor,
                }}
              />
            )}

            <div>
              <h2 className="h4 mb-0">{animal.name}</h2>

              {animal.scientific_name && (
                <p className="fst-italic text-muted mb-0">
                  {animal.scientific_name}
                </p>
              )}
            </div>
          </div>

          <div
            className={`animal-card-details ${
              expandedCards ? "animal-card-details-open" : ""
            }`}
          >
            <div className="animal-card-details-content">
              <div className="border border-2 rounded bg-light p-2 mb-2">
                <p className="small fw-bold text-uppercase text-secondary mb-2">
                  Dati fisici
                </p>

                <div className="row g-1 text-center">
                  <div className="col-6">
                    <div className="border rounded p-1 h-100">
                      <small className="text-muted d-block">Peso</small>

                      <strong>
                        {animal.weight_kg !== null &&
                        animal.weight_kg !== undefined
                          ? `${Number(animal.weight_kg)} kg`
                          : "-"}
                      </strong>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="border rounded p-1 h-100">
                      <small className="text-muted d-block">Lunghezza</small>

                      <strong>
                        {animal.length_cm !== null &&
                        animal.length_cm !== undefined
                          ? `${Number(animal.length_cm)} cm`
                          : "-"}
                      </strong>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="border rounded p-1 h-100">
                      <small className="text-muted d-block">Altezza</small>

                      <strong>
                        {animal.height_cm !== null &&
                        animal.height_cm !== undefined
                          ? `${Number(animal.height_cm)} cm`
                          : "-"}
                      </strong>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="border rounded p-1 h-100">
                      <small className="text-muted d-block">Longevità</small>

                      <strong>
                        {animal.lifespan_years !== null &&
                        animal.lifespan_years !== undefined
                          ? `${animal.lifespan_years} anni`
                          : "-"}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-2 rounded border-warning-subtle bg-light p-2 mb-2">
                <p className="small fw-bold text-uppercase text-secondary mb-2">
                  Caratteristiche
                </p>

                <div className="d-flex justify-content-center align-items-center gap-3">
                  {diet && (
                    <ImageWithFallback
                      src={diet.image}
                      alt={diet.name}
                      title={`Dieta: ${diet.name}`}
                      width={40}
                      height={40}
                      className="img-fluid flex-shrink-0"
                      style={{
                        backgroundColor: diet.color || fallbackColor,
                      }}
                    />
                  )}

                  {conservationStatus && (
                    <ImageWithFallback
                      src={conservationStatus.image}
                      alt={conservationStatus.name}
                      title={`Stato di conservazione: ${conservationStatus.name}`}
                      width={40}
                      height={40}
                      className="img-fluid flex-shrink-0"
                    />
                  )}
                </div>
              </div>

              <div className="border border-2 rounded border-success-subtle bg-light p-2 mb-2">
                <p className="small fw-bold text-uppercase text-secondary mb-2">
                  Ambienti
                </p>

                <div className="d-flex flex-column align-items-center gap-2">
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    {habitats.map((habitat) => (
                      <ImageWithFallback
                        key={habitat.id}
                        src={habitat.image}
                        alt={habitat.name}
                        title={`Habitat: ${habitat.name}`}
                        width={64}
                        height={64}
                        className="img-fluid flex-shrink-0"
                      />
                    ))}
                  </div>

                  <div className="d-flex flex-wrap justify-content-center gap-1">
                    {continents.map((continent) => (
                      <span
                        key={continent.id}
                        className="continent-dot"
                        style={{
                          backgroundColor: continent.color ?? fallbackColor,
                        }}
                        title={`Continente: ${continent.name}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="border border-2 rounded border-info-subtle bg-light p-2">
                <p className="small fw-bold text-uppercase text-secondary mb-2">
                  Abilità
                </p>

                <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
                  {abilities.map((ability) => (
                    <ImageWithFallback
                      key={ability.id}
                      src={ability.image}
                      alt={ability.name}
                      title={`Abilità: ${ability.name}`}
                      width={64}
                      height={64}
                      className="img-fluid flex-shrink-0"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
