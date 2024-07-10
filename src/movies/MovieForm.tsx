import { Form, Formik, FormikHelpers } from "formik";
import { movieCreationDto } from "./movies.model";
import * as Yup from 'yup';
import { title } from "process";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import TextField from "../forms/TextField";
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import CheckboxField from "../forms/CheckboxField";
import MultipleSelector, { multipleSelectorModel } from "../forms/MultipleSelector";
import { act, useState } from "react";
import { genreDto } from "../genres/genres.model";
import { movieTheaterDto } from "../movietheaters/movieTheater.model";
import TypeAheadActor from "../forms/TypeAheadActor";
import { actorMovieDto } from "../actors/actors.model";

export default function MovieForm(props: movieFormProps) {

    const [selectedGenres, setSelectedGenres] = useState(mapToModel(props.selectedGenres));
    const [unSelectedGenres, setUnSelectedGenres] = useState(mapToModel(props.unSelectedGenres));

    const [selectedMovieTheaters, setSelectedMovieTheaters] = useState(mapToModel(props.selectedMovieTheaters));
    const [unSelectedMovieTheaters, setUnSelectedMovieTheaters] = useState(mapToModel(props.unSelectedMovieTheaters));

    const[selectedActors, setSelectedActors] = useState(props.selectedActors);

    function mapToModel(items: {id: string, name: string}[]) : multipleSelectorModel[] {
        return items.map(item => {
            return {id: item.id, value: item.name}
        });
    }

    return (
        <Formik initialValues={props.model} onSubmit={(values, actions) => {
            values.genresIds = selectedGenres.map(item => item.id);
            values.movieTheatersIds = selectedMovieTheaters.map(item => item.id);
            values.actors = selectedActors;
            props.onSubmit(values, actions);
        }}
            validationSchema={Yup.object({
                title: Yup.string().required('This field is required').firstLetterUppercase()
            })}    
        >
            {(formikProps) => (
                <Form>
                    <TextField name="title" label="Title" type="text" />
                    <CheckboxField name="inTheaters" label="In Theaters" />
                    <TextField name="trailer" label="Trailer" type="text" />
                    <TextField name="summary" label="Summary" type="text" />
                    <DateField name="releaseDate" label="Release Date"  />
                    <ImageField name="poster" label="Poster"  imageUri={props.model.posterURL}/>
                    <MultipleSelector label="Genres" nonSelected={unSelectedGenres} selected={selectedGenres} 
                    onChange={(selected, nonselected) =>{
                        setSelectedGenres(selected);
                        setUnSelectedGenres(nonselected);
                    }} />
                    <MultipleSelector label="Movie Theaters" nonSelected={unSelectedMovieTheaters} selected={selectedMovieTheaters} 
                    onChange={(selected, nonselected) =>{
                        setSelectedMovieTheaters(selected);
                        setUnSelectedMovieTheaters(nonselected);
                    }} />
                    <TypeAheadActor label="Actors" actors={selectedActors} 
                        onAdd={actors => {
                            setSelectedActors(actors);
                        }}
                        onRemove={actor => {
                            setSelectedActors(selectedActors.filter(x => x.id !== actor.id));
                        }}
                        listUI={(actor: actorMovieDto) =>
                            <>
                            {actor.name} / <input type="text" placeholder="Character" value={actor.character} 
                                style={{border: 'none', outline: 'none', backgroundColor: 'transparent'}}
                                onChange={e => {
                                const newActors = [...selectedActors];
                                newActors.find(x => x.id === actor.id)!.character = e.target.value;
                                setSelectedActors(newActors);
                            }} />
                            </>
                        } 
                        />
                    <Button text="Save Changes" type="submit" disabled={formikProps.isSubmitting} />
                    <Link   to="/movies" className="btn btn-secondary">Cancel</Link>
                </Form>
            )}
        </Formik>
    );
}

interface movieFormProps {
    model: movieCreationDto;
    selectedGenres: genreDto[];
    unSelectedGenres: genreDto[];
    selectedMovieTheaters: movieTheaterDto[];
    unSelectedMovieTheaters: movieTheaterDto[];
    selectedActors: actorMovieDto[];
    onSubmit: (values: movieCreationDto, actions:FormikHelpers<movieCreationDto>) => void;
}