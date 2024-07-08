export interface actorCreationDto{
    name: string;
    dateOfBirth?: Date;
    picture?: File;
    pictureUri?: string;
    biography?: string;
    awards: string[];
}