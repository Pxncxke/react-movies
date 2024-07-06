import { Link, useParams } from "react-router-dom";

export default function EditGenre(){
    const {id}: any = useParams();
    return(
        <>
        <h3>Edit Genre</h3>
        <Link className="btn btn-primary" to="/genres">Back to Genres</Link>
        the id is {id}
        </>
    )
}