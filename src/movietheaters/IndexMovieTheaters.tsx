import { Link } from "react-router-dom";
import IndexEntity from "../utils/IndexEntity";
import { movieTheaterDto } from "./movieTheater.model";
import { urlMovieTheaters } from "../endpoints";

export default function IndexMovieTheaters() {
    return (
        <>
           <IndexEntity<movieTheaterDto> url={urlMovieTheaters} 
                createUrl="/movietheaters/create" 
                title="Movie Theaters"
                entityName="Movie Theater"
            >
                {(entities, buttons) => 
                    <>
                        <thead>
                            <tr>
                                
                                <th>Name</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entities.map(entity => 
                                <tr key={entity.id}>
                                  
                                    <td>{entity.name}</td>
                                    <td>{entity.latitude} {entity.longitude}</td>
                                    <td>
                                        {buttons(`/movietheaters/edit/${entity.id}`, entity.id)}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </>                    
                }
           </IndexEntity>
        </>
    )
}