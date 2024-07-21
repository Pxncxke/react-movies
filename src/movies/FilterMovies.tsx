import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { genreDto } from "../genres/genres.model";
import Button from "../utils/Button";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlGenres, urlMovies } from "../endpoints";
import { movieDto } from "./movies.model";
import MoviesList from "./MoviesList";
import { string } from "yup";
import Pagination from "../utils/Pagination";

export default function FilterMovies<T>(){
    const navigate  = useNavigate();
    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
    const[recordsPerPage, setRecordsPerPage] = useState(5);
    const initialValues: FilterMoviesForm = {
        title: '',
        genreName: '',
        upcomingReleases: false,
        inTheaters: false,
        currentPage: 1,
        recordsPerPage: 3
    }


    const[genres, setGenres] = useState<genreDto[]>([]);

    const[movies, setMovies] = useState<movieDto[]>([]);

    useEffect(() => {
        axios.get(`${urlGenres}/all`)
        .then((response: AxiosResponse<genreDto[]>) => {
            setGenres(response.data);
        })
    }, []);



    function searchMovies(values: FilterMoviesForm){
    
        axios.get(`${urlMovies}`, {
            params: {
                currentPage: values.currentPage,
                recordsPerPage: values.recordsPerPage,
                searchTitle: values.title,
                inTheaters: values.inTheaters,
                upcomingReleases: values.upcomingReleases,
                searchGenre:  values.genreName
              }
        })
        .then((response: AxiosResponse<T>) => {
            var listedItems = response.data as any
            const totalAmountOfPages = Math.ceil(listedItems.totalCount / recordsPerPage);
            setTotalAmountOfPages(totalAmountOfPages);
            setMovies(listedItems.items);
        })
    }


    return(
        <>
        <h3 className="text-center mt-3 mb-3">Filter Movies</h3>
        <br />
        <br />
        <Formik initialValues={initialValues}
            onSubmit={values => {
                    values.currentPage = 1;
                    console.log(values);
                    searchMovies(values);
                    }}>
                {(formikProps) => (
                   <>
                   <Form>
                        <div className="row gx-3 align-items-center mb-3">
                        <div className="col-auto">
                            <input type="text" placeholder="Title" className="form-control" id="title" {...formikProps.getFieldProps('title')} />
                        </div>
                        <div className="col-auto">
                            <select className="form-select" id="genreId" {...formikProps.getFieldProps('genreId')}>
                                <option value=""> Select Genre</option>
                               {genres.map(genre => <option key={genre.id} value={genre.name}>{genre.name}</option>)}
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
                            <Button text="Clear" className="btn btn-danger ms-3" onClick={() => {
                                searchMovies(initialValues);
                                formikProps.setValues(initialValues)}} />
                        </div>
                        </div>
                    </Form>
                    <MoviesList movies={movies} />
                    <Pagination totalAmountOfPages={totalAmountOfPages} 
                        currentPage={formikProps.values.currentPage} 
                        onChange={newPage => {
                            formikProps.values.currentPage = newPage;
                            searchMovies(formikProps.values);
                        }} />
                   </> 
                )}
        </Formik>
        </>
    )
}

interface FilterMoviesForm{
    title: string;
    genreName: string;
    upcomingReleases: boolean;
    inTheaters: boolean;
    currentPage: number;
    recordsPerPage: number;
}