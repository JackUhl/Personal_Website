import { useState } from "react"
import { Months } from "../../models/enums/Months"
import { bulletPoint, bulletPointConnector, mainText, divider, description, resumeItem, expander, smallGap, resumeItemComponent, rotateExpanded, rotateCollapsed } from "./ResumeItemComponent.module.css"
import { alignItemsCenter, flexColumn, flexRow } from "../../styling/shared.module.css"
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner"
import IResumeItemComponent from "./IResumeItemComponent"
import expanderIcon from "../../assets/svg/expand.svg"

export default function ResumeItemComponent(props: IResumeItemComponent) {
    const [showDescription, setShowDescription] = useState(false);

    const renderDate = (date?: Date) => {
        return (date ? Months[date.getMonth()] + " " + date.getFullYear() : "Present")
    }

    const handleResumeItemClick = () => {
        setShowDescription(!showDescription);
    }
    
    return (
        <div className={resumeItemComponent}>
            <div className={ClassnameJoiner.join([flexRow])}>
                <div className={ClassnameJoiner.join([flexColumn, alignItemsCenter])}>
                    <div className={bulletPoint}/>
                    {!props.lastItem && <div className={bulletPointConnector}/>}
                </div>
                <div className={resumeItem} onClick={handleResumeItemClick}>
                    <div className={ClassnameJoiner.join([flexRow, smallGap])}>
                        <div>
                            <p><span className={mainText}>{props.resumeItem.mainText},</span> <span>{props.resumeItem.subText}</span></p>
                            <p>{renderDate(props.resumeItem.start)} - {renderDate(props.resumeItem.end)}{props.resumeItem.position && <span><span className={divider}> | </span>{props.resumeItem.position}</span>}</p>
                        </div>
                        <img className={ClassnameJoiner.join([expander, showDescription ? rotateExpanded : rotateCollapsed])} src={expanderIcon}/>
                    </div>
                    {showDescription && <p className={description}>{props.resumeItem.description}</p>}
                </div>
            </div>
        </div>
    )
}