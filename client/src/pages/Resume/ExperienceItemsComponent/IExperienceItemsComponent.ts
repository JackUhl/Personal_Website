import { ExperienceItem } from "../../../models/objects/ResumeItems";

export default interface IExperienceItemsComponent {
    editMode: boolean;
    experienceItems: ExperienceItem[];
    updateExperienceItems: (updatedExperienceItems: ExperienceItem[]) => void
}