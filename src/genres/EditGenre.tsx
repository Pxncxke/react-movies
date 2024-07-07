import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GenreForm from "./GenreForm";

export default function EditGenre(){
    const navigate  = useNavigate();
    const {id}: any = useParams();
    return(
        <>
        <h3>Edit Genre</h3>
        <br />
        <GenreForm  model={{name : 'Action'}}
            onSubmit={async (values) => {
                await new Promise(resolve => setTimeout(resolve, 2000));
                console.log(id);
                console.log(values);
                navigate('/genres');
            }}
        />
        </>
    )
}