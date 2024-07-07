import { Link } from "react-router-dom";
import Button from "../utils/Button";
import { Field, Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextField from "../forms/TextField";
import { genreCreationDto } from "./genres.model";

export default function GenreForm(props: genreFormProps) {
    return (
        <Formik initialValues={props.model} 
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
            name: Yup.string()
                .required('This field is required').firstLetterUppercase()
                .max(50, 'Max 50 characters')
        })}    
        >
            {(formikProps) => (
                <Form>
                <TextField name="name" label="Name" type="text" />
                <Button text="Save Changes" type="submit" disabled={formikProps.isSubmitting} />
                <Link className="btn btn-secondary" to="/genres">Cancel</Link>
                </Form>
            )}
           
        </Formik>
    )
}

interface genreFormProps {
    model: genreCreationDto;
    onSubmit(value: genreCreationDto, action: FormikHelpers<genreCreationDto>): void;
}