import GenericList from "../utils/GenericList";
import Loading from "../utils/Loading";
import IndividualMovie from "./IndividualMovie";
import { movieDto } from "./movies.model";
import css from './MoviesList.module.css';

export default function MoviesList(props: movieListProps){

    return(
    <GenericList list={props.movies}>
            <div className={css.div}>
                {props.movies?.map(movie => <IndividualMovie key={movie.id} {...movie} />)}
                
            </div>
    </GenericList>
    )

}

interface movieListProps{
    movies?: movieDto[];
}