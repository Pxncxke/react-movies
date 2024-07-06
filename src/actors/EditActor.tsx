import { Link } from "react-router-dom";

export default function EditActor(){
    return(
        <>
        <h3>Edit Actors</h3>
        <Link className="btn btn-primary" to="/actors">Back to Actors</Link>
        </>
    )
}