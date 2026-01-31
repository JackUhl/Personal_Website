import { ExperienceItem } from "../../../../models/objects/ResumeItems";

export interface IEditExperienceItemsComponent {
    experienceItems: ExperienceItem[]
    updateExperienceItems: (updatedExperienceItems: ExperienceItem[]) => void;
}