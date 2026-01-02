import IEditTechnicalSkillsComponent from "./IEditTechnicalSkillComponent";
import EditForm from "../../../../components/EditForm/EditForm";
import { DefaultTechnicalSkillItem, TechnicalSkillKeys } from "../../../../models/objects/ResumeItems";
import { InputType } from "../../../../models/enums/InputType";
import { AddableType } from "../../../../models/enums/AddableType";
import { MongoItemKeys } from "../../../../models/objects/MongoItem";

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
            idPropertyName={MongoItemKeys._Id}
            addable={AddableType.push}
            defaultForm={DefaultTechnicalSkillItem}
            removable
            onChange={props.updateTechnicalSkills}
        />
    )
}