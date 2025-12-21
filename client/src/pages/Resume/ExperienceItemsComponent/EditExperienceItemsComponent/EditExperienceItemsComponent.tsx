import { IEditExperienceItemsComponent } from "./IEditExperienceItemsComponent";
import EditForm from "../../../../components/EditForm/EditForm";
import { InputType } from "../../../../models/enums/InputType";
import { ExperienceItemKeys } from "../../../../models/objects/ResumeItems";
import { AddableType } from "../../../../components/EditForm/IEditForm";

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
            ]}
            forms={props.experienceItems}
            addable={AddableType.unshift}
            onChange={props.updateExperienceItems}
        />
    )
}