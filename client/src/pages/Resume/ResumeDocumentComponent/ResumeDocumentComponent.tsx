import DisplayResumeDocumentComponent from "./DisplayResumeDocumentComponent/DisplayResumeDocumentComponent";
import EditResumeDocumentComponent from "./EditResumeDocumentComponent/EditResumeDocumentComponent";
import IResumeDocumentComponent from "./IResumeDocumentComponent";

export default function ResumeDocumentComponent(props: IResumeDocumentComponent) {
    return (
        <>
            {props.editMode ? <EditResumeDocumentComponent resumeDocument={props.resumeDocument} updateResumeDocument={props.updateResumeDocument} /> : <DisplayResumeDocumentComponent resumeDocument={props.resumeDocument} />}
        </>
    );
}