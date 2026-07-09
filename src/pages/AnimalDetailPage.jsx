import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiChevronsLeft } from "react-icons/fi";

const apiUrl = import.meta.env.VITE_API_URL;

export default function AnimalDetailPage() {
  const { slug } = useParams();

  const [animal, setAnimal] = useState(null);

  useEffect(() => {
    axios
      .get(`${apiUrl}/animals/${slug}`)
      .then((res) => setAnimal(res.data.results))
      .catch((e) => alert("ERRORE: " + e.message))
      .finally(() => console.log("Chiamata finita"));
  }, [slug]);

  if (!animal) return <h2>Loading...</h2>;

  return (
    <div className="p-3">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-0">Animal Details</h1>

          <Link to="/" className="btn btn-outline-dark">
            <FiChevronsLeft className="fs-3" />
            Back to List
          </Link>
        </div>

        <div className="card-body">
          <h3>{animal.name}</h3>

          {/* <div className="mt-2">
            {animal.abilities.length > 0 ? (
              <>
                <strong className="me-2">Abilities:</strong>
                {animal.abilities.map((ability) => (
                  <span
                    key={ability.id}
                    className="badge me-2"
                    style={{ backgroundColor: ability.color }}
                  >
                    {ability.name}
                  </span>
                ))}
              </>
            ) : (
              <span></span>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}
