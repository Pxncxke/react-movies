import { Form, Formik, FormikHelpers } from "formik";
import { movieTheaterCreationDto } from "./movieTheater.model";
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Map from "../utils/Map";
import MapField from "../forms/MapField";
import coordinateDto from "../utils/coordinates.model";

export default function MovieTheaterForm(props: movieTheaterForm) {

    function transformCoordinates(): coordinateDto[] | undefined {
        if(props.model.latitude && props.model.longitude){
            const response: coordinateDto = {latitude: props.model.latitude, longitude: props.model.longitude};
            return [response];
        }
        return undefined;
    } 

  return (
    <Formik initialValues={props.model} onSubmit={props.onSubmit}
        validationSchema={
            Yup.object({
                name: Yup.string().required('This field is required').max(75).firstLetterUppercase()
            })
        }>
        {(formikProps) => (
            <Form>
                <div className="form-group">
                    <TextField label="Name" name="name" type="text"/>
                    <div style={{marginBottom: '1rem'}}>
                        <MapField latitudeField="latitude" longitudeField="longitude" 
                        coordinates={transformCoordinates()}/>
                    </div>
                </div>
                <Button text="Save" type="submit" disabled={formikProps.isSubmitting}/>
                <Link className="btn btn-secondary" to="/movietheaters">Cancel</Link>
            </Form>
        )}
    </Formik>
  )
}


interface movieTheaterForm {
    model: movieTheaterCreationDto;
    onSubmit: (values: movieTheaterCreationDto, action: FormikHelpers<movieTheaterCreationDto>) => void;
}