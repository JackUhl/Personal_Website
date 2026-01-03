import EditForm from "../../../../components/EditForm/EditForm";
import { AddableType } from "../../../../models/enums/AddableType";
import { BlogContentType } from "../../../../models/enums/BlogContentType";
import { InputType } from "../../../../models/enums/InputType";
import { BlogContent, ContentKeys, ResourcesContent } from "../../../../models/objects/BlogItem";
import { defaultResource, IDisplayResourcesContentComponentKeys, ResourceKeys } from "../DisplayResourcesContentComponent/IDisplayResourcesContentComponent";
import IEditResourcesContentComponent from "./IEditResourcesContentComponent";

export default function EditResourcesContentComponent(props: IEditResourcesContentComponent) {
    return (
        <EditForm
            fields={[
                {
                    label: "Resource",
                    propertyName: ResourceKeys.Resource,
                    type: InputType.Text
                },
                {
                    label: "Link",
                    propertyName: ResourceKeys.Link,
                    type: InputType.Text
                }
            ]}
            forms={props.content[IDisplayResourcesContentComponentKeys.Resources]}
            defaultForm={defaultResource}
            addable={AddableType.push}
            removable
            onChange={(updatedResources) => {
                const updatedResourceContent: ResourcesContent = {
                    [ContentKeys.Type]: BlogContentType.resources,
                    [IDisplayResourcesContentComponentKeys.Resources]: updatedResources
                }
                props.updateBlogContent(updatedResourceContent as BlogContent)
            }}
        />
    )
}