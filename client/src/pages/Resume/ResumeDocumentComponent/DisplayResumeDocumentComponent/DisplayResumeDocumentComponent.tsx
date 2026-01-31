import HrefButtonComponent from "../../../../components/HrefButtonComponent/HrefButtonComponent";
import { alignItemsCenter, flexRow, justifyContentCenter } from "../../../../styling/shared.module.css";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import { createPdfUrl } from "../../../../utilities/helpers/Encoding";
import IDisplayResumeDocumentComponent from "./IDisplayResumeDocumentComponent";

export default function DisplayResumeDocumentComponent(props: IDisplayResumeDocumentComponent) {
    return (
        <div className={classNameJoin([flexRow, justifyContentCenter, alignItemsCenter])}>
            <HrefButtonComponent
                href={createPdfUrl(props.resumeDocument.data)}
                openInNewTab={true}
            >
                <p>View as PDF</p>
            </HrefButtonComponent>
        </div>
    );
}