import { Months } from "../../models/enums/Months"
import { bulletPoint, bulletPointConnector, mainText, divider, description } from "../../pages/Resume/Resume.module.css"
import { alignItemsCenter, flexColumn, flexRow } from "../../styling/shared.module.css"
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner"
import IResumeItemComponent from "./IResumeItemComponent"

export default function ResumeItemComponent(props: IResumeItemComponent) {
    const renderDate = (date?: Date) => {
        return (date ? Months[date.getMonth()] + " " + date.getFullYear() : "Present")
    }
    
    return (
        <div className={ClassnameJoiner.join([flexRow])}>
            <div className={ClassnameJoiner.join([flexColumn, alignItemsCenter])}>
                <div className={bulletPoint}/>
                {!props.lastItem && <div className={bulletPointConnector}/>}
            </div>
            <div>
                <p><span className={mainText}>{props.resumeItem.mainText},</span> <span>{props.resumeItem.subText}</span></p>
                <p>{renderDate(props.resumeItem.start)} - {renderDate(props.resumeItem.end)}{props.resumeItem.position && <span><span className={divider}> | </span>{props.resumeItem.position}</span>}</p>
                <p className={description}>{props.resumeItem.description}</p>
            </div>
        </div>
    )
}