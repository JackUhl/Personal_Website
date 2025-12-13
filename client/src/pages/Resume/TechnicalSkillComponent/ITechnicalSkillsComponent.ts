import { TechnicalSkillItem } from "../../../models/objects/ResumeItems";

export default interface ITechnicalSkillsComponent {
    editMode: boolean;
    technicalSkills: TechnicalSkillItem[];
    updateTechnicalSkills: (updatedTechnicalSkillItems: TechnicalSkillItem[]) => void;
}