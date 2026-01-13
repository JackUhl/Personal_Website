import { IEditExperienceItemsComponent } from "./IEditExperienceItemsComponent";
import EditFormComponent from "../../../../components/EditFormComponent/EditFormComponent";
import { InputType } from "../../../../models/enums/InputType";
import { DefaultExperienceItem, ExperienceItemKeys } from "../../../../models/objects/ResumeItems";
import { MongoItemKeys } from "../../../../models/objects/MongoItem";
import RemovableEditFormItem from "../../../../components/RemovableEditFormItem/RemovableEditFormItem";
import OnClickButtonComponent from "../../../../components/OnClickButtonComponent/OnButtonButtonComponent";
import { flexRow, justifyContentCenter, icon, spacing } from "../../../../styling/shared.module.css";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import plusSvg from "../../../../assets/svg/plus.svg";

export default function EditExperienceItemsComponent(props: IEditExperienceItemsComponent) {
    const handleAddExperienceItem = () => {
        const updatedExperienceItems = [...props.experienceItems];
        updatedExperienceItems.unshift(DefaultExperienceItem);
        props.updateExperienceItems(updatedExperienceItems);
    }

    const handleRemoveExperienceItem = (index: number) => {
        const updatedExperienceItems = [...props.experienceItems];
        updatedExperienceItems.splice(index, 1);
        props.updateExperienceItems(updatedExperienceItems);
    }

    return (
        <>
            <div className={classNameJoin([flexRow, justifyContentCenter, spacing])}>
                <OnClickButtonComponent
                    onClick={() => handleAddExperienceItem()}
                >
                    <div className={classNameJoin([flexRow])}>
                        <img src={plusSvg} className={icon} />
                    </div>
                </OnClickButtonComponent>
            </div>
            {props.experienceItems.map((experienceItem, index) => (
                <RemovableEditFormItem
                    key={experienceItem[MongoItemKeys._Id]}
                    onClick={() => handleRemoveExperienceItem(index)}
                >
                    <EditFormComponent
                        fields={[
                            {
                                label: "Main Text",
                                propertyName: ExperienceItemKeys.MainText,
                                type: InputType.Text,
                            },
                            {
                                label: "Sub Text",
                                propertyName: ExperienceItemKeys.SubText,
                                type: InputType.Text,
                            },
                            {
                                label: "Position",
                                propertyName: ExperienceItemKeys.Position,
                                type: InputType.Text,
                            },
                            {
                                label: "Start Date",
                                propertyName: ExperienceItemKeys.Start,
                                type: InputType.Date,
                            },
                            {
                                label: "End Date",
                                propertyName: ExperienceItemKeys.End,
                                type: InputType.Date,
                            },
                            {
                                label: "Description",
                                propertyName: ExperienceItemKeys.Description,
                                type: InputType.TextArea
                            }
                        ]}
                        formValues={experienceItem}
                        onChange={(updatedExperienceItem) => {
                            const updatedExperienceItems = [...props.experienceItems];
                            updatedExperienceItems[index] = updatedExperienceItem;
                            props.updateExperienceItems(updatedExperienceItems);
                        }}
                    />
                </RemovableEditFormItem>
            ))}
        </>
    )
}