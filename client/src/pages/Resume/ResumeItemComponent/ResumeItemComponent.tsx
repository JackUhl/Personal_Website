import { bulletPoint, bulletPointConnector, bulletPointEnd } from "./ResumeItemComponent.module.css"
import IResumeItemComponent from "./IResumeItemComponent"
import { classNameJoin } from "../../../utilities/helpers/ClassnameJoiner";
import { alignItemsCenter, flexColumn, flexRow } from "../../../styling/shared.module.css";
import EditResumeItemComponent from "./EditResumeItemComponent/EditResumeItemComponent";
import DisplayResumeItemComponent from "./DisplayResumeItemComponent/DisplayResumeItemComponent";

export default function ResumeItemComponent(props: IResumeItemComponent) {
    return (
        <div className={classNameJoin([flexRow])}>
            <div className={classNameJoin([flexColumn, alignItemsCenter])}>
                <div className={bulletPoint} />
                <div className={bulletPointConnector} />
                {props.lastItem && <div className={bulletPointEnd}></div>}
            </div>
            {props.editMode ? <EditResumeItemComponent experienceItem={props.experienceItem} setResumeItems={props.setResumeItems} /> : <DisplayResumeItemComponent experienceItem={props.experienceItem} />}
        </div>
    )
}