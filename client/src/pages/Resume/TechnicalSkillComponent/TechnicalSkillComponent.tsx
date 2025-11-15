import { alignItemsCenter, flexRow } from "../../../styling/shared.module.css";
import { classNameJoin } from "../../../utilities/helpers/ClassnameJoiner";
import { encodeSvg } from "../../../utilities/helpers/Encoding";
import ITechnicalSkillComponent from "./ITechnicalSkillComponent";
import { skillItemIcon } from "./TechnicalSkillComponent.module.css";

export default function TechnicalSkillComponent(props: ITechnicalSkillComponent) {
    return (
        <div className={classNameJoin([flexRow, alignItemsCenter])}>
            <img src={encodeSvg(props.icon)} className={skillItemIcon} />
            <p>{props.name}</p>
        </div>
    )
}