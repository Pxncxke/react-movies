import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { genreDto } from "../genres/genres.model";
import Button from "../utils/Button";

export default function FilterMovies(){
    const initialValues: FilterMoviesForm = {
        title: '',
        genreId: '',
        upcomingReleases: false,
        inTheaters: false
    }

    const genres: genreDto[] = [{id: '1', name: 'Action'}, {id: '2', name: 'Comedy'}, {id: '3', name: 'Thriller'}];

    return(
        <>
        <h3>Filter Movies</h3>
        <Link className="btn btn-primary" to="/movies/create">Create Movies</Link>
        <Link className="btn btn-primary" to="/movies/edit">Edit Movies</Link>
        <br />
        <br />
        <Formik initialValues={initialValues}
            onSubmit={values => console.log(values)}>
                {(formikProps) => (
                    <Form>
                        <div className="row gx-3 align-items-center">
                        <div className="col-auto">
                            <input type="text" placeholder="Title" className="form-control" id="title" {...formikProps.getFieldProps('title')} />
                        </div>
                        <div className="col-auto">
                            <select className="form-select" id="genreId" {...formikProps.getFieldProps('genreId')}>
                                <option value=""> Select Genre</option>
                               {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                            </select>
                        </div>
                        <div className="col-auto">
                            <div className="form-check">
                            <Field type="checkbox" className="form-check-input" id="upcomingReleases" name="upcomingReleases" />
                            <label htmlFor="upcomingReleases" className="form-check-label">Upcoming Releases</label>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="form-check">
                            <Field type="checkbox" className="form-check-input" id="inTheaters" name="inTheaters" />
                            <label htmlFor="inTheaters" className="form-check-label">In Theaters</label>
                            </div>
                        </div>
                        <div className="col-auto">
                            <Button text="Filter" type="submit"/>
                            <Button text="Clear" className="btn btn-danger ms-3" onClick={() => formikProps.setValues(initialValues)} />
                        </div>
                        </div>
                    </Form>
                )}
        </Formik>
        </>
    )
}

interface FilterMoviesForm{
    title: string;
    genreId: string;
    upcomingReleases: boolean;
    inTheaters: boolean;
}