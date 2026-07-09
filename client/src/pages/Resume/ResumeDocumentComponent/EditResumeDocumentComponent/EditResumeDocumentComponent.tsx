import EditFormComponent from "../../../../components/EditFormComponent/EditFormComponent";
import { InputType } from "../../../../models/enums/InputType";
import { ResumeDocumentKeys } from "../../../../models/objects/ResumeItems";
import IEditResumeDocumentComponent from "./IEditResumeDocumentComponent";

export default function EditResumeDocumentComponent(props: IEditResumeDocumentComponent) {    
    return (
        <EditFormComponent 
            fields={[
                {
                    label: "Resume Document",
                    propertyName: ResumeDocumentKeys.Data,
                    type: InputType.PdfFile
                }
            ]}
            formValues={props.resumeDocument}
            onChange={(updatedResumeDocuments) => props.updateResumeDocument(updatedResumeDocuments)}      
        />
    );
}