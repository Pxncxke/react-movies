import { movieDto } from "./movies.model";
// import css from './IndividualMovie.module.css';
// import "./module.css"
import css from './IndividualMovie.module.css';
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import customConfirm from "../utils/customConfirm";
import axios from "axios";
import { urlMovies } from "../endpoints";
import { useContext } from "react";
import AlertContext from "../utils/AlertContext";
import Authorized from "../auth/Authorized";

export default function IndividualMovie(props: movieDto) {
   const buildLink = () => `/movies/details/${props.id}`
   const customAlert = useContext(AlertContext);

   function deleteMovie(){
        axios.delete(`${urlMovies}/${props.id}`)
        .then(() => {
            customAlert();
        })
   };
   
    return(
        <div className={css.div}>
           <Link to={buildLink()}>
            <img src={props.poster} alt={props.title} />
           </Link>
           <p >
            <Link to={buildLink()}>
                {props.title}
            </Link>
           </p>
           <Authorized authorized={
            <>
             <div>
            <Link to={`/movies/edit/${props.id}`} style={{marginRight: '1rem'}} className="btn btn-info">Edit</Link>
            <Button onClick={() => customConfirm(()=> deleteMovie())} className="btn btn-danger" text="Delete"/>
           </div>
            </>
           } role="admin" />
          
        </div>
    )
}