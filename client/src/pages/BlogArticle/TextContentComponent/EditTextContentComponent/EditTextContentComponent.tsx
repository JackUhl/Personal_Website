import EditForm from "../../../../components/EditForm/EditForm";
import { InputType } from "../../../../models/enums/InputType";
import { IDisplayTextContentComponentKeys } from "../DisplayTextContentComponent/IDisplayTextContentComponent";
import IEditTextContentComponent from "./IEditTextContentComponent";

export default function EditTextContentComponent(props: IEditTextContentComponent) {
    return (
        <EditForm
            fields={[
                {
                    label: "Content",
                    propertyName: IDisplayTextContentComponentKeys.Content,
                    type: InputType.TextArea
                }
            ]}
            forms={[props.content]}
            onChange={(updatedTextContent) => {
                props.updateBlogItems(updatedTextContent[0])
            }}
        />
    )
}