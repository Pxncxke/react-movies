export interface actorCreationDto{
    name: string;
    dateOfBirth?: Date;
    picture?: File;
    pictureUri?: string;
    biography?: string;
    awards: string[];
}

export interface actorMovieDto{
    id: number;
    name: string;
    character: string;
    picture: string;
}