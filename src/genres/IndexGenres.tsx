import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { genreDto, pagedListGenreDto } from "./genres.model";
import { urlGenres } from "../endpoints";
import GenericList from "../utils/GenericList";
import Button from "../utils/Button";
import Pagination from "../utils/Pagination";
import RecordsPerPageSelect from "../utils/RecordsPerPageSelect";
import customConfirm from "../utils/customConfirm";
import IndexEntity from "../utils/IndexEntity";

export default function IndexGenres() {

    

    return(
        <>
        <IndexEntity<genreDto>
            url={urlGenres}
            createUrl="/genres/create"
            title="Genres"
            entityName="Genre">
                {(genres, buttons) => 
                    <>
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {genres.map(genre => 
                                <tr key={genre.id}>
                                    <td>
                                        {genre.name}
                                    </td>
                                    <td>
                                        {buttons(`/genres/edit/${genre.id}`, genre.id)}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </>}
        </IndexEntity>     
        </>
    )
}