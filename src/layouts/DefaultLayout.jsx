import { NavLink, Link, Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <div className="vh-100 p-3">
      <Link to="/" className="text-decoration-none me-2 d-inline-block">
        <h1 className="text-danger">🦜ZooDex</h1>
      </Link>
      <Link to="/animals" className="text-decoration-none me-2">
        <span>animals</span>
      </Link>
      <Link to="/animals/leone" className="text-decoration-none me-2">
        <span>Leone</span>
      </Link>
      <hr />
      <div className="container-fluid">
        <Outlet />
        {/* qui è dove andranno a finire le pagine/componenti wrappate da questo layout */}
      </div>
    </div>
  );
}
