import { Link, useNavigate } from "react-router-dom";
import ActorForm from "./ActorForm";
import { actorCreationDto } from "./actors.model";
import { useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";
import { convertActorToFormData } from "../utils/formDataUtils";
import { urlActors } from "../endpoints";
import axios from "axios";

export default function CreateActor(){
    const navigate  = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);
    async function create(actor: actorCreationDto){
        try{
            const formData = convertActorToFormData(actor);
            // await axios.post(urlActors, formData);
            await axios({
                method: 'post',
                url: urlActors,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            });
            navigate('/actors');
        }
        catch(error:any){
            if(error && error.response){
                console.log(error.response.data);
                setErrors(error.response.data);
            }
        }
    }


    return(
        <>
        <h3>Create Actor</h3>
        <DisplayErrors errors={errors} />
        <ActorForm model={{name: '', dateOfBirth: undefined, picture: undefined, biography: ''}}
            onSubmit={async (values) => {
                console.log(values);
                await create(values);
            } }/>
        </>
    )
}