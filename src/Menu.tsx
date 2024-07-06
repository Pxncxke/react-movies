import { NavLink } from "react-router-dom";

export default function Menu(){
    return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">React Movies</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/genres">Genres</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/movies/filter">Filter Movies</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/actors">Actors</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/movietheaters">Movie Theaters</NavLink>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    </>
  );
}