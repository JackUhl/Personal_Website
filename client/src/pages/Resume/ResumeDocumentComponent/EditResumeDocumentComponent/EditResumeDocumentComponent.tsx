import IEditResumeDocumentComponent from "./IEditResumeDocumentComponent";
import EditForm from "../../../../components/EditForm/EditForm";
import { ResumeDocumentKeys } from "../../../../models/objects/ResumeItems";
import { InputType } from "../../../../models/enums/InputType";
import { MongoItemKeys } from "../../../../models/objects/MongoItem";

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
            idPropertyName={MongoItemKeys._Id}
            onChange={(updatedResumeDocuments) => props.updateResumeDocument(updatedResumeDocuments[0])}      
        />
    );
}