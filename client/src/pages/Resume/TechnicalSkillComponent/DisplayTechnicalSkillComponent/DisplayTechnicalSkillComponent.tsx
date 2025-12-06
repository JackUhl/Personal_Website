import { alignItemsCenter, flexRow } from "../../../../styling/shared.module.css";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import { encodeSvg } from "../../../../utilities/helpers/Encoding";
import { skillItemIcon } from "./DisplayTechnicalSkillComponent.module.css";
import { IDisplayTechnicalSkillComponent } from "./IDisplayTechnicalSkillComponent";

export default function DisplayTechnicalSkillComponent(props: IDisplayTechnicalSkillComponent) {
    return (
        <div className={classNameJoin([flexRow, alignItemsCenter])}>
            <img src={encodeSvg(props.technicalSkill.icon)} className={skillItemIcon} />
            <p>{props.technicalSkill.name}</p>
        </div>
    )
}