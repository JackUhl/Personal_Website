import { ExperienceItem } from "../../../../models/objects/ResumeItems";

export interface IEditExperienceItemComponent {
    experienceItems: ExperienceItem[]
    updateExperienceItem: (updatedExperienceItem: ExperienceItem[]) => void;
}