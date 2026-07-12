import { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown } from "bootstrap";

import {
  FaArrowUp,
  FaCompressAlt,
  FaExpandAlt,
  FaFilter,
  FaUndoAlt,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";

import { GiFairyWand } from "react-icons/gi";
import { MdOutlinePhotoCamera } from "react-icons/md";

import AnimalCard from "../components/AnimalCard";

const apiUrl = import.meta.env.VITE_API_URL;

const initialFilters = {
  search: "",

  animal_class: "",
  diet: "",
  conservation_status: "",

  habitats: [],
  habitats_mode: "or",

  continents: [],
  continents_mode: "or",

  abilities: [],
  abilities_mode: "or",

  weight_min: "",
  weight_max: "",

  height_min: "",
  height_max: "",

  length_min: "",
  length_max: "",

  lifespan_min: "",
  lifespan_max: "",

  sort: "",
  direction: "asc",
};

export default function AnimalsPage() {
  const [animals, setAnimals] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [taxonomies, setTaxonomies] = useState(null);

  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [taxonomiesLoading, setTaxonomiesLoading] = useState(true);

  const [animalsError, setAnimalsError] = useState("");
  const [taxonomiesError, setTaxonomiesError] = useState("");

  const [expandedCards, setExpandedCards] = useState(false);
  const [showRealImages, setShowRealImages] = useState(false);
  const [toolbarOpen, setToolbarOpen] = useState(true);

  useEffect(() => {
    setTaxonomiesLoading(true);
    setTaxonomiesError("");

    axios
      .get(`${apiUrl}/taxonomies`)
      .then((res) => {
        setTaxonomies(res.data.results);
      })
      .catch((error) => {
        console.error(error);

        setTaxonomiesError(
          "Si è verificato un errore durante il caricamento dei filtri.",
        );
      })
      .finally(() => {
        setTaxonomiesLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    setAnimalsError("");

    const params = {
      page: page,
    };

    if (filters.search.trim()) {
      params.search = filters.search.trim();
    }

    if (filters.animal_class) {
      params.animal_class = filters.animal_class;
    }

    if (filters.diet) {
      params.diet = filters.diet;
    }

    if (filters.conservation_status) {
      params.conservation_status = filters.conservation_status;
    }

    if (filters.habitats.length > 0) {
      params.habitats = filters.habitats.join(",");
      params.habitats_mode = filters.habitats_mode;
    }

    if (filters.continents.length > 0) {
      params.continents = filters.continents.join(",");
      params.continents_mode = filters.continents_mode;
    }

    if (filters.abilities.length > 0) {
      params.abilities = filters.abilities.join(",");
      params.abilities_mode = filters.abilities_mode;
    }

    if (filters.weight_min !== "") {
      params.weight_min = filters.weight_min;
    }

    if (filters.weight_max !== "") {
      params.weight_max = filters.weight_max;
    }

    if (filters.height_min !== "") {
      params.height_min = filters.height_min;
    }

    if (filters.height_max !== "") {
      params.height_max = filters.height_max;
    }

    if (filters.length_min !== "") {
      params.length_min = filters.length_min;
    }

    if (filters.length_max !== "") {
      params.length_max = filters.length_max;
    }

    if (filters.lifespan_min !== "") {
      params.lifespan_min = filters.lifespan_min;
    }

    if (filters.lifespan_max !== "") {
      params.lifespan_max = filters.lifespan_max;
    }

    if (filters.sort) {
      params.sort = filters.sort;
      params.direction = filters.direction;
    }

    axios
      .get(`${apiUrl}/animals`, {
        params: params,
      })
      .then((res) => {
        if (page === 1) {
          setAnimals(res.data.results);
        } else {
          setAnimals((prev) => [...prev, ...res.data.results]);
        }

        setPagination(res.data.pagination);
      })
      .catch((error) => {
        console.error(error);

        setAnimalsError(
          "Si è verificato un errore durante il caricamento degli animali.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filters, page]);

  function handleFilterChange(event) {
    const { name, value } = event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    setPage(1);
  }

  function closeDropdown(event) {
    const dropdown = event.currentTarget.closest(".dropdown");

    if (!dropdown) {
      return;
    }

    const dropdownToggle = dropdown.querySelector(
      '[data-bs-toggle="dropdown"]',
    );

    if (!dropdownToggle) {
      return;
    }

    const dropdownInstance = Dropdown.getOrCreateInstance(dropdownToggle);

    dropdownInstance.hide();
  }

  function setSingleFilter(event, filterName, value) {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));

    setPage(1);
    closeDropdown(event);
  }

  function toggleArrayFilter(filterName, slug) {
    setFilters((prev) => {
      const selectedValues = prev[filterName];

      const updatedValues = selectedValues.includes(slug)
        ? selectedValues.filter((value) => value !== slug)
        : [...selectedValues, slug];

      return {
        ...prev,
        [filterName]: updatedValues,
      };
    });

    setPage(1);
  }

  function resetFilters() {
    setFilters({
      ...initialFilters,
      habitats: [],
      continents: [],
      abilities: [],
    });

    setPage(1);
  }

  function resetAdvancedFilters() {
    setFilters((prev) => ({
      ...prev,

      habitats: [],
      habitats_mode: "or",

      continents: [],
      continents_mode: "or",

      abilities: [],
      abilities_mode: "or",

      weight_min: "",
      weight_max: "",

      height_min: "",
      height_max: "",

      length_min: "",
      length_max: "",

      lifespan_min: "",
      lifespan_max: "",
    }));

    setPage(1);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const selectedAnimalClass = taxonomies?.animal_classes.find(
    (animalClass) => animalClass.slug === filters.animal_class,
  );

  const selectedDiet = taxonomies?.diets.find(
    (diet) => diet.slug === filters.diet,
  );

  const selectedConservationStatus = taxonomies?.conservation_statuses.find(
    (status) => status.slug === filters.conservation_status,
  );

  const advancedFiltersCount =
    filters.habitats.length +
    filters.continents.length +
    filters.abilities.length +
    (filters.weight_min !== "" ? 1 : 0) +
    (filters.weight_max !== "" ? 1 : 0) +
    (filters.height_min !== "" ? 1 : 0) +
    (filters.height_max !== "" ? 1 : 0) +
    (filters.length_min !== "" ? 1 : 0) +
    (filters.length_max !== "" ? 1 : 0) +
    (filters.lifespan_min !== "" ? 1 : 0) +
    (filters.lifespan_max !== "" ? 1 : 0);

  const activeFiltersCount =
    advancedFiltersCount +
    (filters.search.trim() ? 1 : 0) +
    (filters.animal_class ? 1 : 0) +
    (filters.diet ? 1 : 0) +
    (filters.conservation_status ? 1 : 0) +
    (filters.sort ? 1 : 0);

  return (
    <>
      <div className="container py-4">
        <div className="text-center mb-1">
          <h1>Animali</h1>

          <p className="text-muted mb-0">
            {pagination?.total ?? 0} animali trovati
          </p>

          {activeFiltersCount > 0 && (
            <small className="text-warning-emphasis">
              {activeFiltersCount} criteri attivi
            </small>
          )}
        </div>

        <div
          className={`bg-light mb-2 border border-2 rounded-2 animals-toolbar ${
            toolbarOpen ? "p-1" : "animals-toolbar-collapsed"
          }`}
        >
          <div className={`d-flex justify-content-end mb-1`}>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary animals-toolbar-toggle"
              onClick={() => setToolbarOpen(!toolbarOpen)}
              title={
                toolbarOpen
                  ? "Comprimi ricerca e filtri"
                  : "Espandi ricerca e filtri"
              }
              aria-label={
                toolbarOpen
                  ? "Comprimi ricerca e filtri"
                  : "Espandi ricerca e filtri"
              }
              aria-expanded={toolbarOpen}
            >
              {toolbarOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>

          <div
            className={`animals-toolbar-content ${
              toolbarOpen ? "animals-toolbar-content-open" : ""
            }`}
          >
            <div className="animals-toolbar-content-inner">
              <div className="row g-2 align-items-end mb-2">
                <div className="col-12 col-lg-6">
                  <label
                    htmlFor="animals-search"
                    className="form-label fw-bold"
                  >
                    Cerca animali
                  </label>

                  <input
                    id="animals-search"
                    type="search"
                    name="search"
                    className="form-control"
                    placeholder="N. Dex, nome o nome scientifico"
                    value={filters.search}
                    onChange={handleFilterChange}
                  />
                </div>

                <div className="col-12 col-sm-4 col-lg-2">
                  <label className="form-label fw-bold">Classe</label>

                  <div className="dropdown">
                    <button
                      type="button"
                      className={`btn dropdown-toggle w-100 ${
                        filters.animal_class
                          ? "btn-warning"
                          : "btn-outline-secondary"
                      }`}
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="true"
                      aria-expanded="false"
                    >
                      {selectedAnimalClass ? (
                        <span className="d-flex align-items-center gap-2">
                          <img
                            src={selectedAnimalClass.image}
                            alt=""
                            className="basic-filter-icon rounded-circle"
                            style={{
                              backgroundColor: selectedAnimalClass.color,
                            }}
                          />

                          <span className="text-truncate">
                            {selectedAnimalClass.name}
                          </span>
                        </span>
                      ) : (
                        "Tutte"
                      )}
                    </button>

                    <ul className="dropdown-menu basic-filter-menu">
                      <li>
                        <button
                          type="button"
                          className={`dropdown-item ${
                            filters.animal_class === "" ? "active" : ""
                          }`}
                          onClick={(event) =>
                            setSingleFilter(event, "animal_class", "")
                          }
                        >
                          Tutte le classi
                        </button>
                      </li>

                      {taxonomies?.animal_classes.map((animalClass) => (
                        <li key={animalClass.id}>
                          <button
                            type="button"
                            className={`dropdown-item d-flex align-items-center gap-2 ${
                              filters.animal_class === animalClass.slug
                                ? "active"
                                : ""
                            }`}
                            onClick={(event) =>
                              setSingleFilter(
                                event,
                                "animal_class",
                                animalClass.slug,
                              )
                            }
                          >
                            <img
                              src={animalClass.image}
                              alt=""
                              className="basic-filter-icon rounded-circle"
                              style={{
                                backgroundColor: animalClass.color,
                              }}
                            />

                            {animalClass.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="col-12 col-sm-4 col-lg-2">
                  <label className="form-label fw-bold">Dieta</label>

                  <div className="dropdown">
                    <button
                      type="button"
                      className={`btn dropdown-toggle w-100 ${
                        filters.diet ? "btn-warning" : "btn-outline-secondary"
                      }`}
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="true"
                      aria-expanded="false"
                    >
                      {selectedDiet ? (
                        <span className="d-flex align-items-center gap-2">
                          <img
                            src={selectedDiet.image}
                            alt=""
                            className="basic-filter-icon"
                            style={{
                              backgroundColor: selectedDiet.color,
                            }}
                          />

                          <span className="text-truncate">
                            {selectedDiet.name}
                          </span>
                        </span>
                      ) : (
                        "Tutte"
                      )}
                    </button>

                    <ul className="dropdown-menu basic-filter-menu">
                      <li>
                        <button
                          type="button"
                          className={`dropdown-item ${
                            filters.diet === "" ? "active" : ""
                          }`}
                          onClick={(event) =>
                            setSingleFilter(event, "diet", "")
                          }
                        >
                          Tutte le diete
                        </button>
                      </li>

                      {taxonomies?.diets.map((diet) => (
                        <li key={diet.id}>
                          <button
                            type="button"
                            className={`dropdown-item d-flex align-items-center gap-2 ${
                              filters.diet === diet.slug ? "active" : ""
                            }`}
                            onClick={(event) =>
                              setSingleFilter(event, "diet", diet.slug)
                            }
                          >
                            <img
                              src={diet.image}
                              alt=""
                              className="basic-filter-icon"
                              style={{
                                backgroundColor: diet.color,
                              }}
                            />

                            {diet.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="col-12 col-sm-4 col-lg-2">
                  <label className="form-label fw-bold">Conservazione</label>

                  <div className="dropdown">
                    <button
                      type="button"
                      className={`btn dropdown-toggle w-100 ${
                        filters.conservation_status
                          ? "btn-warning"
                          : "btn-outline-secondary"
                      }`}
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="true"
                      aria-expanded="false"
                    >
                      {selectedConservationStatus ? (
                        <span className="d-flex align-items-center gap-2">
                          <img
                            src={selectedConservationStatus.image}
                            alt=""
                            className="basic-filter-icon"
                          />

                          <span className="text-truncate">
                            {selectedConservationStatus.name}
                          </span>
                        </span>
                      ) : (
                        "Tutti"
                      )}
                    </button>

                    <ul className="dropdown-menu basic-filter-menu">
                      <li>
                        <button
                          type="button"
                          className={`dropdown-item ${
                            filters.conservation_status === "" ? "active" : ""
                          }`}
                          onClick={(event) =>
                            setSingleFilter(event, "conservation_status", "")
                          }
                        >
                          Tutti gli stati
                        </button>
                      </li>

                      {taxonomies?.conservation_statuses.map((status) => (
                        <li key={status.id}>
                          <button
                            type="button"
                            className={`dropdown-item d-flex align-items-center gap-2 ${
                              filters.conservation_status === status.slug
                                ? "active"
                                : ""
                            }`}
                            onClick={(event) =>
                              setSingleFilter(
                                event,
                                "conservation_status",
                                status.slug,
                              )
                            }
                          >
                            <img
                              src={status.image}
                              alt=""
                              className="basic-filter-icon"
                            />

                            {status.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="row g-2 align-items-end mb-4">
                <div className="col-12 col-sm-6 col-lg-4">
                  <label htmlFor="animals-sort" className="form-label fw-bold">
                    Ordina per
                  </label>

                  <select
                    id="animals-sort"
                    name="sort"
                    className="form-select"
                    value={filters.sort}
                    onChange={handleFilterChange}
                  >
                    <option value="">Ordinamento predefinito</option>
                    <option value="id">Numero ZooDex</option>
                    <option value="name">Nome</option>
                    <option value="scientific_name">Nome scientifico</option>
                    <option value="weight_kg">Peso</option>
                    <option value="height_cm">Altezza</option>
                    <option value="length_cm">Lunghezza</option>
                    <option value="lifespan_years">Longevità</option>
                    <option value="animal_class">Classe</option>
                    <option value="diet">Dieta</option>
                    <option value="conservation_status">
                      Stato di conservazione
                    </option>
                  </select>
                </div>

                <div className="col-12 col-sm-6 col-lg-2">
                  <label
                    htmlFor="animals-direction"
                    className="form-label fw-bold"
                  >
                    Direzione
                  </label>

                  <select
                    id="animals-direction"
                    name="direction"
                    className="form-select"
                    value={filters.direction}
                    onChange={handleFilterChange}
                    disabled={!filters.sort}
                  >
                    <option value="asc">Crescente</option>
                    <option value="desc">Decrescente</option>
                  </select>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                  <button
                    type="button"
                    className={`btn w-100 ${
                      advancedFiltersCount > 0
                        ? "btn-warning"
                        : "btn-outline-warning"
                    }`}
                    data-bs-toggle="offcanvas"
                    data-bs-target="#animalsFilters"
                    aria-controls="animalsFilters"
                  >
                    <FaFilter className="me-2" />
                    Filtri avanzati
                    {advancedFiltersCount > 0 && (
                      <span className="badge bg-dark ms-2">
                        {advancedFiltersCount}
                      </span>
                    )}
                  </button>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                  <button
                    type="button"
                    className="btn btn-outline-danger w-100"
                    onClick={resetFilters}
                    disabled={activeFiltersCount === 0}
                  >
                    <FaUndoAlt className="me-2" />
                    Ripristina tutto
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {taxonomiesError && (
          <div className="alert alert-danger text-center" role="alert">
            {taxonomiesError}
          </div>
        )}

        {animalsError && (
          <div className="alert alert-danger text-center" role="alert">
            {animalsError}
          </div>
        )}

        {loading && page === 1 ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Caricamento animali...</span>
            </div>

            <p className="text-muted mt-3 mb-0">Caricamento animali...</p>
          </div>
        ) : animalsError ? null : animals.length > 0 ? (
          <div className="row g-4">
            {animals.map((animal) => (
              <div
                key={animal.id}
                className="col-12 col-sm-6 col-md-4 col-xl-3 d-flex justify-content-center"
              >
                <AnimalCard
                  animal={animal}
                  expandedCards={expandedCards}
                  showRealImages={showRealImages}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-warning text-center" role="alert">
            Nessun animale corrisponde ai criteri selezionati.
          </div>
        )}
      </div>

      {!animalsError && pagination?.current_page < pagination?.last_page && (
        <div className="text-center my-5">
          <button
            type="button"
            className="btn btn-warning btn-lg"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Caricamento...
              </>
            ) : (
              "Carica altri animali"
            )}
          </button>
        </div>
      )}

      <div
        className="offcanvas offcanvas-start zoodex-filters"
        tabIndex="-1"
        id="animalsFilters"
        aria-labelledby="animalsFiltersLabel"
        data-bs-scroll="true"
        data-bs-backdrop="false"
      >
        <div className="offcanvas-header border-bottom">
          <div>
            <h2 className="offcanvas-title h4 mb-0" id="animalsFiltersLabel">
              Filtri avanzati
            </h2>

            <small className="text-muted">
              {advancedFiltersCount > 0
                ? `${advancedFiltersCount} criteri avanzati attivi`
                : "Nessun filtro avanzato attivo"}
            </small>
          </div>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Chiudi"
          ></button>
        </div>

        <div className="offcanvas-body">
          {taxonomiesLoading ? (
            <div className="text-center py-5">
              <div
                className="spinner-border spinner-border-sm text-warning"
                role="status"
              >
                <span className="visually-hidden">Caricamento filtri...</span>
              </div>

              <p className="small text-muted mt-2 mb-0">
                Caricamento filtri...
              </p>
            </div>
          ) : taxonomiesError ? (
            <div className="alert alert-danger text-center" role="alert">
              {taxonomiesError}
            </div>
          ) : taxonomies ? (
            <>
              <div className="mb-4">
                <button
                  type="button"
                  className="btn btn-outline-danger w-100"
                  onClick={resetAdvancedFilters}
                  disabled={advancedFiltersCount === 0}
                >
                  <FaUndoAlt className="me-2" />
                  Ripristina filtri avanzati
                </button>
              </div>

              <div className="alert alert-light border small">
                Quando selezioni più opzioni, usa <strong>Almeno uno</strong>{" "}
                per una ricerca più ampia oppure <strong>Tutti</strong> per
                mostrare solo gli animali che possiedono tutte le opzioni
                selezionate.
              </div>

              <div className="mb-4">
                <h3 className="h6 text-uppercase fw-bold">Dati fisici</h3>

                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label small">Peso minimo (kg)</label>

                    <input
                      type="number"
                      min="0"
                      step="any"
                      name="weight_min"
                      className="form-control"
                      value={filters.weight_min}
                      onChange={handleFilterChange}
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label small">
                      Peso massimo (kg)
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="any"
                      name="weight_max"
                      className="form-control"
                      value={filters.weight_max}
                      onChange={handleFilterChange}
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label small">
                      Altezza minima (cm)
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="any"
                      name="height_min"
                      className="form-control"
                      value={filters.height_min}
                      onChange={handleFilterChange}
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label small">
                      Altezza massima (cm)
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="any"
                      name="height_max"
                      className="form-control"
                      value={filters.height_max}
                      onChange={handleFilterChange}
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label small">
                      Lunghezza minima (cm)
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="any"
                      name="length_min"
                      className="form-control"
                      value={filters.length_min}
                      onChange={handleFilterChange}
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label small">
                      Lunghezza massima (cm)
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="any"
                      name="length_max"
                      className="form-control"
                      value={filters.length_max}
                      onChange={handleFilterChange}
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label small">Longevità minima</label>

                    <input
                      type="number"
                      min="0"
                      name="lifespan_min"
                      className="form-control"
                      value={filters.lifespan_min}
                      onChange={handleFilterChange}
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label small">
                      Longevità massima
                    </label>

                    <input
                      type="number"
                      min="0"
                      name="lifespan_max"
                      className="form-control"
                      value={filters.lifespan_max}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
              </div>

              <hr />

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
                  <h3 className="h6 text-uppercase fw-bold mb-0">Habitat</h3>

                  <select
                    name="habitats_mode"
                    className="form-select form-select-sm filter-mode"
                    value={filters.habitats_mode}
                    onChange={handleFilterChange}
                    disabled={filters.habitats.length < 2}
                  >
                    <option value="or">Almeno uno</option>
                    <option value="and">Tutti</option>
                  </select>
                </div>

                <div className="d-flex flex-column gap-2">
                  {taxonomies.habitats.map((habitat) => {
                    const isSelected = filters.habitats.includes(habitat.slug);

                    return (
                      <label
                        key={habitat.id}
                        className={`filter-option ${
                          isSelected ? "filter-option-active" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() =>
                            toggleArrayFilter("habitats", habitat.slug)
                          }
                        />

                        <img
                          src={habitat.image}
                          alt={habitat.name}
                          className="filter-icon filter-icon-lg"
                        />

                        <span>{habitat.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <hr />

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
                  <h3 className="h6 text-uppercase fw-bold mb-0">Continenti</h3>

                  <select
                    name="continents_mode"
                    className="form-select form-select-sm filter-mode"
                    value={filters.continents_mode}
                    onChange={handleFilterChange}
                    disabled={filters.continents.length < 2}
                  >
                    <option value="or">Almeno uno</option>
                    <option value="and">Tutti</option>
                  </select>
                </div>

                <div className="d-flex flex-column gap-2">
                  {taxonomies.continents.map((continent) => {
                    const isSelected = filters.continents.includes(
                      continent.slug,
                    );

                    return (
                      <label
                        key={continent.id}
                        className={`filter-option ${
                          isSelected ? "filter-option-active" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() =>
                            toggleArrayFilter("continents", continent.slug)
                          }
                        />

                        <span
                          className="continent-dot"
                          style={{
                            backgroundColor: continent.color,
                          }}
                        ></span>

                        <span>{continent.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <hr />

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
                  <h3 className="h6 text-uppercase fw-bold mb-0">Abilità</h3>

                  <select
                    name="abilities_mode"
                    className="form-select form-select-sm filter-mode"
                    value={filters.abilities_mode}
                    onChange={handleFilterChange}
                    disabled={filters.abilities.length < 2}
                  >
                    <option value="or">Almeno una</option>
                    <option value="and">Tutte</option>
                  </select>
                </div>

                <div className="d-flex flex-column gap-2">
                  {taxonomies.abilities.map((ability) => {
                    const isSelected = filters.abilities.includes(ability.slug);

                    return (
                      <label
                        key={ability.id}
                        className={`filter-option ${
                          isSelected ? "filter-option-active" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() =>
                            toggleArrayFilter("abilities", ability.slug)
                          }
                        />

                        <img
                          src={ability.image}
                          alt={ability.name}
                          className="filter-icon filter-icon-lg"
                        />

                        <span>{ability.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="btn btn-outline-danger w-100"
                  onClick={resetAdvancedFilters}
                  disabled={advancedFiltersCount === 0}
                >
                  <FaUndoAlt className="me-2" />
                  Ripristina filtri avanzati
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className="animals-controls position-fixed end-0 bottom-0 d-flex flex-column gap-2 m-3">
        <button
          type="button"
          className="btn btn-warning border shadow rounded-circle"
          title="Torna all'inizio"
          aria-label="Torna all'inizio"
          onClick={scrollToTop}
        >
          <FaArrowUp />
        </button>

        <button
          type="button"
          className="btn btn-warning border shadow rounded-circle"
          title={
            showRealImages ? "Mostra immagini fantasy" : "Mostra immagini reali"
          }
          aria-label={
            showRealImages ? "Mostra immagini fantasy" : "Mostra immagini reali"
          }
          onClick={() => setShowRealImages(!showRealImages)}
        >
          {showRealImages ? <GiFairyWand /> : <MdOutlinePhotoCamera />}
        </button>

        <button
          type="button"
          className="btn btn-warning border shadow rounded-circle"
          title={expandedCards ? "Comprimi le card" : "Espandi le card"}
          aria-label={expandedCards ? "Comprimi le card" : "Espandi le card"}
          onClick={() => setExpandedCards(!expandedCards)}
        >
          {expandedCards ? <FaCompressAlt /> : <FaExpandAlt />}
        </button>
      </div>
    </>
  );
}
