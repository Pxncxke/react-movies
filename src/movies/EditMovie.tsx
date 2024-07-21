import { Link, useNavigate, useParams } from "react-router-dom";
import MovieForm from "./MovieForm";
import { useEffect, useState } from "react";
import axios, { Axios, AxiosResponse } from "axios";
import { urlMovies } from "../endpoints";
import { movieCreationDto, movieDto, movieUpdateDto } from "./movies.model";
import { convertMovieToFormData } from "../utils/formDataUtils";
import DisplayErrors from "../utils/DisplayErrors";
import Loading from "../utils/Loading";

export default function EditMovie(){
    const navigate  = useNavigate();
    const[movie, setMovie] = useState<movieCreationDto>();
    const[updateMovie, setUpdateMovie] = useState<movieUpdateDto>();
    const [errors, setErrors] = useState<string[]>([]);
    const {id} = useParams<{id: string}>();
    
    useEffect(()=>{
        axios.get(`${urlMovies}/${id}`)
            .then((response: AxiosResponse<movieUpdateDto>) => {
                console.log(response.data);
                const model: movieCreationDto ={
                    id: response.data.movie.id,
                    title: response.data.movie.title,
                    summary: response.data.movie.summary,
                    inTheaters: response.data.movie.inTheaters,
                    trailer: response.data.movie.trailer,
                    releaseDate: new Date(response.data.movie.releaseDate),
                    // poster: response.data.movie.poster,
                    posterURL: response.data.movie.poster,
                    // genresIds: response.data.selectedGenres.map(val => val.id),
                    // movieTheatersIds: response.data.selectedMovieTheaters.map(val => val.id),
                    // actors: response.data.actors
                };

                setMovie(model);
                setUpdateMovie(response.data);
            })
    },[id]);


    async function edit(movie: movieCreationDto){
        try{
            const formData = convertMovieToFormData(movie);
            console.log(movie);
            await axios({
                method: 'put',
                url: `${urlMovies}`,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            })
            navigate(`/movies/details/${id}`);
        }
        catch(error: any){
            if(error && error.response){
                setErrors(error.response.data);
                console.log(error.response.data);
            }
        }
    }

    // const selectedActor = [{
    //     id: 1,
    //     name: 'Tom Holland',
    //     character: 'Spider-man',
    //     picture: 'https://image.tmdb.org/t/p/original/bBRlrpJm9XkNSg0YT5LCaxqoFMX.jpg'
    //     }];
    return(
        <>
        <h3>Edit Movie</h3>
        <DisplayErrors  errors={errors} />
        {movie && updateMovie ? 
            <MovieForm model={movie}  
            selectedGenres={updateMovie.selectedGenres}
            unSelectedGenres={updateMovie.unSelectedGenres}
            selectedMovieTheaters={updateMovie.selectedMovieTheaters}
            unSelectedMovieTheaters={updateMovie.unSelectedMovieTheaters}
            selectedActors={updateMovie.actors}
            onSubmit={async values => await edit(values)}/>
        : <Loading />}
         
        </>
    )
}