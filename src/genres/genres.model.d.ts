export interface genreCreationDto{
    name: string;    
}

export interface genreDto{
    id: string;
    name: string;
}

export interface pagedListGenreDto{
    items: genreDto[];
    page: number;
    pageSize: number;
    totalCount: number;
}