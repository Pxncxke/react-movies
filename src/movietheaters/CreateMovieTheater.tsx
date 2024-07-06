import { Link } from "react-router-dom";

export default function CreateMovieTheater(){
    return(
        <>
        <h3>Create Movie Theater</h3>
        <Link className="btn btn-primary" to="/movietheaters">Back to Movie Theaters</Link>
        </>
    )
}