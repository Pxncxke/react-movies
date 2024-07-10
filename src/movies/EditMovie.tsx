import { Link } from "react-router-dom";
import MovieForm from "./MovieForm";

export default function EditMovie(){
    const selectedActor = [{
        id: 1,
        name: 'Tom Holland',
        character: 'Spider-man',
        picture: 'https://image.tmdb.org/t/p/original/bBRlrpJm9XkNSg0YT5LCaxqoFMX.jpg'
        }];
    return(
        <>
        <h3>Edit Movie</h3>
         <MovieForm model={{title:'The Lord of the Rings', 
            summary:'The Lord of the Rings is a film series of three epic fantasy adventure films directed by Peter Jackson, based on the novel written by J. R. R. Tolkien. The films are subtitled The Fellowship of the Ring (2001), The Two Towers (2002), and The Return of the King (2003). Produced and distributed by New Line Cinema with the co-production of WingNut Films, it is an international venture between New Zealand and the United States. The films feature an ensemble cast including Elijah Wood, Ian McKellen, Liv Tyler, Viggo Mortensen, Sean Astin, Cate Blanchett, John Rhys-Davies, Christopher Lee, Billy Boyd, Dominic Monaghan, Orlando Bloom, Hugo Weaving, Andy Serkis, and Sean Bean. The trilogy was noted for its innovative special effects, cinematography, musical score, and emotional depth. They are among the highest-grossing films of all time.', 
            inTheaters: true, trailer:'https://www.youtube.com/watch?v=V75dMMIW2B4',   releaseDate: new Date('2001-12-19'), 
            poster: undefined, posterURL: 'https://www.imdb.com/title/tt0120737/mediaviewer/rm2359265536/'}}  
            selectedGenres={[{id: '1', name: 'Adventure'},{id: '2', name: 'Drama'}]}
            unSelectedGenres={[{id: '3', name: 'Comedy'},{id: '4', name: 'Thriller'}]}
            selectedMovieTheaters={[{id: '1', name: 'Cinemark'},{id: '2', name: 'Cinepolis'}]}
            unSelectedMovieTheaters={[{id: '3', name: 'Cinemex'},{id: '4', name: 'Cinebox'}]}
            selectedActors={selectedActor}
            onSubmit={values => console.log(values)}/>
        </>
    )
}