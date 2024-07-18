import { useEffect, useState } from "react";

export default function Pagination(props: paginationProps) {

    const [linkModels, setLinkModels] = useState<linkModel[]>([]);

    function selectPage(link: linkModel){
        if(link.page === props.currentPage){
            return;
        }
        if(!link.enabled){
            return;
        }
        props.onChange(link.page);
    }

    function getClass(link: linkModel){
        // return link.active ? "active" : link.enabled ? "pointer" : "disabled";
        if(link.active){
            return "active pointer";
        }

        if(!link.enabled){
            return "disabled";
        }

        return "pointer";
    }

    useEffect(() => {
        const previousPageEnabled = props.currentPage !== 1;
        const previousPage = props.currentPage - 1;
        const links: linkModel[] = [];

        links.push({ page: previousPage, text: "Previous", enabled: previousPageEnabled, active: false });

        for (let i = 1; i <= props.totalAmountOfPages; i++) {
            if(i >= props.currentPage - props.radio && i <= props.currentPage + props.radio){
                links.push({ page: i, text: `${i}`, enabled: true, active: props.currentPage === i });
            }
        }

        const nextPageEnabled = props.currentPage !== props.totalAmountOfPages && props.totalAmountOfPages > 0;
        const nextPage = props.currentPage + 1;

        links.push({ page: nextPage, text: "Next", enabled: nextPageEnabled, active: false });

        setLinkModels(links);
    }, [props.currentPage, props.totalAmountOfPages, props.radio]);

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {linkModels.map(link => (
                    <li key={link.text} 
                        className={`page-item cursor ${getClass(link)}`} 
                        onClick={()=> selectPage(link)}>
                        <span className="page-link">{link.text}</span>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

interface linkModel{
    page: number;
    text: string;
    enabled: boolean;
    active: boolean;
}

interface paginationProps {
    onChange(page: number): void;
    currentPage: number;
    totalAmountOfPages: number;
    radio: number;
}

Pagination.defaultProps = {
    radio: 3
}