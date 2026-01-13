import EditFormComponent from "../../../../components/EditFormComponent/EditFormComponent";
import { InputType } from "../../../../models/enums/InputType";
import { BlogContent } from "../../../../models/objects/BlogItem";
import { flexRow, justifyContentCenter, spacing, icon } from "../../../../styling/shared.module.css";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import OnClickButtonComponent from "../../../OnClickButtonComponent/OnButtonButtonComponent";
import RemovableEditFormItem from "../../../RemovableEditFormItem/RemovableEditFormItem";
import { defaultResource, IDisplayResourcesContentComponentKeys, ResourceKeys } from "../DisplayResourcesContentComponent/IDisplayResourcesContentComponent";
import IEditResourcesContentComponent from "./IEditResourcesContentComponent";
import plusSvg from "../../../../assets/svg/plus.svg"

export default function EditResourcesContentComponent(props: IEditResourcesContentComponent) {
    const handleAddResource = () => {
        const updatedResources = props.content;
        updatedResources[IDisplayResourcesContentComponentKeys.Resources].push(defaultResource);
        props.updateBlogContent(updatedResources);
    }
    
    const handleDeleteResource = (index: number) => {
        const updatedResources = props.content;
        updatedResources[IDisplayResourcesContentComponentKeys.Resources].splice(index, 1);
        props.updateBlogContent(updatedResources);
    }

    return (
        <>
            {props.content[IDisplayResourcesContentComponentKeys.Resources].map((resource, index) => (
                <RemovableEditFormItem
                    key={index}
                    onClick={() => handleDeleteResource(index)}
                >
                    <EditFormComponent
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
                        formValues={resource}
                        onChange={(updatedResource) => {
                            const updatedContent = {...props.content};
                            updatedContent[IDisplayResourcesContentComponentKeys.Resources][index] = updatedResource
                            props.updateBlogContent(updatedContent as BlogContent)
                        }}
                    />
                </RemovableEditFormItem>
            ))}
            <div className={classNameJoin([flexRow, justifyContentCenter, spacing])}>
                <OnClickButtonComponent
                    onClick={() => handleAddResource()}
                >
                    <div className={classNameJoin([flexRow])}>
                        <img src={plusSvg} className={icon} />
                    </div>
                </OnClickButtonComponent>
            </div>
        </>
    )
}