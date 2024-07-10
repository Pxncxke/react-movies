import { Field } from "formik";

export default function CheckboxField(props: checkboxField) {
    return (
        <div className="mb-3 form-check">
           <Field type="checkbox" id={props.name} name={props.name} className="form-check-input"/>
              <label htmlFor={props.name} className="form-check-label">{props.label}</label>
        </div>
    )
}

interface checkboxField {
    name: string;
    label : string;
}