import HrefButtonComponent from "../../../../components/HrefButtonComponent/HrefButtonComponent";
import { createPdfUrl } from "../../../../utilities/helpers/Encoding";
import IDisplayResumeDocumentComponent from "./IDisplayResumeDocumentComponent";

export default function DisplayResumeDocumentComponent(props: IDisplayResumeDocumentComponent) {
    return (
        <HrefButtonComponent
            buttonElement={<p>View as PDF</p>}
            href={createPdfUrl(props.resumeDocument.data)}
            openInNewTab={true}
        />
    );
}