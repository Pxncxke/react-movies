import { useNavigate } from "react-router-dom";
import GenreForm from "./GenreForm";
import { genreCreationDto } from "./genres.model";
import axios from "axios";
import { urlGenres } from "../endpoints";
import { useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";

export default function CreateGenre(){
    const navigate  = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);

    async function createGenre(genre: genreCreationDto){
        try{
            await axios.post(urlGenres, genre);
            navigate('/genres');
        }
        catch(error: any){
            if(error.response){
                console.log(error.response.data);
                setErrors(error.response.data);
            }
        }

    }
    
    return(
        <>
        <h3>Create Genre</h3>
        <DisplayErrors errors={errors} />
        <br />
        <GenreForm  model={{name : ''}}
            onSubmit={async (values) => {
                await createGenre(values);
                console.log(values);
            }}
        />
        </>
    )
}