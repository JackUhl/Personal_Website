import EditFormComponent from "../../../../components/EditFormComponent/EditFormComponent";
import { InputType } from "../../../../models/enums/InputType";
import { BlogContent } from "../../../../models/objects/BlogItem";
import { IDisplayTextContentComponentKeys } from "../DisplayTextContentComponent/IDisplayTextContentComponent";
import IEditTextContentComponent from "./IEditTextContentComponent";

export default function EditTextContentComponent(props: IEditTextContentComponent) {
    return (
        <EditFormComponent
            fields={[
                {
                    label: "Content",
                    propertyName: IDisplayTextContentComponentKeys.Content,
                    type: InputType.TextArea
                }
            ]}
            formValues={props.content}
            onChange={(updatedTextContent) => {
                props.updateBlogContent(updatedTextContent as BlogContent)
            }}
        />
    )
}