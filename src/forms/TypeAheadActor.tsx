import { Typeahead } from "react-bootstrap-typeahead";
import { actorMovieDto } from "../actors/actors.model";
import { ReactElement, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import axios, { AxiosResponse } from "axios";
import { urlActors } from "../endpoints";

export default function TypeAheadActor(props: typeAheadActorsProps){
    const [actors, setActors] = useState<actorMovieDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSearch(query: string){
        setIsLoading(true);
        axios.get(`${urlActors}/searchByName/${query}`)
            .then((response: AxiosResponse<actorMovieDto[]>) =>{
                setActors(response.data);
                setIsLoading(false);
                console.log(response.data);
            })
        // fetch(`https://api.themoviedb.org/3/search/person?api_key=0b2b4a2b0b9b1e1d1a6b5a2a1b8b9b9&language=en-US&query=${query}&page=1&include_adult=false`)
            // .then(response => response.json())
            // .then(data => {
            //     const actors = data.results.map((actor: any) => {
            //         return {
            //             id: actor.id,
            //             name: actor.name,
            //             picture: actor.profile_path ? `https://image.tmdb.org/t/p/original${actor.profile_path}` : 'https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png'
            //         } as actorMovieDto;
            //     });
            //     setActors(actors);
            //     setIsLoading(false);
            // });
    }
    // const actors: actorMovieDto[] =[{
    //     id: 1,
    //     name: 'Tom Holland',
    //     character: 'Spider-man',
    //     picture: 'https://image.tmdb.org/t/p/original/bBRlrpJm9XkNSg0YT5LCaxqoFMX.jpg'
    //     },
    //     {
    //         id: 2,
    //         name: 'Scarlett Johansson',
    //         character: 'Black Widow',
    //         picture: 'https://image.tmdb.org/t/p/original/3JTEc2tGUact9c0WktvpeJ9pajn.jpg'
    //     },
    //     {
    //         id: 3,
    //         name: 'Chris Hemsworth',
    //         character: 'Thor',
    //         picture: 'https://image.tmdb.org/t/p/original/jpurJ9jAcLCYjgHHfYF32m3zJYm.jpg'
    //     }
    // ];

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
            <AsyncTypeahead id="typeahead" 
                onChange={(selected: any[]) => {
                    const selectedActor = selected[0] as actorMovieDto; // Cast the first selected item to actorMovieDto
                    if(selectedActor && props.actors.findIndex(x => x.id === selectedActor.id) === -1){
                        actors[0].character = '';
                        props.onAdd([...props.actors, selectedActor]);
                    }
                }}
                options={actors}

                labelKey="name"
                filterBy={() => true}
                isLoading={isLoading}
                onSearch={handleSearch}
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