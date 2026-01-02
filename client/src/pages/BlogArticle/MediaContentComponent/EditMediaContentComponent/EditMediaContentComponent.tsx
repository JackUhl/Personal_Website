import EditForm from "../../../../components/EditForm/EditForm";
import { InputType } from "../../../../models/enums/InputType";
import { BlogContent } from "../../../../models/objects/BlogItem";
import { IDisplayMediaContentComponentKeys } from "../DisplayMediaContentComponent/IDisplayMediaContentComponent";
import IEditMediaContentComponent from "./IEditMediaContentComponent";

export default function EditMediaContentComponent(props: IEditMediaContentComponent) {
    return (
        <EditForm
            fields={[
                {
                    label: "Media",
                    propertyName: IDisplayMediaContentComponentKeys.Media,
                    type: InputType.Image
                },
                {
                    label: "Sub Text",
                    propertyName: IDisplayMediaContentComponentKeys.SubText,
                    type: InputType.TextArea
                }
            ]}
            forms={[props.content]} 
            onChange={(updatedMediaContent) => {
                props.updateBlogContent(updatedMediaContent[0] as BlogContent)
            }}
        />
    )
}