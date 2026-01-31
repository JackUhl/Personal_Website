import { TechnicalSkillItem } from "../../../../models/objects/ResumeItems";

export default interface IEditTechnicalSkillsComponent {
    technicalSkills: TechnicalSkillItem[];
    updateTechnicalSkills: (updatedTechnicalSkillItems: TechnicalSkillItem[]) => void;
}