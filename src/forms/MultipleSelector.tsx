import './MultipleSelector.css'

export default function MultipleSelector(props: multipleSelectorProps) {

    function selectAll() {
        const selected = [...props.selected, ...props.nonSelected];
        const nonSelected : multipleSelectorModel[] = [];
        props.onChange(selected, nonSelected);
    }

    function unselectAll() {
        const nonSelected = [...props.nonSelected, ...props.selected];
        const selected : multipleSelectorModel[] = [];
        props.onChange(selected, nonSelected);
    }

    return (
       <div className="mb-3">
            <label>{props.label}</label>    
            <div className="multiple-selector">
                <ul className="non-selected">
                    {props.nonSelected.map(item => (
                        <li key={item.id} onClick={() => {
                           
                            props.onChange([...props.selected, item], props.nonSelected.filter(x => x.id !== item.id));
                        }}>
                            {item.value}
                        </li>
                    ))}
                    </ul>
                    <div className="multiple-selector-buttons">
                    <button type="button" onClick={selectAll}>{'>>'}</button>
                    <button type="button" onClick={unselectAll}>{'<<'}</button>
                    </div>
                    <ul className="selected">
                    {props.selected.map(item => (
                        <li key={item.id} onClick={() => {
                            
                            props.onChange(props.selected.filter(x => x.id !== item.id), [...props.nonSelected, item]);
                        }}>
                            {item.value}
                        </li>
                    ))}
                </ul>
            </div>
       </div>
    )
}

interface multipleSelectorProps {
    label : string;
    selected: multipleSelectorModel[];
    nonSelected: multipleSelectorModel[];
    onChange(selected: multipleSelectorModel[], nonSelected: multipleSelectorModel[]): void;
}


export interface multipleSelectorModel {
    id: string;
    value: string;
}