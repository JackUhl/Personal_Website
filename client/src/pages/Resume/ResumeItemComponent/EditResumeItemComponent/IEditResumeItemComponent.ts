import { ExperienceItem } from "../../../../models/objects/ResumeItems";

export interface IEditResumeItemComponent {
    experienceItem: ExperienceItem
    setResumeItems: (updatedExperienceItem: ExperienceItem) => void;
}