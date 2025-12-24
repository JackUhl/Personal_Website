import IEditTechnicalSkillsComponent from "./IEditTechnicalSkillComponent";
import EditForm from "../../../../components/EditForm/EditForm";
import { DefaultTechnicalSkillItem, TechnicalSkillKeys } from "../../../../models/objects/ResumeItems";
import { InputType } from "../../../../models/enums/InputType";
import { AddableType } from "../../../../models/enums/AddableType";

export default function EditTechnicalSkillsComponent(props: IEditTechnicalSkillsComponent) {
    return (
        <EditForm
            fields={[
                {
                    propertyName: TechnicalSkillKeys.Icon,
                    type: InputType.SvgFile
                },
                {
                    label: "Name",
                    propertyName: TechnicalSkillKeys.Name,
                    type: InputType.Text
                }
            ]}
            forms={props.technicalSkills}
            addable={AddableType.push}
            defaultForm={DefaultTechnicalSkillItem}
            removable
            onChange={props.updateTechnicalSkills}
        />
    )
}