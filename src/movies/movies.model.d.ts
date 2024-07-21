import { actorMovieDto } from "../actors/actors.model";
import { genreDto } from "../genres/genres.model";
import { movieTheaterDto } from "../movietheaters/movieTheater.model";

export interface movieDto{
    id: string;
    title: string;
    summary: string;
    inTheaters: boolean;
    trailer: string;
    releaseDate: Date;
    poster: string;
    genres?: genreDto[];
    moviesTheaters?: movieTheaterDto[];
    actors?: actorMovieDto[];
    userVote: number;
    averageVote: number;
}

export interface movieCreationDto{
    id?: string;
    title: string;
    summary?: string;
    inTheaters: boolean;
    trailer: string;
    releaseDate?: Date;
    poster?: File;
    posterURL?: string;
    genresIds?: string[];
    movieTheatersIds?: string[];
    actors?: actorMovieDto[];
}

export interface homeDto{
    inTheaters: movieDto[];
    upcomingReleases: movieDto[];
}

export interface movieUpdateDto{
    movie: movieDto;
    selectedGenres: genreDto[];
    unSelectedGenres: genreDto[];
    selectedMovieTheaters: movieTheaterDto[];
    unSelectedMovieTheaters: movieTheaterDto[];
    actors: actorMovieDto[];
}