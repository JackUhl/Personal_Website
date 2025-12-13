import IExperienceItemsComponent from "./IExperienceItemsComponent";
import EditExperienceItemsComponent from "./EditExperienceItemsComponent/EditExperienceItemsComponent";
import DisplayExperienceItemsComponent from "./DisplayExperienceItemsComponent/DisplayExperienceItemsComponent";

export default function ExperienceItemsComponent(props: IExperienceItemsComponent) {
    return (
        <>
            {props.editMode ? <EditExperienceItemsComponent experienceItems={props.experienceItems} updateExperienceItems={props.updateExperienceItems}/> : <DisplayExperienceItemsComponent experienceItems={props.experienceItems} />}
        </>
    )
}