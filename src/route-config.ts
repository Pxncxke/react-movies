import path from "path";
import Home from "./home/Home";
import IndexGenres from "./genres/IndexGenres";
import EditGenre from "./genres/EditGenre";
import CreateGenre from "./genres/CreateGenre";
import IndexActors from "./actors/IndexActors";
import CreateActor from "./actors/CreateActor";
import EditActor from "./actors/EditActor";
import IndexMovieTheaters from "./movietheaters/IndexMovieTheaters";
import CreateMovieTheater from "./movietheaters/CreateMovieTheater";
import EditMovieTheater from "./movietheaters/EditMovieTheater";
import CreateMovie from "./movies/CreateMovie";
import EditMovie from "./movies/EditMovie";
import FilterMovies from "./movies/FilterMovies";
import RedirectToHome from "./home/RedirectToHome";
import MovieDetails from "./movies/MovieDetails";
import Register from "./auth/Register";
import Login from "./auth/Login";
import IndexUsers from "./auth/IndexUsers";



const routes = [
    { path: "/", component: Home, exact: true },
    { path: "/genres", component: IndexGenres, exact: true, isAdmin: true },
    { path: "/genres/create", component: CreateGenre, exact: true, isAdmin: true },
    { path: "/genres/edit/:id", component: EditGenre, exact: true, isAdmin: true },
    { path: "/actors", component: IndexActors, exact: true, isAdmin: true },
    { path: "/actors/create", component: CreateActor, exact: true, isAdmin: true },
    { path: "/actors/edit/:id", component: EditActor, exact: true, isAdmin: true },   
    { path: "/movietheaters", component: IndexMovieTheaters, exact: true, isAdmin: true },
    { path: "/movietheaters/create", component: CreateMovieTheater, exact: true, isAdmin: true },
    { path: "/movietheaters/edit/:id", component: EditMovieTheater, exact: true, isAdmin: true },
    { path: "/movies/filter", component: FilterMovies, exact: true },
    { path: "/movies/create", component: CreateMovie, exact: true, isAdmin: true },
    { path: "/movies/edit/:id", component: EditMovie, exact: true, isAdmin: true },
    { path: "/movies/details/:id", component: MovieDetails, exact: true },
    { path: "/users", component: IndexUsers, exact: true, isAdmin: true },
    { path: "/register", component: Register, exact: true },
    { path: "/login", component: Login, exact: true },
    { path: "*", component: RedirectToHome}
];

export default routes;