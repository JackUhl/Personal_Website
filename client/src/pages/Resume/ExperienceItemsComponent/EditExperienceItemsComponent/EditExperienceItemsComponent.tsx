import { IEditExperienceItemsComponent } from "./IEditExperienceItemsComponent";
import { flexRow } from "../../../../styling/shared.module.css";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import { icon, spacing } from "./EditExperienceItemsComponent.module.css";
import plusSvg from "../../../../assets/svg/plus.svg";
import OnClickButtonComponent from "../../../../components/OnClickButtonComponent/OnButtonButtonComponent";
import EditForm from "../../../../components/EditForm/EditForm";
import { InputType } from "../../../../models/enums/InputType";
import { ExperienceItem } from "../../../../models/objects/ResumeItems";

export default function EditExperienceItemsComponent(props: IEditExperienceItemsComponent) {
    const handleExperienceItemRemove = (index: number) => {
        const newExperienceItems = [...props.experienceItems];
        newExperienceItems.splice(index, 1);

        props.updateExperienceItems(newExperienceItems);
    }

    const handleExperienceItemChange = (formValue: ExperienceItem, index: number) => {
        const newExperienceItems = [...props.experienceItems];
        newExperienceItems[index] = formValue
        props.updateExperienceItems(newExperienceItems);
    }

    const handleExperienceItemAdd = () => {
        const newExperienceItems = [...props.experienceItems];
        newExperienceItems.unshift({
            mainText: "",
            subText: "",
            start: "",
            end: "",
            position: "",
            description: []
        });

        props.updateExperienceItems(newExperienceItems);
    }

    return (
        <>
            <div className={classNameJoin([flexRow, spacing])}>
                <OnClickButtonComponent
                    buttonElement={
                        <div className={classNameJoin([flexRow])}>
                            <img src={plusSvg} className={icon} />
                        </div>
                    }
                    onClick={() => handleExperienceItemAdd()}
                />
            </div>
            {props.experienceItems.map((experienceItem, experienceItemIndex) => (
                <EditForm
                    fields={[
                        {
                            label: "Main Text",
                            value: experienceItem.mainText,
                            propertyName: "mainText",
                            type: InputType.Text,
                        },
                        {
                            label: "Sub Text",
                            value: experienceItem.subText,
                            propertyName: "subText",
                            type: InputType.Text,
                        },
                        {
                            label: "Position",
                            value: experienceItem.position,
                            propertyName: "position",
                            type: InputType.Text,
                        },
                        {
                            label: "Start Date",
                            value: experienceItem.start,
                            propertyName: "start",
                            type: InputType.Date,
                        },
                        {
                            label: "End Date",
                            value: experienceItem.end,
                            propertyName: "end",
                            type: InputType.Date,
                        },
                    ]}
                    formValue={experienceItem}
                    handleDeleteForm={() => handleExperienceItemRemove(experienceItemIndex)}
                    handleChangeForm={(formValue: ExperienceItem) => handleExperienceItemChange(formValue, experienceItemIndex)}
                />
            ))}
        </>
    )
}