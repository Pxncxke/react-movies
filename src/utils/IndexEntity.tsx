import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import customConfirm from "./customConfirm";
import GenericList from "./GenericList";
import RecordsPerPageSelect from "./RecordsPerPageSelect";
import Pagination from "./Pagination";

export default function IndexEntity<T>(props: indexEntityProps<T>) {
    const[entities, setEntities] = useState<T[]>([]);
    const[totalPages, setTotalPages] = useState(0);
    const[recordsPerPage, setRecordsPerPage] = useState(5);
    const[currentPage, setCurrentPage] = useState(1);

    
    useEffect(() => {
        axios.get(props.url, {params: {currentPage, recordsPerPage}}).then((response : AxiosResponse<T>) => {
            console.log(response.data);
            var listedItems = response.data as any
            const totalAmountOfPages = Math.ceil(listedItems.totalCount / recordsPerPage);
            setTotalPages(totalAmountOfPages);
            setEntities(listedItems.items);
        })
    }, [currentPage, recordsPerPage]);


    async function deleteEntity(id: string){
       try{ await axios.delete(`${props.url}/${id}`);
       setEntities(entities.filter((genre: T) => (genre as any).id !== id));}
        catch(error: any){
           if(error && error.response){
               console.log(error.response.data);
    
           }
        }
    }

    const buttons = (editUrl: string, id:string) =>
        <>
            <Link className="btn btn-secondary" to={editUrl}>Edit</Link>
            <Button  className="btn btn-danger" onClick={() => customConfirm(()=> deleteEntity(id))} text="Delete" />
        </>

    return(
        <>
        <h3 className="text-center mt-3 mb-3">{props.title}</h3>  
        {props.createUrl ? <Link className="btn btn-primary float-end mb-3" to={props.createUrl}>Create {props.entityName}</Link> : null}

       
        <GenericList list={entities}>
            <table className="table table-striped table-bordered table-responsive mt-3">
                {props.children(entities!, buttons)}
            </table>
        </GenericList>
        <RecordsPerPageSelect 
        onChange={newRecordsPerPage => {
            setCurrentPage(1);
            setRecordsPerPage(newRecordsPerPage)
            }} />
        <Pagination totalAmountOfPages={totalPages} currentPage={currentPage} onChange={newPage => setCurrentPage(newPage)} />
        </>
    )
}

interface indexEntityProps<T> {
    url: string;
    createUrl?: string;
    title: string;
    entityName?: string;
    children(entity: T[], buttons: (editUrl: string, id: string) => ReactElement): ReactElement;
}