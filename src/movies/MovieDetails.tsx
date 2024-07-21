import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { urlMovies, urlRatings } from "../endpoints";
import { useParams } from "react-router-dom";
import { movieDto } from "./movies.model";
import Loading from "../utils/Loading";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import coordinateDto from "../utils/coordinates.model";
import Map from "../utils/Map";
import Ratings from "../utils/Ratings";
import Swal from "sweetalert2";

export default function MovieDetails() {
  
    const {id} = useParams<{id: string}>();
    const[movie, setMovie] = useState<movieDto>();
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        axios.get(`${urlMovies}/details/${id}`)
        .then((response: AxiosResponse<movieDto>)=> {
            console.log(response.data);
            response.data.releaseDate = new Date(response.data.releaseDate);
            setMovie(response.data);
        });
    },[id]);

    function transformCoordinates(): coordinateDto[]{
        if(movie?.moviesTheaters){
            const coordinates = movie.moviesTheaters.map(movieTheater => {
                return {
                    latitude: movieTheater.latitude,
                    longitude: movieTheater.longitude,
                    name: movieTheater.name
                } as coordinateDto;
            });
            return coordinates;
        }
        return [];
    }

    function generateEmbedUrl(trailer: string): string{
        if(!trailer) return '';
        let videoId = trailer.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        if(ampersandPosition !== -1){
            videoId = videoId.substring(0, ampersandPosition);
        }
        return `https://www.youtube.com/embed/${videoId}`;
    }

    function handleRate(rate: number){
        try{
            axios.post(`${urlRatings}`, {rating: rate, movieId: id})
            .then(()=>{
                Swal.fire({title: 'Thanks for your rating', icon: 'success'});
            });
        }
        catch(error: any){
            if(error && error.response){
               setErrors(error.response.data);
            }
        }
    }

  return (
    movie ? <div>
            <h2>{movie.title} ({movie.releaseDate.getFullYear()})</h2>
                {movie.genres?.map(genre => 
                <Link style={{marginRight: '5px'}} 
                    className="btn btn-outline-primary btn-sm rounded-pill"
                    to={`/movies/filter?currentPage=1&recordsPerPage=10&searchGenre=${genre.name}`}
                    key={genre.id}>{genre.name}</Link>)} <strong>{movie.releaseDate.toDateString()}</strong> <div className="float-end"> <strong style={{marginRight: '10px'}}>Votes: {movie.userVote} </strong>  <Ratings maximumValue={5} selectedValue={movie.averageVote}  onChange={handleRate}/></div> 
                <div className="d-flex justify-content-center" style={{display: 'flex', marginTop: '1rem'}}>
                    <span style={{display: 'inline-block', marginRight: '1rem'}}>
                        <img src={movie.poster} style={{width: '250px', height: '315px'}} alt={movie.title}/>
                    </span>
                    {movie.trailer ? 
                    <div>
                        <iframe width="600" height="315" src={generateEmbedUrl(movie.trailer)} title={movie.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div> : null}
                </div>
                {movie.summary ? 
                <div style={{marginTop: '1rem'}}>
                    <h3>Summary</h3>
                    <div><ReactMarkdown>{movie.summary}</ReactMarkdown></div>
                </div> : null}
                {movie.actors && movie.actors.length ? <div style={{marginTop: '1rem'}}>
                    <h3>Actors</h3>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {movie.actors.map(actor => 
                        <div key={actor.id} style={{display: 'inline-block', marginRight: '1rem'}}>
                            <img src={actor.picture} style={{width: '70px', height: '100px', verticalAlign: 'middle'}} alt={actor.name}/>
                            {/* <p>{actor.name}</p> */}
                            <span style={{display: 'inline-block', width: '200px', marginLeft: '1rem'}}>{actor.name}</span>
                            <span style={{display: 'inline-block', width: '45', marginRight: '1rem'}}>... </span>
                            <span>{actor.character}</span>
                        </div>)}
                    </div>
                    {/* <ul>
                        {movie.actors.map(actor => <li key={actor.id}>{actor.name}</li>)}
                    </ul>   */}
                </div> : null} 
                {/* {movie.moviesTheaters && movie.moviesTheaters.length > 0 ? (
                  <div style={{ marginTop: '1rem' }}>
                    <h3>Movie Theaters</h3>
                    <div>
                      {movie.moviesTheaters.map(movieTheater => (
                        <div key={movieTheater.id} style={{ display: 'inline-block', marginRight: '1rem' }}>
                          <p>{movieTheater.name}</p>
                        </div>
                      ))}
                    </div>
                    <Map coordinates={transformCoordinates()} readOnly={true} />
                  </div>
                ) : null} */}
                   {movie.moviesTheaters && movie.moviesTheaters.length > 0 ? <div style={{marginTop: '1rem'}}>
                    <h3>Movie Theaters</h3>
                   
                    <div>
                        {movie.moviesTheaters.map(movieTheater => 
                        <div key={movieTheater.id} style={{display: 'inline-block', marginRight: '1rem'}}>
                           
                            <p>{movieTheater.name}</p>
                        </div>)}
                    </div>
                    <Map coordinates={transformCoordinates()} readOnly={true}/>
                </div> : null}
            </div>
            : <Loading/>
  );
}       