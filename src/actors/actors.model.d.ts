export interface actorCreationDto{
    id?: string;
    name: string;
    dateOfBirth?: Date;
    picture?: File;
    pictureUrl?: string;
    biography?: string;
}

export interface actorMovieDto{
    id: number;
    name: string;
    character: string;
    picture: string;
}

export interface actorDto{
    id: string;
    name: string;
    dateOfBirth: Date;
    picture: string;
    biography: string;
}