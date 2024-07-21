import { autheticationResponse, claim } from "./auth.models";


const tokenKey = 'token';
const expirationKey = 'token-expiration';

export function saveToken(authData: autheticationResponse) {
    localStorage.setItem(tokenKey, authData.token);
    localStorage.setItem(expirationKey, authData.expiration.toString());
}

export function getClaims(): claim[]{
    const token = localStorage.getItem(tokenKey);

    if(!token){
        return [];
    }

    const expiration = localStorage.getItem(expirationKey);
    const expirationDate = expiration ? new Date(expiration) : null;

    if(expirationDate && expirationDate <= new Date()){
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(expirationKey);
        return [];
    }

    const dataToken = JSON.parse(atob(token.split('.')[1]));

    const response: claim[] = [];
    for(const property in dataToken){
        response.push({name: property, value: dataToken[property]});
    }

    return response;
}

export function logout(){
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(expirationKey);
}

export function getToken(){
    return localStorage.getItem(tokenKey);
}