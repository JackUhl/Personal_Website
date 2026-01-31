import IEditResumeDocumentComponent from "./IEditResumeDocumentComponent";
import EditFormComponent from "../../../../components/EditFormComponent/EditFormComponent";
import { ResumeDocumentKeys } from "../../../../models/objects/ResumeItems";
import { InputType } from "../../../../models/enums/InputType";

export default function EditResumeDocumentComponent(props: IEditResumeDocumentComponent) {    
    return (
        <EditFormComponent 
            fields={[
                {
                    propertyName: ResumeDocumentKeys.Data,
                    type: InputType.PdfFile
                }
            ]}
            formValues={props.resumeDocument}
            onChange={(updatedResumeDocuments) => props.updateResumeDocument(updatedResumeDocuments)}      
        />
    );
}