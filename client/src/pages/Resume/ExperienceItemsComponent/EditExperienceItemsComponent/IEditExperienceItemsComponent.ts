import { ExperienceItem } from "../../../../models/objects/ResumeItems";

export interface IEditExperienceItemsComponent {
    experienceItems: ExperienceItem[]
    updateExperienceItem: (updatedExperienceItem: ExperienceItem[]) => void;
}