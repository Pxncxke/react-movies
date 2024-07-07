import { useNavigate } from "react-router-dom";
import GenreForm from "./GenreForm";

export default function CreateGenre(){
    const navigate  = useNavigate();
    
    return(
        <>
        <h3>Create Genre</h3>
        <br />
        <GenreForm  model={{name : ''}}
            onSubmit={async (values) => {
                await new Promise(resolve => setTimeout(resolve, 2000));
                console.log(values);
                navigate('/genres');
            }}
        />
        </>
    )
}