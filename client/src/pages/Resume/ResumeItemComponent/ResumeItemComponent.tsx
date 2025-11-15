import { bulletPoint, bulletPointConnector, mainText, divider, description, resumeItem, expander, rotateExpanded, rotateCollapsed, resumeItemTitle, bulletPointEnd } from "./ResumeItemComponent.module.css"
import IResumeItemComponent from "./IResumeItemComponent"
import arrowIcon from "../../../assets/svg/arrow.svg"
import { useState } from "react"
import { classNameJoin } from "../../../utilities/helpers/ClassnameJoiner";
import { alignItemsCenter, flexColumn, flexRow, inlineFlexRow } from "../../../styling/shared.module.css";
import RevealComponent from "../../../components/RevealComponent/RevealComponent";
import { renderPartialDate } from "../../../utilities/helpers/DateRenderer";

export default function ResumeItemComponent(props: IResumeItemComponent) {
    const [expanded, setExpanded] = useState(true);
    const [firstRender, setFirstRender] = useState(true);

    const handleClick = () => {
        setExpanded(!expanded);

        if(firstRender) {
            setFirstRender(false);
        }
    };
    
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
                    <img className={classNameJoin([expander, expanded ? rotateExpanded : rotateCollapsed])} src={arrowIcon}/>
                </div>
                {expanded && (
                    <RevealComponent noReveal={firstRender}>
                        {props.experienceItem.description.map((descriptionItem, index) => (
                            <p key={index} className={classNameJoin([description])}>
                                {descriptionItem}
                            </p>
                        ))}
                    </RevealComponent>
                )}
            </div>
        </div>
    )
}