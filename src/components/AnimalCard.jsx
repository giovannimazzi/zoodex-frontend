import { Link } from "react-router-dom";

export default function AnimalCard({ animal, expandedCards, showRealImages }) {
  const dexNumber = String(animal.id).padStart(4, "0");

  return (
    <Link
      to={`/animals/${animal.slug}`}
      className="text-decoration-none text-dark d-block h-100"
    >
      <div
        className="card animal-card h-100 shadow-sm"
        style={{
          borderColor: animal.animal_class.color,
          borderWidth: "4px",
        }}
      >
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="text-secondary text-opacity-75">#{dexNumber}</span>

            <span
              className="badge text-light"
              style={{ backgroundColor: animal.animal_class.color }}
            >
              {animal.animal_class.name}
            </span>
          </div>

          <div className="animal-card-image bg-light mb-3 flex-shrink-0">
            <img
              src={animal.card_image}
              alt={`${animal.name} in versione fantasy`}
              className={`animal-card-image-content ${
                showRealImages ? "" : "active"
              }`}
            />

            <img
              src={animal.real_image}
              alt={`${animal.name} nella realtà`}
              className={`animal-card-image-content ${
                showRealImages ? "active" : ""
              }`}
            />
          </div>

          <div className="animal-card-heading d-flex align-items-center gap-3 mb-3">
            <img
              src={animal.animal_class.image}
              alt={animal.animal_class.name}
              title={`Classe: ${animal.animal_class.name}`}
              width="52"
              height="52"
              style={{ backgroundColor: animal.animal_class.color }}
              className="rounded-circle flex-shrink-0"
            />

            <div>
              <h2 className="h4 mb-0">{animal.name}</h2>

              <p className="fst-italic text-muted mb-0">
                {animal.scientific_name}
              </p>
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
                        {animal.weight_kg !== null
                          ? `${Number(animal.weight_kg)} kg`
                          : "-"}
                      </strong>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="border rounded p-1 h-100">
                      <small className="text-muted d-block">Lunghezza</small>

                      <strong>
                        {animal.length_cm !== null
                          ? `${Number(animal.length_cm)} cm`
                          : "-"}
                      </strong>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="border rounded p-1 h-100">
                      <small className="text-muted d-block">Altezza</small>

                      <strong>
                        {animal.height_cm !== null
                          ? `${Number(animal.height_cm)} cm`
                          : "-"}
                      </strong>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="border rounded p-1 h-100">
                      <small className="text-muted d-block">Longevità</small>

                      <strong>
                        {animal.lifespan_years !== null
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
                  <img
                    src={animal.diet.image}
                    alt={animal.diet.name}
                    title={`Dieta: ${animal.diet.name}`}
                    width="40"
                    height="40"
                    style={{ backgroundColor: animal.diet.color }}
                    className="img-fluid flex-shrink-0"
                  />

                  <img
                    src={animal.conservation_status.image}
                    alt={animal.conservation_status.name}
                    title={`Stato di conservazione: ${animal.conservation_status.name}`}
                    width="40"
                    height="40"
                    className="img-fluid"
                  />
                </div>
              </div>

              <div className="border border-2 rounded border-success-subtle bg-light p-2 mb-2">
                <p className="small fw-bold text-uppercase text-secondary mb-2">
                  Ambienti
                </p>

                <div className="d-flex flex-column align-items-center gap-2">
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    {animal.habitats.map((habitat) => (
                      <img
                        key={habitat.id}
                        src={habitat.image}
                        alt={habitat.name}
                        title={`Habitat: ${habitat.name}`}
                        width="64"
                        height="64"
                        className="img-fluid"
                      />
                    ))}
                  </div>

                  <div className="d-flex flex-wrap justify-content-center gap-1">
                    {animal.continents.map((continent) => (
                      <span
                        key={continent.id}
                        className="continent-dot"
                        style={{ backgroundColor: continent.color }}
                        title={`Continente: ${continent.name}`}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border border-2 rounded border-info-subtle bg-light p-2">
                <p className="small fw-bold text-uppercase text-secondary mb-2">
                  Abilità
                </p>

                <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
                  {animal.abilities.map((ability) => (
                    <img
                      key={ability.id}
                      src={ability.image}
                      alt={ability.name}
                      title={`Abilità: ${ability.name}`}
                      width="64"
                      height="64"
                      className="img-fluid"
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
