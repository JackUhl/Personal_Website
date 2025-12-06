import { ExperienceItem } from "../../../../models/objects/ResumeItems";

export interface IEditResumeItemComponent {
    educationExperience: ExperienceItem
    setResumeItems: (updatedExperienceItem: ExperienceItem) => void;
}