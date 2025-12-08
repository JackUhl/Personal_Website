import { ExperienceItem } from "../../../../models/objects/ResumeItems";

export interface IEditExperienceItemComponent {
    experienceItem: ExperienceItem
    updateExperienceItem: (updatedExperienceItem: ExperienceItem) => void;
}