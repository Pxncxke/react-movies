import { Link } from "react-router-dom";

export default function EditMovie(){
    return(
        <>
        <h3>Edit Movie</h3>
        <Link className="btn btn-primary" to="/movies">Back to Movies</Link>
        </>
    )
}