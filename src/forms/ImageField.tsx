import { useFormikContext } from "formik";
import { useState } from "react";

export default function ImageField(props: imageFieldProps) {

    const[imageBase64, setImageBase64] = useState('');
    const [imageUrl, setImageUri] = useState(props.imageUrl);
    const {values} = useFormikContext<any>();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.currentTarget.files?.length === 0) {
            setImageBase64('');
            return;
        }

        const file = e.currentTarget.files?.[0];
        if (file) {
            toBase64(file).then((base64Representation : string) => 
                setImageBase64(base64Representation)).catch(error => console.error(error));
            values[props.name] = file;
            setImageUri('');
        }
        else{
            setImageBase64('');
            setImageUri('');
        }
    }

    const toBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }
    
    return (
        <div className="mb-3">
            <label htmlFor={props.name}>{props.label}</label>
            <div>
                <input type="file" id={props.name} name={props.name} className="form-control" accept=".jpg,.jpeg,.png"
                    onChange={handleOnChange}/>
            </div>
           <div>
                {imageBase64 ? <img src={imageBase64} alt="selected" style={{width: '300px', marginTop: '10px'}}/> : null}
           </div>
           <div>
                {imageUrl ? <img src={imageUrl} alt="selected" style={{width: '300px', marginTop: '10px'}}/> : null}
           </div>
        </div>
    )
}

interface imageFieldProps {
    name: string;
    label: string;
    imageUrl?: string;
}

ImageField.defaultProps = {
    imageUrl: ''
}