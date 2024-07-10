export interface movieDto{
    id: number;
    title: string;
    summary: string;
    inTheaters: boolean;
    trailer: string;
    releaseDate: Date;
    poster: string;
}

export interface movieCreationDto{
    title: string;
    summary: string;
    inTheaters: boolean;
    trailer: string;
    releaseDate?: Date;
    poster?: File;
    posterURL?: string;
    genresIds?: string[];
    movieTheatersIds?: string[];
    actors?: actorMovieDto[];
}
