import HrefButtonComponent from "../../../../components/HrefButtonComponent/HrefButtonComponent";
import { UploadService } from "../../../../services/UploadService";
import { alignItemsCenter, flexRow, justifyContentCenter } from "../../../../styling/shared.module.css";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import IDisplayResumeDocumentComponent from "./IDisplayResumeDocumentComponent";

export default function DisplayResumeDocumentComponent(props: IDisplayResumeDocumentComponent) {
    return (
        <div className={classNameJoin([flexRow, justifyContentCenter, alignItemsCenter])}>
            <HrefButtonComponent
                href={UploadService.GetFile(props.resumeDocument.data)}
                openInNewTab={true}
            >
                <p>View as PDF</p>
            </HrefButtonComponent>
        </div>
    );
}