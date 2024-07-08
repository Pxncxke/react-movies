import { Link } from "react-router-dom";
import MovieTheaterForm from "./MovieTheaterForm";

export default function EditMovieTheater(){
    return(
        <>
        <h3>Edit Movie Theater</h3>
        <MovieTheaterForm model={{name: 'Cinema City', latitude: 50.0646501, longitude: 19.9449799}} 
            onSubmit={values => console.log(values)}/>
        </>
    )
}