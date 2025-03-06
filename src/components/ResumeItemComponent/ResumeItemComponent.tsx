import { bulletPoint, bulletPointConnector, mainText, divider, description, resumeItem, expander, rotateExpanded, rotateCollapsed, resumeItemTitle, descriptionHidden, bulletPointEnd } from "./ResumeItemComponent.module.css"
import { alignItemsCenter, flexColumn, flexRow, inlineFlexRow } from "../../styling/shared.module.css"
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner"
import IResumeItemComponent from "./IResumeItemComponent"
import expanderIcon from "../../assets/svg/expand.svg"
import DateRenderer from "../../utilities/helpers/DateRenderer"
import { useState } from "react"

export default function ResumeItemComponent(props: IResumeItemComponent) {
    const [expanded, setExpanded] = useState(props.expanded);
    
    const renderDate = (date?: Date) => {
        return (date ? DateRenderer.renderPartialDate(date) : "Present")
    }

    const handleClick = () => {
        setExpanded(!expanded);
    }
    
    return (
        <div className={ClassnameJoiner.join([flexRow])}>
            <div className={ClassnameJoiner.join([flexColumn, alignItemsCenter])}>
                <div className={bulletPoint}/>
                <div className={bulletPointConnector}/>
                {props.lastItem && <div className={bulletPointEnd}></div>}
            </div>
            <div className={resumeItem}>
                <div className={ClassnameJoiner.join([inlineFlexRow, resumeItemTitle])} onClick={handleClick}>
                    <div>
                        <p><span className={mainText}>{props.experienceItem.mainText},</span> <span>{props.experienceItem.subText}</span></p>
                        <p>{renderDate(props.experienceItem.start)} - {renderDate(props.experienceItem.end)}{props.experienceItem.position && <span><span className={divider}> | </span>{props.experienceItem.position}</span>}</p>
                    </div>
                    <img className={ClassnameJoiner.join([expander, expanded ? rotateExpanded : rotateCollapsed])} src={expanderIcon}/>
                </div>
                <p className={ClassnameJoiner.join([description, !expanded ? descriptionHidden : ""])}>{props.experienceItem.description}</p>
            </div>
        </div>
    )
}