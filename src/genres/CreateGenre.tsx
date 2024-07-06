import { Link } from "react-router-dom";
import Button from "../utils/Button";
import { useNavigate } from "react-router-dom";

export default function CreateGenre(){
    const navigate  = useNavigate();
    
    return(
        <>
        <h3>Create Genre</h3>
        <Link className="btn btn-primary" to="/genres">Back to Genres</Link>
        <button onClick={() =>{ navigate('/genres')}}>Save Changes</button>
        </>
    )
}