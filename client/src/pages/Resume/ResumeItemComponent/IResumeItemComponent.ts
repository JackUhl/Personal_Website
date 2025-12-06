import { ExperienceItem } from "../../../models/objects/ResumeItems";

export default interface IResumeItemComponent {
    editMode: boolean;
    educationExperience: ExperienceItem;
    lastItem: boolean;
    setResumeItems: (updatedExperienceItem: ExperienceItem) => void;
}