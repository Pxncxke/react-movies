import { Link } from "react-router-dom";
import MovieForm from "./MovieForm";

export default function CreateMovie(){

    const unSelectedGenres = [{id: '1', name: 'Adventure'},{id: '2', name: 'Drama'},
        {id: '3', name: 'Comedy'},{id: '4', name: 'Thriller'}];
    const unSelectedMovieTheaters = [{id: '1', name: 'Cinemark'},{id: '2', name: 'Cinepolis'},
        {id: '3', name: 'Cinemex'},{id: '4', name: 'Cinebox'}];

    return(
        <>
        <h3>Create Movie</h3>
        <MovieForm  model={{title:'', summary:'', inTheaters: false, trailer:'', 
            releaseDate: undefined, poster: undefined, posterURL: undefined}}  
            selectedGenres={[]} unSelectedGenres={unSelectedGenres}
            selectedMovieTheaters={[]} unSelectedMovieTheaters={unSelectedMovieTheaters}
            selectedActors={[]}
            onSubmit={values => console.log(values)}/>
        </>
    )
}