import IEditTechnicalSkillsComponent from "./IEditTechnicalSkillComponent";
import EditFormComponent from "../../../../components/EditFormComponent/EditFormComponent";
import { DefaultTechnicalSkillItem, TechnicalSkillKeys } from "../../../../models/objects/ResumeItems";
import { InputType } from "../../../../models/enums/InputType";
import { MongoItemKeys } from "../../../../models/objects/MongoItem";
import { flexRow, icon, justifyContentCenter, spacing } from "../../../../styling/shared.module.css";
import OnClickButtonComponent from "../../../../components/OnClickButtonComponent/OnButtonButtonComponent";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import plusSvg from "../../../../assets/svg/plus.svg"
import RemovableEditFormItem from "../../../../components/RemovableEditFormItem/RemovableEditFormItem";

export default function EditTechnicalSkillsComponent(props: IEditTechnicalSkillsComponent) {
    const handleAddTechnicalSkill = () => {
        const updatedTechnicalSkills = [...props.technicalSkills];
        updatedTechnicalSkills.push(DefaultTechnicalSkillItem);
        props.updateTechnicalSkills(updatedTechnicalSkills);
    }

    const handleRemoveTechnicalSkill = (index: number) => {
        const updatedTechnicalSkills = [...props.technicalSkills];
        updatedTechnicalSkills.splice(index, 1);
        props.updateTechnicalSkills(updatedTechnicalSkills);
    }

    return (
        <>
            {props.technicalSkills.map((technicalSkill, index) => (
                <RemovableEditFormItem
                    key={technicalSkill[MongoItemKeys._Id]}
                    onClick={() => handleRemoveTechnicalSkill(index)}
                >
                    <EditFormComponent
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
                        formValues={technicalSkill}
                        onChange={(updatedTechnicalSkill) => {
                            const updatedTechnicalSkills = [...props.technicalSkills];
                            updatedTechnicalSkills[index] = updatedTechnicalSkill;
                            props.updateTechnicalSkills(updatedTechnicalSkills);
                        }}
                    />
                </RemovableEditFormItem>
            ))}
            <div className={classNameJoin([flexRow, justifyContentCenter, spacing])}>
                <OnClickButtonComponent
                    onClick={() => handleAddTechnicalSkill()}
                >
                    <div className={classNameJoin([flexRow])}>
                        <img src={plusSvg} className={icon} />
                    </div>
                </OnClickButtonComponent>
            </div>
        </>
    )
}