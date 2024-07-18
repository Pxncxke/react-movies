import { Link } from "react-router-dom";
import ActorForm from "./ActorForm";
import EditEntity from "../utils/EditEntity";
import { urlActors } from "../endpoints";
import { actorCreationDto, actorDto } from "./actors.model";
import { convertActorToFormData } from "../utils/formDataUtils";

export default function EditActor(){

    function transform(actor: actorDto): actorCreationDto{
        return {
            name: actor.name,
            dateOfBirth: new Date(actor.dateOfBirth),
            pictureUrl: actor.picture,
            biography: actor.biography
        }
    }

    return(
        <>
         <EditEntity<actorCreationDto, actorDto> url={urlActors} 
            transformFormData={convertActorToFormData}
            transform={transform}
            indexUrl="/actors" 
            entityName="Actor">
            {(entity, edit) => 
            <>
                <ActorForm model={entity} onSubmit={async values => await edit(values)} />
            </>
            }
         </EditEntity>
        </>
    )
}