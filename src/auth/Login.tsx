import axios from "axios";
import { autheticationResponse, userCredentials } from "./auth.models";
import AuthForm from "./AuthForm";
import { urlAccounts } from "../endpoints";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DisplayErrors from "../utils/DisplayErrors";
import { getClaims, saveToken } from "./handleJWT";
import AuthenticationContext from "./AuthenticationContext";

export default function Login() {
    const navigate  = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);
    const{update} = useContext(AuthenticationContext);

    async function login(credentials:userCredentials) {
        try{
            setErrors([]);
            const response = await axios.post<autheticationResponse>(`${urlAccounts}/login`, credentials);
            saveToken(response.data);
            // setClaims(JSON.parse(localStorage.getItem('claims') || '[]'));
            update(getClaims());
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
        <h3>Login</h3>
        <DisplayErrors errors={errors}/>
        <AuthForm model={{email: '', password: ''}} onSubmit={async (values) => await login(values)}/>
        </>
    )
}