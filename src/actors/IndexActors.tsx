import { Link } from "react-router-dom";
import IndexEntity from "../utils/IndexEntity";
import { actorDto } from "./actors.model";
import { urlActors } from "../endpoints";

export default function IndexActors() {
    return(
        <>
        <IndexEntity<actorDto> url={urlActors} title="Actors" createUrl="/actors/create" entityName="Actor">
            {(actors, buttons) => 
            <>
                <thead>
                    <tr>
                        <th>Portrait</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {actors.map(actor => 
                    <tr key={actor.id}>
                        <td><img src={actor.picture} alt={actor.name} style={{width: '120px'}}/></td>
                        <td>{actor.name}</td>
                        <td>{buttons(`/actors/edit/${actor.id}`, actor.id)}</td>
                    </tr>)}
                </tbody>
            </>}
        </IndexEntity>
        </>
    )
}