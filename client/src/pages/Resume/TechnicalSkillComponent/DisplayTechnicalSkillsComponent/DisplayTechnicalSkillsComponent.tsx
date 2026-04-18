import { UploadService } from "../../../../services/UploadService";
import { alignItemsCenter, flexGap, flexRow, flexWrap } from "../../../../styling/shared.module.css";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import { skillItemIcon, technicalSectionMargin } from "./DisplayTechnicalSkillsComponent.module.css";
import { IDisplayTechnicalSkillsComponent } from "./IDisplayTechnicalSkillsComponent";

export default function DisplayTechnicalSkillsComponent(props: IDisplayTechnicalSkillsComponent) {
    return (
        <div className={classNameJoin([flexRow, alignItemsCenter, flexGap, flexWrap, technicalSectionMargin])}>
            {props.technicalSkills.map((technicalSkill, index) => (
                <div
                    key={index}
                    className={classNameJoin([flexRow, alignItemsCenter])}
                >
                    <img src={UploadService.GetFile(technicalSkill.icon)} className={skillItemIcon} />
                    <p>{technicalSkill.name}</p>
                </div>
            ))}
        </div>
    )
}