import { useEffect, useState } from "react";
import { filterButtonContainer, selected } from "./FilterButtonComponent.module.css";
import { IFilterButtonComponent } from "./IFilterButtonComponent";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";

export default function FilterButtonComponent(props: IFilterButtonComponent) {
    const [buttonSelected, setButtonSelected] = useState(false);

    const handleClick = () => {
        setButtonSelected(!buttonSelected);
    }

    useEffect(() => {
        let selectedTags = [...props.selectedBlogTags]
        if(buttonSelected) {
            selectedTags.push(props.title);
            props.setSelectedBlogTags(selectedTags);
        } 
        else {
            let unselectedTagIndex = selectedTags.findIndex((newTag) => newTag == props.title);
            selectedTags.splice(unselectedTagIndex, 1);
            props.setSelectedBlogTags(selectedTags);
        }
    }, [buttonSelected])

    return (
        <div className={ClassnameJoiner.join([filterButtonContainer, buttonSelected ? selected : ""])} onClick={handleClick}>
            <p>{props.title}</p>
        </div>
    )
}