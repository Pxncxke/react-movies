export default function Button(props: buttonProps){
    return(
        <button disabled={props.disabled} type={props.type} 
        className={props.className} onClick={props.onClick}>
            {props.text}
        </button>
    )
}

interface buttonProps{
    text: React.ReactNode;
    onClick?(): void;
    type: "button" | "submit";
    disabled: boolean;
    className?: string;
}

Button.defaultProps = {
    type: "button",
    disabled: false,
    className: "btn btn-primary"
}