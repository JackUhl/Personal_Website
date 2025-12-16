import { ChangeEvent } from "react";
import HrefButtonComponent from "../../../../components/HrefButtonComponent/HrefButtonComponent";
import { alignItemsCenter, columnGap, flexRow, justifyContentCenter } from "../../../../styling/shared.module.css";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import { createPdfUrl, encodePdf } from "../../../../utilities/helpers/Encoding";
import IEditResumeDocumentComponent from "./IEditResumeDocumentComponent";
import FileUploadComponent from "../../../../components/FileUploadComponent/FileUploadComponent";
import { spacing, uploadButton } from "./EditResumeDocumentComponent.module.css";

export default function EditResumeDocumentComponent(props: IEditResumeDocumentComponent) {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files) {
            const file = event.target.files[0];
            const fileReader = new FileReader();
            
            fileReader.onload = (progressEvent) => {
                const fileContent = progressEvent.target?.result?.toString() ?? "error";
                const base64Content = encodePdf(fileContent);
                
                props.updateResumeDocument({
                    data: base64Content,
                });
            }

            fileReader.readAsDataURL(file);
        }
    }
    
    return (
        <div className={classNameJoin([flexRow, justifyContentCenter, alignItemsCenter, columnGap, spacing])}>
            <HrefButtonComponent
                buttonElement={<p>View as PDF</p>}
                href={createPdfUrl(props.resumeDocument.data)}
                openInNewTab={true}
            />
            <FileUploadComponent
                fileExtension=".pdf"
                onChange={handleFileChange}            
            >
                <p className={uploadButton}>Upload</p>
            </FileUploadComponent>
        </div>
    );
}