import { useEffect, useState } from "react";
import MoviesList from "../movies/MoviesList";
import { homeDto, movieDto } from "../movies/movies.model";
import axios, { AxiosResponse } from "axios";
import { urlMovies } from "../endpoints";
import AlertContext from "../utils/AlertContext";
import { Link } from "react-router-dom";
import Authorized from "../auth/Authorized";

export default function Home() {

    const[movies, setMovies] = useState<homeDto>();
    const recordsToReturn = 4;
    const topDate = new Date();
    useEffect(()=>{
      loadData();
    },[]);

    function loadData(){
      axios.get(`${urlMovies}/home`, {
        params: {
          recordsToReturn: recordsToReturn,
          topDate: topDate.toISOString()
        }
      }).then((reponse: AxiosResponse<homeDto>)=>{
        setMovies(reponse.data);
      }) }
    
      
 return (
    <>
      <AlertContext.Provider value={() => {loadData()}}>
       
        <h3>In Theares</h3>
        <Authorized authorized={
          <>
         <div className="float-end mt-3 mb-3">
            <Link className="btn btn-primary" to="/movies/create">Create Movie</Link>
        </div>
          </>}  role="admin" />
        
        <div className="mt-3 mb-3">
            <MoviesList movies={movies?.inTheaters}/>
            <h3>Coming Soon</h3>
            <MoviesList movies={movies?.upcomingReleases}/>
        </div>

      </AlertContext.Provider>
    </>
 )
}