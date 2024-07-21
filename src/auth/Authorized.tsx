import { ReactElement, useContext, useEffect, useState } from "react";
import AuthenticationContext from "./AuthenticationContext";

export default function Authorized(props: AuthorizedProps) {
    const[isAuthorized, setIsAuthorized] = useState(false);
    const{claims} = useContext(AuthenticationContext);

    useEffect(()=>{
        if(props.role){
            console.log(props.role);
            const index = claims.findIndex(c => c.value === props.role && c.name === "http://schemas.microsoft.com/ws/2008/06/identity/claims/role");
            // setIsAuthorized(claims.some(c => c.value === props.role && c.name === "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"));
            setIsAuthorized(index > -1);
            console.log(isAuthorized);
        }else{
            setIsAuthorized(claims.length > 0);
        }
    },[claims, props.role]);

    return(
        <>
            {isAuthorized ? props.authorized : props.unauthorized}
        </>
    )
}

interface AuthorizedProps {
    authorized: ReactElement;
    unauthorized?: ReactElement;
    role?: string;
}