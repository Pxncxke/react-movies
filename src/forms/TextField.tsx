import { ErrorMessage, Field } from "formik";

export default function TextField(props: TextFieldProps) {
    return (
        <div className="mb-3">
            <label htmlFor={props.name}>{props.label}</label>
            <Field type={props.type} id={props.name} name={props.name} className="form-control" />
            <ErrorMessage name={props.name}>
                { (msg) => <div className="text-danger">{msg}</div> }
            </ErrorMessage>
        </div>
    )
}

interface TextFieldProps {
    name: string;
    label: string;
    type: string;
}