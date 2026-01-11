import EditFormComponent from "../../../../components/EditFormComponent/EditFormComponent";
import { InputType } from "../../../../models/enums/InputType";
import { BlogContent } from "../../../../models/objects/BlogItem";
import { IDisplayMervContentComponentKeys } from "../DisplayMervContentComponent/IDisplayMervContentComponent";
import { IEditMervContentComponent } from "./IEditMervContentComponent";

export default function EditMervContentComponent(props: IEditMervContentComponent) {
    return (
        <EditFormComponent
            fields={[
                {
                    label: "Text",
                    propertyName: IDisplayMervContentComponentKeys.Text,
                    type: InputType.TextArea
                }
            ]}
            forms={[props.content]}
            onChange={(updatedMervContent) => {
                props.updateBlogContent(updatedMervContent[0] as BlogContent)
            }}
        />
    )
}