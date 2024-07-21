import axios from "axios"
import { urlAccounts } from "../endpoints"
import { autheticationResponse, userCredentials } from "./auth.models";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./handleJWT";
import AuthenticationContext from "./AuthenticationContext";

export default function Register(){
    const navigate  = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);
    const{update} = useContext(AuthenticationContext);


    async function register(credentials: userCredentials){
        try{
            setErrors([]);
            const response = await axios.post<autheticationResponse>(`${urlAccounts}/create`, credentials);
            saveToken(response.data);
            // update(getClaims());
            update(JSON.parse(localStorage.getItem('claims') || '[]'));
            console.log(response.data);
            navigate('/');
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
            <h3>Register</h3>
            <DisplayErrors  errors={errors}/>
            <AuthForm model={{email: '', password: ''}} onSubmit={async (values) => await register(values)}/>
        </>
    )
}