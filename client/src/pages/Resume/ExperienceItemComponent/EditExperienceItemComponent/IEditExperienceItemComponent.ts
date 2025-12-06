import { ExperienceItem } from "../../../../models/objects/ResumeItems";

export interface IEditExperienceItemComponent {
    experienceItem: ExperienceItem
    setResumeItems: (updatedExperienceItem: ExperienceItem) => void;
}