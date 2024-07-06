import { Link } from "react-router-dom";

export default function CreateMovie(){
    return(
        <>
        <h3>Create Movie</h3>
        <Link className="btn btn-primary" to="/movies">Back to Movies</Link>
        </>
    )
}