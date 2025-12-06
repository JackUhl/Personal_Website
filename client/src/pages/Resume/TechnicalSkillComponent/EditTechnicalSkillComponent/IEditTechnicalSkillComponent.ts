import { TechnicalSkillItem } from "../../../../models/objects/ResumeItems";

export default interface IEditTechnicalSkillComponent {
    technicalSkill: TechnicalSkillItem;
    setResumeItems: (updatedTechnicalSkillItem: TechnicalSkillItem) => void;
}