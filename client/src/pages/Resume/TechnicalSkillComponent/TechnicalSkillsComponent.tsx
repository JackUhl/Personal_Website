import DisplayTechnicalSkillsComponent from "./DisplayTechnicalSkillsComponent/DisplayTechnicalSkillComponent";
import EditTechnicalSkillsComponent from "./EditTechnicalSkillsComponent/EditTechnicalSkillsComponent";
import ITechnicalSkillsComponent from "./ITechnicalSkillsComponent";

export default function TechnicalSkillsComponent(props: ITechnicalSkillsComponent) {
    return (
        <>
            {props.editMode ? <EditTechnicalSkillsComponent technicalSkills={props.technicalSkills} updateTechnicalSkills={props.updateTechnicalSkills} /> : <DisplayTechnicalSkillsComponent technicalSkills={props.technicalSkills} />}
        </>
    )
}