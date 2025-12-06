import { TechnicalSkillItem } from "../../../models/objects/ResumeItems";

export default interface ITechnicalSkillComponent {
    editMode: boolean;
    technicalSkill: TechnicalSkillItem;
    setResumeItems: (updatedTechnicalSkillItem: TechnicalSkillItem) => void;
}