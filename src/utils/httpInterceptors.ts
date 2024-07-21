import axios from "axios";
import { getToken } from "../auth/handleJWT";

export default function configureInterceptor(){
    axios.interceptors.request.use(
    function (request) {
        const token = getToken();
        if(token){
            request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
    },
    function (error:any){
        return Promise.reject(error);
    });
}