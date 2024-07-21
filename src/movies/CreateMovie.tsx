import { Link, useNavigate } from "react-router-dom";
import MovieForm from "./MovieForm";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlGenres, urlMovies, urlMovieTheaters } from "../endpoints";
import { genreDto } from "../genres/genres.model";
import { movieTheaterDto } from "../movietheaters/movieTheater.model";
import Loading from "../utils/Loading";
import { movieCreationDto } from "./movies.model";
import DisplayErrors from "../utils/DisplayErrors";
import { convertMovieToFormData } from "../utils/formDataUtils";

export default function CreateMovie(){
    const navigate  = useNavigate();
    const [unSelectedGenres, setUnSelectedGenres] = useState<genreDto[]>([]);
    const [unSelectedMovieTheaters, setUnSelectedMovieTheaters] = useState<movieTheaterDto[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
            axios.get(`${urlGenres}/all`)
                .then((response: AxiosResponse<genreDto[]>)=> {
                    setUnSelectedGenres(response.data);
                })
    },[]);

    useEffect(() => {
        axios.get(`${urlMovieTheaters}/all`)
            .then((response: AxiosResponse<movieTheaterDto[]>)=> {
                setUnSelectedMovieTheaters(response.data);
                setLoading(false);
            })
    },[]);

    async function create(movie: movieCreationDto){
        try{
            const formData = convertMovieToFormData(movie);
            console.log(movie);
            console.log(formData);
            // await axios.post(`${urlMovies}`, movie);
            await axios({
                method: 'post',
                url: `${urlMovies}`,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            })
            navigate('/movies');
        }
        catch(error: any){
            if(error && error.response){
                setErrors(error.response.data);
                console.log(error.response.data);
            }
        }
    }
    // const
    // const unSelectedGenres = [{id: '1', name: 'Adventure'},{id: '2', name: 'Drama'},
    //     {id: '3', name: 'Comedy'},{id: '4', name: 'Thriller'}];
    // const unSelectedMovieTheaters = [{id: '1', name: 'Cinemark'},{id: '2', name: 'Cinepolis'},
    //     {id: '3', name: 'Cinemex'},{id: '4', name: 'Cinebox'}];

    return(
        <>
        <h3>Create Movie</h3>
        <DisplayErrors  errors={errors} />
        {loading? <Loading /> : 
            <MovieForm  model={{title:'', summary:'', inTheaters: false, trailer:'', 
                releaseDate: undefined, poster: undefined, posterURL: undefined}}  
                selectedGenres={[]} unSelectedGenres={unSelectedGenres}
                selectedMovieTheaters={[]} unSelectedMovieTheaters={unSelectedMovieTheaters}
                selectedActors={[]}
                onSubmit={async values => await create(values)}/>
        }
        </>
    )
}