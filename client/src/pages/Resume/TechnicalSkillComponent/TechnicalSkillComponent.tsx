import DisplayTechnicalSkillComponent from "./DisplayTechnicalSkillComponent/DisplayTechnicalSkillComponent";
import EditTechnicalSkillComponent from "./EditTechnicalSkillComponent/EditTechnicalSkillComponent";
import ITechnicalSkillComponent from "./ITechnicalSkillComponent";

export default function TechnicalSkillComponent(props: ITechnicalSkillComponent) {
    return (
        <>
            { props.editMode ? <EditTechnicalSkillComponent technicalSkill={props.technicalSkill} setResumeItems={props.setResumeItems}/> : <DisplayTechnicalSkillComponent technicalSkill={props.technicalSkill} /> }
        </>
    )
}