import { ResumeDocument } from "../../../../models/objects/ResumeItems";

export default interface IEditResumeDocumentComponent {
    resumeDocument: ResumeDocument;
    updateResumeDocument: (updatedResumeDocument: ResumeDocument) => void;
}