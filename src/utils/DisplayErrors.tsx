export default function DisplayErrors(props: displayErrorsProps){
    return(
        <>
        {props.errors && props.errors.length > 0 &&
            <div className="alert alert-danger">
                <ul>
                    {props.errors.map((error, index) => <li key={index}>{error}</li>)}
                </ul>
            </div>
        }
        </>
    )
}

interface displayErrorsProps{
    errors: string[];
}