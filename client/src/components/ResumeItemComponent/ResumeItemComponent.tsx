import { bulletPoint, bulletPointConnector, mainText, divider, description, resumeItem, expander, rotateExpanded, rotateCollapsed, resumeItemTitle, descriptionHidden, bulletPointEnd } from "./ResumeItemComponent.module.css"
import { alignItemsCenter, flexColumn, flexRow, inlineFlexRow } from "../../styling/shared.module.css"
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import IResumeItemComponent from "./IResumeItemComponent"
import expanderIcon from "../../assets/svg/expand.svg"
import { useState } from "react"
import { renderPartialDate } from "../../utilities/helpers/DateRenderer";

export default function ResumeItemComponent(props: IResumeItemComponent) {
    const [expanded, setExpanded] = useState(props.expanded);

    const handleClick = () => {
        setExpanded(!expanded);
    }
    
    return (
        <div className={classNameJoin([flexRow])}>
            <div className={classNameJoin([flexColumn, alignItemsCenter])}>
                <div className={bulletPoint}/>
                <div className={bulletPointConnector}/>
                {props.lastItem && <div className={bulletPointEnd}></div>}
            </div>
            <div className={resumeItem}>
                <div className={classNameJoin([inlineFlexRow, resumeItemTitle])} onClick={handleClick}>
                    <div>
                        <p><span className={mainText}>{props.experienceItem.mainText},</span> <span>{props.experienceItem.subText}</span></p>
                        <p>{props.experienceItem.position && <span>{props.experienceItem.position}<span className={divider}> | </span></span>}{renderPartialDate(new Date(props.experienceItem.start))} - {props.experienceItem.end ? renderPartialDate(new Date(props.experienceItem.end)) : "Present"}</p>
                    </div>
                    <img className={classNameJoin([expander, expanded ? rotateExpanded : rotateCollapsed])} src={expanderIcon}/>
                </div>
                <p className={classNameJoin([description, !expanded ? descriptionHidden : ""])}>{props.experienceItem.description}</p>
            </div>
        </div>
    )
}