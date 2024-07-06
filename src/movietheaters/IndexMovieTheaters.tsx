import { Link } from "react-router-dom";

export default function IndexMovieTheaters() {
    return (
        <>
            <h3>Index Movie Theater</h3>
            <Link className="btn btn-primary" to="/movietheaters/create">Create Movie Theater</Link>
            <Link className="btn btn-primary" to="/movietheaters/edit">Edit Movie Theater</Link>
        </>
    )
}