import { Link } from "react-router-dom";
import MovieTheaterForm from "./MovieTheaterForm";
import EditEntity from "../utils/EditEntity";
import { movieTheaterCreationDto, movieTheaterDto } from "./movieTheater.model";
import { urlMovieTheaters } from "../endpoints";

export default function EditMovieTheater(){
    return(
        <>
            <EditEntity<movieTheaterCreationDto, movieTheaterDto>
                indexUrl="/movietheaters"
                url={urlMovieTheaters}
                entityName="Movie Theater"
                >
                {(entity, edit) =>
                    <MovieTheaterForm
                        model={entity}
                        onSubmit={async values => {
                            await edit(values);
                        }}
                    />
                }
            </EditEntity>
        </>
    )
}