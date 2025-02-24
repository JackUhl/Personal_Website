import { useState } from "react"
import { Months } from "../../models/enums/Months"
import { bulletPoint, bulletPointConnector, mainText, divider, description, resumeItem, expander, rotateExpanded, rotateCollapsed, resumeItemTitle } from "./ResumeItemComponent.module.css"
import { alignItemsCenter, flexColumn, flexRow } from "../../styling/shared.module.css"
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner"
import IResumeItemComponent from "./IResumeItemComponent"
import expanderIcon from "../../assets/svg/expand.svg"
import DateRenderer from "../../utilities/helpers/DateRenderer"

export default function ResumeItemComponent(props: IResumeItemComponent) {
    const [expanded, setExpanded] = useState(true);

    const renderDate = (date?: Date) => {
        return (date ? DateRenderer.renderPartialDate(date) : "Present")
    }

    const handleResumeItemClick = () => {
        setExpanded(!expanded);
    }
    
    return (
        <div className={ClassnameJoiner.join([flexRow])}>
            <div className={ClassnameJoiner.join([flexColumn, alignItemsCenter])}>
                <div className={bulletPoint}/>
                {!props.lastItem && <div className={bulletPointConnector}/>}
            </div>
            <div className={resumeItem}>
                <div className={ClassnameJoiner.join([flexRow, resumeItemTitle])} onClick={handleResumeItemClick}>
                    <div>
                        <p><span className={mainText}>{props.resumeItem.mainText},</span> <span>{props.resumeItem.subText}</span></p>
                        <p>{renderDate(props.resumeItem.start)} - {renderDate(props.resumeItem.end)}{props.resumeItem.position && <span><span className={divider}> | </span>{props.resumeItem.position}</span>}</p>
                    </div>
                    <img className={ClassnameJoiner.join([expander, expanded ? rotateExpanded : rotateCollapsed])} src={expanderIcon}/>
                </div>
                {expanded && <p className={description}>{props.resumeItem.description}</p>}
            </div>
        </div>
    )
}