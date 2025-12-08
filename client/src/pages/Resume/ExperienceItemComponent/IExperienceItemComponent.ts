import { ExperienceItem } from "../../../models/objects/ResumeItems";

export default interface IExperienceItemComponent {
    editMode: boolean;
    experienceItem: ExperienceItem;
    lastItem: boolean;
    updateExperienceItem: (updatedExperienceItem: ExperienceItem) => void;
    addExperienceItem?: () => void;
    removeExperienceItem?: () => void;
}