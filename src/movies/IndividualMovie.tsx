import { movieDto } from "./movies.model";
// import css from './IndividualMovie.module.css';
// import "./module.css"
import css from './IndividualMovie.module.css';

export default function IndividualMovie(props: movieDto) {
   const buildLink = () => `/movies/${props.id}`
   
    return(
        <div className={css.div}>
           <a href={buildLink()}>
            <img src={props.poster} alt={props.title} />
           </a>
           <p >
            <a href={buildLink()}>
                {props.title}
            </a>
           </p>
        </div>
    )
}