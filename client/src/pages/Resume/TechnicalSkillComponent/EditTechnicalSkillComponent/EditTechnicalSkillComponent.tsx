import { ChangeEvent } from "react";
import FileUploadComponent from "../../../../components/FileUploadComponent/FileUploadComponent";
import TextInputComponent from "../../../../components/InputComponents/TextInputComponent/TextInputComponent";
import { alignItemsCenter, flexRow } from "../../../../styling/shared.module.css";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import { encodeSvg } from "../../../../utilities/helpers/Encoding";
import { skillItemIcon } from "./EditTechnicalSkillComponent.module.css";
import IEditTechnicalSkillComponent from "./IEditTechnicalSkillComponent";

export default function EditTechnicalSkillComponent(props: IEditTechnicalSkillComponent) {
    const handleIconChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files) {
            const file = event.target.files[0];
            const fileReader = new FileReader();
            
            fileReader.onload = (progressEvent) => {
                props.setResumeItems({
                    ...props.technicalSkill,
                    icon: progressEvent.target?.result?.toString() ?? "error"
                });
            }

            fileReader.readAsText(file);
        }
    }
    
    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setResumeItems({
            ...props.technicalSkill,
            name: event.target.value
        })
    }
    
    return (
        <div className={classNameJoin([flexRow, alignItemsCenter])}>
            <FileUploadComponent 
                onChange={handleIconChange}
                fileExtension=".svg"
            >
                <img
                    src={encodeSvg(props.technicalSkill.icon)}
                    className={skillItemIcon}
                />
            </FileUploadComponent>
            <TextInputComponent
                required={true}
                value={props.technicalSkill.name}
                onChange={handleNameChange}
            />
        </div>
    )
}