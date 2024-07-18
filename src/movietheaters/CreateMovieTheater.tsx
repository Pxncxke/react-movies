import { Link, useNavigate } from "react-router-dom";
import MovieTheaterForm from "./MovieTheaterForm";
import { movieCreationDto } from "../movies/movies.model";
import { urlMovieTheaters } from "../endpoints";
import axios from "axios";
import { useState } from "react";
import { movieTheaterCreationDto } from "./movieTheater.model";
import DisplayErrors from "../utils/DisplayErrors";

export default function CreateMovieTheater(){
    const navigate  = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);

    async function create(movieTheater: movieTheaterCreationDto){
        try{
            await axios.post(urlMovieTheaters, movieTheater);
            navigate('/movietheaters');
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
        <h3>Create Movie Theater</h3>
        <DisplayErrors errors={errors} />
        <br />
        <MovieTheaterForm model={{name: ''}} onSubmit={async values => await create(values)}/>
        </>
    )
}