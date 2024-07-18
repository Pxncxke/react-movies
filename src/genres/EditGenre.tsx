import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GenreForm from "./GenreForm";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlGenres } from "../endpoints";
import { genreCreationDto, genreDto } from "./genres.model";
import Loading from "../utils/Loading";
import DisplayErrors from "../utils/DisplayErrors";
import EditEntity from "../utils/EditEntity";

export default function EditGenre(){


    return(
        <>
        
        <EditEntity<genreCreationDto, genreDto>
            url={urlGenres}
            entityName="Genres"
            indexUrl="/genres"
            >
            {(entity, edit) =>
                <GenreForm  model={entity}
                onSubmit={async (values) => {
                    await edit(values);
                }}
            />
            }
        </EditEntity>
        </>
    )
}