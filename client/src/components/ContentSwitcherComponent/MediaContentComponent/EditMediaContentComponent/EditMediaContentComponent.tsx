import EditFormComponent from "../../../../components/EditFormComponent/EditFormComponent";
import { InputType } from "../../../../models/enums/InputType";
import { BlogContent } from "../../../../models/objects/BlogItem";
import { IDisplayMediaContentComponentKeys } from "../DisplayMediaContentComponent/IDisplayMediaContentComponent";
import IEditMediaContentComponent from "./IEditMediaContentComponent";

export default function EditMediaContentComponent(props: IEditMediaContentComponent) {
    return (
        <EditFormComponent
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
            formValues={props.content} 
            onChange={(updatedMediaContent) => {
                props.updateBlogContent(updatedMediaContent as BlogContent)
            }}
        />
    )
}