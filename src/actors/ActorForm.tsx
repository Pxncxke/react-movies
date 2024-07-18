import { Form, Formik, FormikHelpers } from "formik";
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import { actorCreationDto } from "./actors.model";
import * as Yup from "yup";
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import MarkdownField from "../forms/MarkdownField";

export default function ActorForm(props: actorFormProps){
    return(
        <>
        <Formik initialValues={props.model} onSubmit={props.onSubmit} 
        validationSchema={
            Yup.object({
                name: Yup.string().required('This field is required').max(50),
                // dateOfBirth: Yup.date().nullable().required('This field is required'),
                // biography: Yup.string().nullable().required('This field is required'),
                // picture: Yup.mixed().required('This field is required'),
                // pictureUri: Yup.string().nullable(),
                // awards: Yup.string().nullable()
            })
        }>
            {(formikProps) => (
               <Form>
                    <TextField name="name" label="Name" type="text"/>
                    <DateField name="dateOfBirth" label="Date of Birth"/>
                    <ImageField name="picture" label="Picture" imageUrl={props.model.pictureUrl}/>
                    <MarkdownField name="biography" label="Biography"/>
                    <Button text="Save" type="submit" disabled={formikProps.isSubmitting}/>
                    <Link className="btn btn-secondary" to="/actors">Cancel</Link>
               </Form>
            )}
        </Formik>
        </>
    )
}

interface actorFormProps{
    model: actorCreationDto;
    onSubmit(values: actorCreationDto, action: FormikHelpers<actorCreationDto>): void;
}