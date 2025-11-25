import { ExperienceItem } from "../../../models/objects/ResumeItems";

export default interface IResumeItemComponent {
    editMode: boolean;
    experienceItem: ExperienceItem;
    lastItem: boolean;
}