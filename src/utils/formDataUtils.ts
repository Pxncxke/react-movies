import { actorCreationDto } from "../actors/actors.model";

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

function formatDate(date: Date){
    date = new Date(date);
    const format = new Intl.DateTimeFormat('en', {year: 'numeric', month: '2-digit', day: '2-digit'});
    const[{value: month},,{value: day},,{value: year}] = format.formatToParts(date);
    return `${year}-${month}-${day}`;
}