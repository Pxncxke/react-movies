import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DisplayErrors from "./DisplayErrors";
import Loading from "./Loading";

export default function EditEntity<TCreation, TRead>(props: EditEntityProps<TCreation, TRead>){
    const navigate  = useNavigate();
    const {id}: any = useParams();
    const [entity, setEntity] = useState<TCreation>();
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        axios.get(`${props.url}/${id}`).then((response: AxiosResponse<TRead>) => {
            console.log(response.data);
            setEntity(props.transform(response.data));
        })
    }, [id]);

    async function edit(entity: TCreation){
       try{ 
            const entityWithId: TCreation = { ...entity, id: id };
            console.log(entity);
            console.log(entityWithId);
            if(props.transformFormData){
                const formData = props.transformFormData(entityWithId);
                console.log(formData);
                await axios(
                    {
                        method: 'put',
                        url: `${props.url}`,
                        data: formData,
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                );
                navigate(props.indexUrl);
            }


            
            await axios.put(`${props.url}`, entityWithId);
            navigate(props.indexUrl);
        }
        catch(error: any){
            if(error && error.response){
                console.log(error.response.data);
                setErrors(error.response.data);
            }
        }
    }

    return(
        <>
        <h3 className="text-center mt-3 mb-3">Edit {props.entityName}</h3>
        <br />
        <DisplayErrors  errors={errors} />
        {entity ? 
            props.children(entity, edit) : <Loading />}
        </>
    )
}

interface EditEntityProps<TCreation, TRead>{
    indexUrl: string;
    url: string;
    entityName: string;
    transform(entity: TRead): TCreation;
    transformFormData?(model: TCreation): FormData;
    children(entity: TCreation, edit: (entity: TCreation) => void): ReactElement;
}

EditEntity.defaultProps = {
    transform: (entity: any) => entity
}