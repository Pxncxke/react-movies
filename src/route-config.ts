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

const routes = [
    { path: "/", component: Home, exact: true },
    { path: "/genres", component: IndexGenres, exact: true },
    { path: "/genres/create", component: CreateGenre, exact: true },
    { path: "/genres/edit/:id", component: EditGenre, exact: true },
    { path: "/actors", component: IndexActors, exact: true },
    { path: "/actors/create", component: CreateActor, exact: true },
    { path: "/actors/edit/:id", component: EditActor, exact: true },   
    { path: "/movietheaters", component: IndexMovieTheaters, exact: true },
    { path: "/movietheaters/create", component: CreateMovieTheater, exact: true },
    { path: "/movietheaters/edit/:id", component: EditMovieTheater, exact: true },
    { path: "/movies/filter", component: FilterMovies, exact: true },
    { path: "/movies/create", component: CreateMovie, exact: true },
    { path: "/movies/edit/:id", component: EditMovie, exact: true },
    { path: "*", component: RedirectToHome}
];

export default routes;