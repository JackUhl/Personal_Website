import IEditResumeDocumentComponent from "./IEditResumeDocumentComponent";
import EditFormComponent from "../../../../components/EditFormComponent/EditFormComponent";
import { ResumeDocumentKeys } from "../../../../models/objects/ResumeItems";
import { InputType } from "../../../../models/enums/InputType";
import { MongoItemKeys } from "../../../../models/objects/MongoItem";

export default function EditResumeDocumentComponent(props: IEditResumeDocumentComponent) {    
    return (
        <EditFormComponent 
            fields={[
                {
                    propertyName: ResumeDocumentKeys.Data,
                    type: InputType.PdfFile
                }
            ]}
            forms={[props.resumeDocument]}
            idPropertyName={MongoItemKeys._Id}
            onChange={(updatedResumeDocuments) => props.updateResumeDocument(updatedResumeDocuments[0])}      
        />
    );
}