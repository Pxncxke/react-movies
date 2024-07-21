import { actorCreationDto } from "../actors/actors.model";
import { movieCreationDto, movieDto } from "../movies/movies.model";

export function convertActorToFormData(actor: actorCreationDto): FormData {
    const formData = new FormData();
    formData.append('name', actor.name);

    if(actor.id){
        formData.append('id', actor.id.toString());
    }
    if(actor.biography){
        formData.append('biography', actor.biography);
    }
    if(actor.dateOfBirth){
        // formData.append('dateOfBirth', actor.dateOfBirth.toISOString());
        formData.append('dateOfBirth', formatDate(actor.dateOfBirth));
    }
    if(actor.picture){
        formData.append('picture', actor.picture);
    }
    if(actor.pictureUrl){
        formData.append('pictureUrl', actor.pictureUrl);
    }

    return formData;
}

export function convertMovieToFormData(movie: movieCreationDto){
    const formData = new FormData();

    if(movie.id){
        formData.append('id', movie.id);
    }

    formData.append('title', movie.title);

    if(movie.summary){
        formData.append('summary', movie.summary);
    }

    formData.append('inTheaters', String(movie.inTheaters));
    formData.append('trailer', movie.trailer);
    if(movie.releaseDate){
        // formData.append('releaseDate', movie.releaseDate.toISOString());
        formData.append('releaseDate', formatDate(movie.releaseDate));
    }
    if(movie.poster){
        formData.append('poster', movie.poster);
    }
    if(movie.posterURL){
        formData.append('posterURL', movie.posterURL);
    }
    if(movie.genresIds){
        movie.genresIds.forEach(id => {
            formData.append('genresIds', id);
        });
    }
    if(movie.movieTheatersIds){
        movie.movieTheatersIds.forEach(id => {
            formData.append('movieTheatersIds', id);
        });
    }
    if(movie.actors){
        // movie.actors.forEach(actor => {
        //     formData.append('actors', JSON.stringify({id:actor.id, character: actor.character}));
        // });
        // var jsonBlob = new Blob([JSON.stringify(movie.actors)], { type: 'application/json' });

        // formData.append('actors', jsonBlob, 'data.json');


        // console.log(movie.actors);
        // console.log(JSON.stringify(movie.actors));
        formData.append('actors', JSON.stringify(movie.actors));
    }
    return formData;

}

// export function convertMovieUpdateToFormData(movie: movieDto){
//     const formData = new FormData();
//     formData.append('title', movie.title);

//     if(movie.summary){
//         formData.append('summary', movie.summary);
//     }

//     formData.append('inTheaters', String(movie.inTheaters));
//     formData.append('trailer', movie.trailer);
//     if(movie.releaseDate){
//         // formData.append('releaseDate', movie.releaseDate.toISOString());
//         formData.append('releaseDate', formatDate(movie.releaseDate));
//     }
//     if(movie.poster){
//         formData.append('poster', movie.poster);
//     }
//     if(movie.poster){
//         formData.append('posterURL', movie.poster);
//     }
//     if(movie.genres){
//         // movie.genresIds.forEach(id => {
//         //     formData.append('genresIds', id);
//         // });
//         formData.append('actors', JSON.stringify(movie.genres));
//     }
//     if(movie.moviesTheaters){
//         // movie.movieTheatersIds.forEach(id => {
//         //     formData.append('movieTheatersIds', id);
//         // });
//         formData.append('actors', JSON.stringify(movie.actors));
//     }
//     if(movie.actors){
//         // movie.actors.forEach(actor => {
//         //     formData.append('actors', JSON.stringify({id:actor.id, character: actor.character}));
//         // });
//         // var jsonBlob = new Blob([JSON.stringify(movie.actors)], { type: 'application/json' });

//         // formData.append('actors', jsonBlob, 'data.json');


//         // console.log(movie.actors);
//         // console.log(JSON.stringify(movie.actors));
//         formData.append('actors', JSON.stringify(movie.actors));
//     }
//     return formData;

// }


function formatDate(date: Date){
    date = new Date(date);
    const format = new Intl.DateTimeFormat('en', {year: 'numeric', month: '2-digit', day: '2-digit'});
    const[{value: month},,{value: day},,{value: year}] = format.formatToParts(date);
    return `${year}-${month}-${day}`;
}