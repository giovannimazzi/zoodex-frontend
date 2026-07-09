import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL; //creazione oggetto URL

const indexApiUrl = apiUrl + "/animals";

export default function AnimalsPage() {
  return <h1>AnimalsPage</h1>;
  /* const [animals, setAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //chiamata api all'apertura della pagina
    setIsLoading(true);
    axios
      .get(indexApiUrl)
      .then((res) => setAnimals(res.data.data))
      .catch((e) => alert("ERRORE: " + e.message))
      .finally(() => {
        console.log(`Chiamata finita`);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="px-3">
      <h1>Animals List</h1>

      {isLoading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        {animals.map((animal) => (
          <div className="col mb-4" key={animal.id}>
            <div
              className="card h-100 text-center"
              style={{ maxWidth: "25rem" }}
            >
              <h5 className="card-header bg-primary">{animal.name}</h5>

              <div className="card-body">
                <Link
                  to={`/animals/${animal.slug}`}
                  className="btn btn-warning"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ); */
}
