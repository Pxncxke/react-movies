import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import './Ratings.css';
import AuthenticationContext from "../auth/AuthenticationContext";
import Swal from "sweetalert2";
import { title } from "process";

export default function Ratings(props: ratingsProps) {

    const[maximunValueArray, setMaximunValueArray] = useState<number[]>([]);
    const[selectedValue, setSelectedValue] = useState(props.selectedValue);
    const {claims} = useContext(AuthenticationContext);

    useEffect(() => {
        setMaximunValueArray(Array(props.maximumValue).fill(0));
    }, [props.maximumValue]);


    function handleMouseOver(index: number){
      setSelectedValue(index);
    }

    function handleClick(index: number){
       const userIsLoggedIn = claims.length > 0;
        if(!userIsLoggedIn){
            Swal.fire({title:'Login required', text:'You must be logged in to rate a movie', icon:'error'});
            return;
        }
        setSelectedValue(index);
        props.onChange(index);
    }

    return(
        <>
        {maximunValueArray.map((value, index) => 
        <FontAwesomeIcon icon="star" key={index} 
            onClick={() => handleClick(index + 1)}
            className={`fa-lg pointer ${selectedValue >= index+1 ? 'checked' : null}`} 
            onMouseOver={() => handleMouseOver(index + 1)}/>)}
        </>
    )
}

interface ratingsProps {
    maximumValue: number;
    selectedValue: number;
    onChange(rate: number): void;
}