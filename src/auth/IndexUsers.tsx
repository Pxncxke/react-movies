import axios from "axios";
import { urlAccounts } from "../endpoints";
import Button from "../utils/Button";
import customConfirm from "../utils/customConfirm";
import IndexEntity from "../utils/IndexEntity";
import { userDto } from "./auth.models";
import Swal from "sweetalert2";

export default function IndexUsers(){


    async function removeAdmin(id: string){
        try{
            await axios.put(`${urlAccounts}/removeAdmin/${id}`);
            Swal.fire('Success', 'User is no longer an admin', 'success');
        }
        catch(error: any){
            if(error && error.response){
                console.log(error.response.data);
            }
        }
    }

    async function makeAdmin(id: string){
        try{
            await axios.put(`${urlAccounts}/makeAdmin/${id}`);
            Swal.fire('Success', 'User is now an admin', 'success');
        }
        catch(error: any){
            if(error && error.response){
                console.log(error.response.data);
            }
        }
    }


    return(
        <IndexEntity<userDto> title="Users" url={`${urlAccounts}`}>
            {(users, buttons) => 
                <>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: userDto) => 
                            <tr key={user.id}>
                                <td>{user.email}</td>
                                <td>
                                    <Button onClick={() => customConfirm(() => makeAdmin(user.id), `Do you wish to make ${user.email} an admin?`, 'Yes')} text="Make Admin"/>
                                    <Button className="btn btn-danger ms-2" onClick={() => customConfirm(() => removeAdmin(user.id), `Do you wish to remove ${user.email} from admin?`, 'Yes')} text="Remove Admin"/>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </>
            }
        </IndexEntity>
    )
}