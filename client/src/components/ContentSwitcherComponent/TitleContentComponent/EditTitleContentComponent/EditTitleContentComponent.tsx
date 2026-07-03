import { InputType } from "../../../../models/enums/InputType"
import { BlogContent } from "../../../../models/objects/BlogItem"
import EditFormComponent from "../../../EditFormComponent/EditFormComponent"
import { IDisplayTitleContentComponentKeys } from "../DisplayTitleContentComponent/IDisplayTitleContentComponent"
import IEditTitleContentComponent from "./IEditTitleContentComponent"

export default function EditTitleComponentComponent(props: IEditTitleContentComponent) {
    return (
        <EditFormComponent
            fields={[
                {
                    label: "Title",
                    propertyName: IDisplayTitleContentComponentKeys.title,
                    type: InputType.Text
                }
            ]}
            formValues={props.content}
            onChange={(updateTitleContent) => {
                props.updateBlogContent(updateTitleContent as BlogContent)
            }}
        />
    )
}