import { useRef, useState } from "react";

import arrowIcon from "../../../../../assets/svg/arrow.svg"
import RevealComponent from "../../../../../components/RevealComponent/RevealComponent";
import { ExperienceItem, ExperienceItemKeys } from "../../../../../models/objects/ResumeItems";
import { alignItemsCenter, flexColumn, flexRow, inlineFlexRow } from "../../../../../styling/shared.module.css";
import { classNameJoin } from "../../../../../utilities/helpers/ClassnameJoiner/ClassnameJoiner";
import { renderPartialDate } from "../../../../../utilities/helpers/DateRenderer/DateRenderer";
import { bulletPoint, bulletPointConnector, bulletPointEnd, description, divider, expander, mainText, resumeItem, resumeItemClickable, resumeItemTitle, rotateCollapsed, rotateExpanded } from "./ExperienceItemComponent.module.css";

interface IExperienceItemComponent {
    experienceItem: ExperienceItem;
    isLastItem: boolean;
}

export default function ExperienceItemComponent(props: IExperienceItemComponent) {
    const [expanded, setExpanded] = useState(true);
    const hasInteracted = useRef(false);
    const descriptionItemsExist = props.experienceItem[ExperienceItemKeys.Description].length > 0;

    const handleClick = () => {
        setExpanded(!expanded);
        hasInteracted.current = true;
    };

    return (
        <div className={flexRow}>
            <div className={classNameJoin([flexColumn, alignItemsCenter])}>
                <div className={bulletPoint} />
                <div className={bulletPointConnector} />
                {props.isLastItem && <div className={bulletPointEnd} />}
            </div>
            <div className={classNameJoin([flexColumn, resumeItem])}>
                <div className={classNameJoin([inlineFlexRow, resumeItemTitle, descriptionItemsExist ? resumeItemClickable : ""])} onClick={descriptionItemsExist ? handleClick : undefined} data-testid="experience-item-expandable">
                    <div>
                        <p><span className={mainText}>{props.experienceItem.mainText},</span> <span>{props.experienceItem.subText}</span></p>
                        <p>{props.experienceItem.position && <span>{props.experienceItem.position}<span className={divider}> | </span></span>}{renderPartialDate(new Date(props.experienceItem.start))} - {props.experienceItem.end ? renderPartialDate(new Date(props.experienceItem.end)) : "Present"}</p>
                    </div>
                    {descriptionItemsExist && <img src={arrowIcon} className={classNameJoin([expander, expanded ? rotateExpanded : rotateCollapsed])} />}
                </div>
                {expanded && (
                    <RevealComponent noReveal={!hasInteracted.current}>
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