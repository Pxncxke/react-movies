import { Form, Formik, FormikHelpers } from "formik";
import { userCredentials } from "./auth.models";
import * as Yup from 'yup';
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";

export default function AuthForm(props: authFormProps) {

    return(
        <Formik initialValues={props.model} onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('The email is required'),
                password: Yup.string().required('The password is required')
            })}>
            {formikProps => (
                <Form>
                    <TextField label="Email" name="email" type="email" />
                    <TextField label="Password" name="password" type="password" />
                    <Button text="Submit" type="submit" disabled={formikProps.isSubmitting}/>
                    <Link className='btn btn-secondary' to='/'>Cancel</Link>
                </Form>
            )}
        </Formik>
    )
}

interface authFormProps {
    model: userCredentials;
    onSubmit(values: userCredentials, actions: FormikHelpers<userCredentials>): void;
}