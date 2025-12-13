import IExperienceItemComponent from "./IExperienceItemComponent";
import EditExperienceItemComponent from "./EditExperienceItemComponent/EditExperienceItemComponent";
import DisplayExperienceItemComponent from "./DisplayExperienceItemComponent/DisplayExperienceItemComponent";

export default function ExperienceItemComponent(props: IExperienceItemComponent) {
    return (
        <>
            {props.editMode ? <EditExperienceItemComponent experienceItems={props.experienceItems} updateExperienceItem={props.updateExperienceItems}/> : <DisplayExperienceItemComponent experienceItems={props.experienceItems} />}
        </>
    )
}