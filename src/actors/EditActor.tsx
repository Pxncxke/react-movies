import { Link } from "react-router-dom";
import ActorForm from "./ActorForm";

export default function EditActor(){
    return(
        <>
        <h3>Edit Actors</h3>
        <ActorForm model={{name: 'Tom Holland', dateOfBirth: new Date(), 
        pictureUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/220px-Tom_Holland_by_Gage_Skidmore.jpg', 
        biography: '', awards: []}}
            onSubmit={values => console.log(values)}/>
        </>
    )
}