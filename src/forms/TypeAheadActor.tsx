import { Typeahead } from "react-bootstrap-typeahead";
import { actorMovieDto } from "../actors/actors.model";
import { ReactElement, useState } from "react";

export default function TypeAheadActor(props: typeAheadActorsProps){

    const actors: actorMovieDto[] =[{
        id: 1,
        name: 'Tom Holland',
        character: 'Spider-man',
        picture: 'https://image.tmdb.org/t/p/original/bBRlrpJm9XkNSg0YT5LCaxqoFMX.jpg'
        },
        {
            id: 2,
            name: 'Scarlett Johansson',
            character: 'Black Widow',
            picture: 'https://image.tmdb.org/t/p/original/3JTEc2tGUact9c0WktvpeJ9pajn.jpg'
        },
        {
            id: 3,
            name: 'Chris Hemsworth',
            character: 'Thor',
            picture: 'https://image.tmdb.org/t/p/original/jpurJ9jAcLCYjgHHfYF32m3zJYm.jpg'
        }
    ];

    const selected: actorMovieDto[] = [];
    const[draggedElement, setDraggedElement] = useState<actorMovieDto | undefined>(undefined);

    function handleDragStart(actor: actorMovieDto){
        setDraggedElement(actor);
    }

    function handleDragOver(actor: actorMovieDto){
        if(!draggedElement || draggedElement.id === actor.id){
            return;
        }

        const draggedElementIndex = props.actors.findIndex(x => x.id === draggedElement.id);
        const actorIndex = props.actors.findIndex(x => x.id === actor.id);

        const actors = [...props.actors];
        actors[actorIndex] = draggedElement;
        actors[draggedElementIndex] = actor;
        props.onAdd(actors);
    }

    return (
        <div className="mb-3">
            <label>{props.label}</label>
            <Typeahead id="typeahead" 
                onChange={(selected: any[]) => {
                    const selectedActor = selected[0] as actorMovieDto; // Cast the first selected item to actorMovieDto
                    if(selectedActor && props.actors.findIndex(x => x.id === selectedActor.id) === -1){
                        props.onAdd([...props.actors, selectedActor]);
                    }
                }}
                options={actors}

                labelKey="name"
                filterBy={['name']}
                placeholder="Choose an actor"
                minLength={1}
                flip={true}
                selected={selected}
                renderMenuItemChildren={(actor: any, props) => {
                    const selectedActor = actor as actorMovieDto;
                    return (
                        <>
                            <img
                                alt="actor"

                                src={selectedActor.picture}
                                style={{
                                    height: '64px',
                                    marginRight: '10px',
                                    width: '50px'
                                }}
                            />
                            <input

                                value={selectedActor.name} 
                                style={{border: 'none', cursor: 'pointer', backgroundColor: 'transparent'}}
                                />
                            <small ></small>
                        </>
                    )
                }}
            />
            <ul className="mt-3 list-group">
                {props.actors.map(actor => (
                    <li key={actor.id} className="list-group-item list-group-item-action" draggable={true}
                        onDragStart={() => handleDragStart(actor)}
                        onDragOver={() => handleDragOver(actor)}>
                        {props.listUI(actor)}
                        <span className="badge badge-danger pointer text-dark float-end" style={{marginLeft: '0.5rem'}} 
                        onClick={() => {
                            props.onRemove(actor);
                        }}>X</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

interface typeAheadActorsProps {
    label: string;
    actors: actorMovieDto[];
    listUI(actor: actorMovieDto): ReactElement;
    onAdd(actors: actorMovieDto[]): void;
    onRemove(actor: actorMovieDto): void;
}