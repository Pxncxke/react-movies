import { Link } from "react-router-dom";

export default function FilterMovies(){
    return(
        <>
        <h3>Filter Movies</h3>
        <Link className="btn btn-primary" to="/movies/create">Create Movies</Link>
        <Link className="btn btn-primary" to="/movies/edit">Edit Movies</Link>
        </>
    )
}