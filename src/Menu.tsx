/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink, useNavigate } from "react-router-dom";
import Authorized from "./auth/Authorized";
import Button from "./utils/Button";
import { logout } from "./auth/handleJWT";
import { useContext } from "react";
import AuthenticationContext from "./auth/AuthenticationContext";

export default function Menu(){
    const navigate  = useNavigate();
    const{update, claims} = useContext(AuthenticationContext);

    function getUserEmail(): string{
        const claim = claims.filter(c => c.name === 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress')[0]?.value;
        return claim;
    }

    return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">Movies</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/movies/filter">Filter Movies</NavLink>
                </li>
                <Authorized role="admin" authorized={
                   <>
                    <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to="/genres">Genres</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to="/actors">Actors</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to="/movietheaters">Movie Theaters</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to="/users">Users</NavLink>
                    </li>
                   </>
                } />
                
                   
                
            </ul>
            <ul className="navbar-nav ms-auto">
            <Authorized authorized={
                        <>
                            <span className="navbar-text">
                                Hello, {getUserEmail()}
                            </span>
                            <Button onClick={() =>{
                                logout();
                                update([]);
                                navigate('/');
                            }} className="nav-link btn btn-link" type="button"  text="Logout"/>
                        </>
                    } unauthorized={
                    <>
                    <li className="nav-item">
                    <NavLink className="nav-link btn btn-link"  to="/register">Register</NavLink>
                    </li>
                    
                    <li className="nav-item">
                    <NavLink className="nav-link btn btn-link"  to="/login">Login</NavLink>
                    </li>
                    
                </>} />
            </ul>
              
            </div>
        </div>
        </nav>
    </>
  );
}