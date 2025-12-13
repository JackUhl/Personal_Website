import { ExperienceItem } from "../../../models/objects/ResumeItems";

export default interface IExperienceItemComponent {
    editMode: boolean;
    experienceItems: ExperienceItem[];
    updateExperienceItems: (updatedExperienceItems: ExperienceItem[]) => void
}