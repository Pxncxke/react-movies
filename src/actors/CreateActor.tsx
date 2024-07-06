import { Link } from "react-router-dom";

export default function CreateActor(){
    return(
        <>
        <h3>Create Actors</h3>
        <Link className="btn btn-primary" to="/actors">Back to Actors</Link>
        </>
    )
}