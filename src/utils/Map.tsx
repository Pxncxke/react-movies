import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from "react-leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import coordinateDto from "./coordinates.model";
import { useState } from "react";



let defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    // iconSize: [50, 50]
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

export default function Map(props: mapProps){

    const [coordinates, setCoordinates] = useState<coordinateDto[]>(props.coordinates);

    return(
       <MapContainer style={{height: props.height}} center={[51.505, -0.09]} zoom={13}>
            <TileLayer attribution="React Movies"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {props.readOnly ? null :
                    <MapClick setCoordinates={coordinates => {
                        setCoordinates([coordinates]);
                        props.handleMapClick(coordinates);
                        console.log(coordinates);
                        }}/>
                }
            
            {coordinates.map((coordinate, index) => 
                <Marker key={index} position={[coordinate.latitude, coordinate.longitude]}>
                    {coordinate.name ? <Popup>{coordinate.name}</Popup> : null}
                </Marker>
            )} 
       </MapContainer>
    )
}

interface mapProps{
    height: string;
    coordinates: coordinateDto[];
    handleMapClick(coordinates: coordinateDto): void;
    readOnly: boolean;
}

Map.defaultProps = {
    height: '500px',
    handleMapClick: () => {},
    readOnly: false
}


function MapClick(props: mapClickProps){
    useMapEvent('click', eventArgs => {
        props.setCoordinates({latitude: eventArgs.latlng.lat, longitude: eventArgs.latlng.lng});
    });
    return null;
}

interface mapClickProps{
    setCoordinates(coordinates: coordinateDto): void;
}
