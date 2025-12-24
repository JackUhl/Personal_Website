import { IEditExperienceItemsComponent } from "./IEditExperienceItemsComponent";
import EditForm from "../../../../components/EditForm/EditForm";
import { InputType } from "../../../../models/enums/InputType";
import { DefaultExperienceItem, ExperienceItemKeys } from "../../../../models/objects/ResumeItems";
import { AddableType } from "../../../../models/enums/AddableType";

export default function EditExperienceItemsComponent(props: IEditExperienceItemsComponent) {
    return (
        <EditForm
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
            forms={props.experienceItems}
            addable={AddableType.unshift}
            defaultForm={DefaultExperienceItem}
            removable
            onChange={props.updateExperienceItems}
        />
    )
}