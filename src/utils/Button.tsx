export default function Button(props: buttonProps){
    return(
        <button className="btn btn-primary" onClick={props.onClick}>
            {props.text}
        </button>
    )
}

interface buttonProps{
    text: React.ReactNode;
    onClick(): void;
}