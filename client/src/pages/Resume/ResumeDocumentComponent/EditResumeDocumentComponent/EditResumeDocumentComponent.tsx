import IEditResumeDocumentComponent from "./IEditResumeDocumentComponent";
import EditForm from "../../../../components/EditForm/EditForm";
import { ResumeDocumentKeys } from "../../../../models/objects/ResumeItems";
import { InputType } from "../../../../models/enums/InputType";

export default function EditResumeDocumentComponent(props: IEditResumeDocumentComponent) {    
    return (
        <EditForm 
            fields={[
                {
                    propertyName: ResumeDocumentKeys.Data,
                    type: InputType.PdfFile
                }
            ]}
            forms={[props.resumeDocument]}
            onChange={(updatedResumeDocuments) => props.updateResumeDocument(updatedResumeDocuments[0])}      
        />
    );
}