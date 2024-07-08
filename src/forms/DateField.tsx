import { ErrorMessage, Field, useFormikContext } from "formik";

export default function DateField(props: dateFieldProps) {
    const {values, validateForm, touched, errors} = useFormikContext<any>();
    return (
        <div className="mb-3">
            <label htmlFor={props.name}>{props.label}</label>
            <input type="date" id={props.name} name={props.name} className="form-control" 
            defaultValue={values[props.name]?.toLocaleDateString('en-US')}
            onChange={e => {
                const date = new Date(e.target.value + 'T00:00:00');
                values[props.name] = date;
                validateForm();
            }}/>
           {touched[props.name] && errors[props.name] ? 
           <div className="text-danger">{errors[props.name]?.toString()}</div> : null}
        </div>
    )
}

interface dateFieldProps {
    name: string;
    label: string;
}