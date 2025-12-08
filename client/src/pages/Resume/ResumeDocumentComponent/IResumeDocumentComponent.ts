import { ResumeDocument } from "../../../models/objects/ResumeItems";

export default interface IResumeDocumentComponent {
    editMode: boolean;
    resumeDocument: ResumeDocument;
    updateResumeDocument: (updatedResumeDocument: ResumeDocument) => void;
}