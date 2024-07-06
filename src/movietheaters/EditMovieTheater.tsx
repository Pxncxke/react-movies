import { Link } from "react-router-dom";

export default function EditMovieTheater(){
    return(
        <>
        <h3>Edit Movie Theater</h3>
        <Link className="btn btn-primary" to="/movietheaters">Back to Movie Theaters</Link>
        </>
    )
}