import { Link } from "react-router-dom";
import ActorForm from "./ActorForm";

export default function CreateActor(){
    return(
        <>
        <h3>Create Actor</h3>
        <ActorForm model={{name: '', dateOfBirth: undefined, picture: undefined, biography: '', awards: []}}
            onSubmit={values => console.log(values)}/>
        </>
    )
}