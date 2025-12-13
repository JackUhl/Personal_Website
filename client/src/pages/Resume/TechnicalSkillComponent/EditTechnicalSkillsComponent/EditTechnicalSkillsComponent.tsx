import { ChangeEvent } from "react";
import FileUploadComponent from "../../../../components/FileUploadComponent/FileUploadComponent";
import TextInputComponent from "../../../../components/InputComponents/TextInputComponent/TextInputComponent";
import { alignItemsCenter, flexRow, justifyContentCenter } from "../../../../styling/shared.module.css";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import { encodeSvg } from "../../../../utilities/helpers/Encoding";
import { closeIcon, closeIconSpacing, container, plusIcon, skillItemIcon, technicalSectionMargin } from "./EditTechnicalSkillsComponent.module.css";
import IEditTechnicalSkillsComponent from "./IEditTechnicalSkillComponent";
import OnClickButtonComponent from "../../../../components/OnClickButtonComponent/OnButtonButtonComponent";
import closeSvg from "../../../../assets/svg/close.svg"
import plusSvg from "../../../../assets/svg/plus.svg"

export default function EditTechnicalSkillsComponent(props: IEditTechnicalSkillsComponent) {
    const handleIconChange = async (event: ChangeEvent<HTMLInputElement>, index: number) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const fileReader = new FileReader();

            fileReader.onload = (progressEvent) => {
                const newTechnicalSkills = [...props.technicalSkills];
                newTechnicalSkills[index].icon = progressEvent.target?.result?.toString() ?? "error"

                props.updateTechnicalSkills(newTechnicalSkills);
            }

            fileReader.readAsText(file);
        }
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const newTechnicalSkills = [...props.technicalSkills];
        newTechnicalSkills[index].name = event.target.value;

        props.updateTechnicalSkills(newTechnicalSkills);
    }

    const handleDeleteTechnicalSkill = (index: number) => {
        const newTechnicalSkills = [...props.technicalSkills]
        newTechnicalSkills.splice(index, 1);

        props.updateTechnicalSkills(newTechnicalSkills)
    }

    const handleAddTechnicalSkill = () => {
        const newTechnicalSkills = [...props.technicalSkills];
        newTechnicalSkills.push({
            icon: "",
            name: ""
        });

        props.updateTechnicalSkills(newTechnicalSkills)
    }

    return (
        <div className={technicalSectionMargin}>
            {props.technicalSkills.map((technicalSkill, index) => (
                <div
                    key={index}
                    className={classNameJoin([flexRow, alignItemsCenter, container])}
                >
                    <FileUploadComponent
                        onChange={(event) => handleIconChange(event, index)}
                        fileExtension=".svg"
                    >
                        <img
                            src={encodeSvg(technicalSkill.icon)}
                            className={skillItemIcon}
                        />
                    </FileUploadComponent>
                    <TextInputComponent
                        required={true}
                        value={technicalSkill.name}
                        onChange={(event) => handleNameChange(event, index)}
                    />
                    <div className={closeIconSpacing}>
                        <OnClickButtonComponent
                            buttonElement={
                                <div className={classNameJoin([flexRow])}>
                                    <img src={closeSvg} className={closeIcon} />
                                </div>
                            }
                            onClick={() => handleDeleteTechnicalSkill(index)}
                        />
                    </div>
                </div>
            ))}
            <div className={classNameJoin([flexRow, justifyContentCenter, alignItemsCenter])}>
                <OnClickButtonComponent
                    buttonElement={
                        <div className={classNameJoin([flexRow])}>
                            <img src={plusSvg} className={plusIcon} />
                        </div>
                    }
                    onClick={handleAddTechnicalSkill}
                />
            </div>
        </div>
    )
}