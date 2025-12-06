import { useState } from "react";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import { description, divider, expander, mainText, resumeItem, resumeItemTitle, rotateCollapsed, rotateExpanded } from "./DisplayResumeItemComponent.module.css";
import { IDisplayResumeItemComponent } from "./IDisplayResumeItemComponent";
import { inlineFlexRow } from "../../../../styling/shared.module.css";
import RevealComponent from "../../../../components/RevealComponent/RevealComponent";
import { renderPartialDate } from "../../../../utilities/helpers/DateRenderer";
import arrowIcon from "../../../../assets/svg/arrow.svg"

export default function DisplayResumeItemComponent(props: IDisplayResumeItemComponent) {
    const [expanded, setExpanded] = useState(true);
    const [firstRender, setFirstRender] = useState(true);

    const handleClick = () => {
        setExpanded(!expanded);

        if (firstRender) {
            setFirstRender(false);
        }
    };

    return (
        <div className={resumeItem}>
            <div className={classNameJoin([inlineFlexRow, resumeItemTitle])} onClick={handleClick}>
                <div>
                    <p><span className={mainText}>{props.educationExperience.mainText},</span> <span>{props.educationExperience.subText}</span></p>
                    <p>{props.educationExperience.position && <span>{props.educationExperience.position}<span className={divider}> | </span></span>}{renderPartialDate(new Date(props.educationExperience.start))} - {props.educationExperience.end ? renderPartialDate(new Date(props.educationExperience.end)) : "Present"}</p>
                </div>
                <img className={classNameJoin([expander, expanded ? rotateExpanded : rotateCollapsed])} src={arrowIcon} />
            </div>
            {expanded && (
                <RevealComponent noReveal={firstRender}>
                    {props.educationExperience.description.map((descriptionItem, index) => (
                        <p key={index} className={classNameJoin([description])}>
                            {descriptionItem}
                        </p>
                    ))}
                </RevealComponent>
            )}
        </div>
    )
}