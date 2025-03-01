import { filterButtonContainer, selected } from "./FilterButtonComponent.module.css";
import { IFilterButtonComponent } from "./IFilterButtonComponent";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";

export default function FilterButtonComponent(props: IFilterButtonComponent) {
    const filterButtonSelected = props.selectedBlogTags.includes(props.title);
    
    const toggleFilterButton = () => {
        let selectedTags = [...props.selectedBlogTags]
        if(!filterButtonSelected) {
            selectedTags.push(props.title);
            props.setSelectedBlogTags(selectedTags);
        } 
        else {
            let unselectedTagIndex = selectedTags.findIndex((newTag) => newTag == props.title);
            selectedTags.splice(unselectedTagIndex, 1);
            props.setSelectedBlogTags(selectedTags);
        }
    }

    return (
        <div className={ClassnameJoiner.join([filterButtonContainer, filterButtonSelected ? selected : ""])} onClick={toggleFilterButton}>
            <p>{props.title}</p>
        </div>
    )
}