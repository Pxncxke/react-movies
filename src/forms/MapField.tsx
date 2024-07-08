import { useFormikContext } from "formik";
import coordinateDto from "../utils/coordinates.model";
import Map from "../utils/Map";

export default function MapField(props: mapFieldProps){

    const {values} = useFormikContext<any>();

    function handleMapClick(coordinates: coordinateDto){
        values[props.latitudeField] = coordinates.latitude;
        values[props.longitudeField] = coordinates.longitude;
    }

    return(
        <Map coordinates={props.coordinates} handleMapClick={handleMapClick}/>
    )
}

interface mapFieldProps{
    coordinates: coordinateDto[];
    latitudeField: string;
    longitudeField: string;
}

MapField.defaultProps = {
    coordinates: []
}