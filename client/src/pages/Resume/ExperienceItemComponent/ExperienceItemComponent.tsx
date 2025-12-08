import { bulletPoint, bulletPointConnector, bulletPointEnd } from "./ExperienceItemComponent.module.css"
import { classNameJoin } from "../../../utilities/helpers/ClassnameJoiner";
import { alignItemsCenter, flexColumn, flexRow } from "../../../styling/shared.module.css";
import IExperienceItemComponent from "./IExperienceItemComponent";
import EditExperienceItemComponent from "./EditExperienceItemComponent/EditExperienceItemComponent";
import DisplayExperienceItemComponent from "./DisplayExperienceItemComponent/DisplayExperienceItemComponent";

export default function ExperienceItemComponent(props: IExperienceItemComponent) {
    return (
        <div className={classNameJoin([flexRow])}>
            <div className={classNameJoin([flexColumn, alignItemsCenter])}>
                <div className={bulletPoint} />
                <div className={bulletPointConnector} />
                {props.lastItem && <div className={bulletPointEnd}></div>}
            </div>
            {props.editMode ? <EditExperienceItemComponent experienceItem={props.experienceItem} updateExperienceItem={props.updateExperienceItem} /> : <DisplayExperienceItemComponent experienceItem={props.experienceItem} />}
        </div>
    )
}