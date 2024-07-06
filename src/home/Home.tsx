import MoviesList from "../movies/MoviesList";
import { movieDto } from "../movies/movies.model";

export default function Home() {

    const inTheaters: movieDto[] = [{
        id: 1,
        title: 'Spider-Man: Far From Home',
        summary: 'This is a test movie',
        inTheaters: true,
        trailer: 'https://www.youtube.com/watch?v=6ZfuNTqbHE8',
        releaseDate: new Date(),
        poster: 'https://upload.wikimedia.org/wikipedia/en/b/bd/Spider-Man_Far_From_Home_poster.jpg'
      },
      {
        id: 2,
        title: 'Moana',
        summary: 'This is a test movie',
        inTheaters: true,
        trailer: 'https://www.youtube.com/watch?v=LKFuXETZUsI',
        releaseDate: new Date(),
        poster: 'https://upload.wikimedia.org/wikipedia/en/2/26/Moana_Teaser_Poster.jpg'
      },
      {
        id: 3,
        title: 'Inception',
        summary: 'This is a test movie',
        inTheaters: true,
        trailer: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
        releaseDate: new Date(),
        poster: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg'
      }
      ];
    
      const comingSoon: movieDto[] = [
        {
          id: 4,
          title: 'Sound of Metal',
          summary: 'This is a test movie',
          inTheaters: false,
          trailer: 'https://www.youtube.com/watch?v=VFOrGkAvjAE',
          releaseDate: new Date(),
          poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/11/Sound_of_Metal_poster.jpeg/220px-Sound_of_Metal_poster.jpeg'
        },
        {
          id: 5,
          title: 'The Dark Knight',
          summary: 'This is a test movie',
          inTheaters: false,
          trailer: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
          releaseDate: new Date(),
          poster: 'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg'
        },
        {
          id: 6,
          title: 'The Dark Knight Rises',
          summary: 'This is a test movie',
          inTheaters: false,
          trailer: 'https://www.youtube.com/watch?v=g8evyE9TuYk',
          releaseDate: new Date(),
          poster: 'https://upload.wikimedia.org/wikipedia/en/8/83/Dark_knight_rises_poster.jpg'
        }
      ];
      
 return (
    <>
      <h3>In Theares</h3>
            <MoviesList movies={inTheaters}/>
            <h3>Coming Soon</h3>
            <MoviesList movies={comingSoon}/>
        </>
 )
}