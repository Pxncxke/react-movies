import Swal from "sweetalert2"

export default function customConfirm(
    onConfirm: () => any,
    title?: string, 
    confirmButtonText?: string
){
    title = title || "Are you sure?";
    confirmButtonText = confirmButtonText || "Delete";
   Swal.fire({
    title,
    confirmButtonText,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6"
    }).then((result) => {
        if(result.isConfirmed){
            onConfirm();
        }
   })
}