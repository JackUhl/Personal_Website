import { useState } from "react";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import { bulletPoint, bulletPointConnector, bulletPointEnd, description, divider, expander, mainText, resumeItem, resumeItemTitle, rotateCollapsed, rotateExpanded } from "./DisplayExperienceItemComponent.module.css";
import { IDisplayExperienceItemsComponent } from "./IDisplayExperienceItemsComponent";
import { alignItemsCenter, flexColumn, flexRow, inlineFlexRow } from "../../../../styling/shared.module.css";
import RevealComponent from "../../../../components/RevealComponent/RevealComponent";
import { renderPartialDate } from "../../../../utilities/helpers/DateRenderer";
import arrowIcon from "../../../../assets/svg/arrow.svg"

export default function DisplayExperienceItemsComponent(props: IDisplayExperienceItemsComponent) {
    const [expanded, setExpanded] = useState<boolean[]>(new Array(props.experienceItems.length).fill(true));
    const [firstRender, setFirstRender] = useState(true);

    const handleClick = (index: number) => {
        const newExpanded = [...expanded];
        newExpanded[index] = !newExpanded[index];
        setExpanded(newExpanded);

        if (firstRender) {
            setFirstRender(false);
        }
    };

    return (
        <>
            {props.experienceItems.map((experienceItem, index) => (
                <div
                    key={index}
                    className={flexRow}
                >
                    <div className={classNameJoin([flexColumn, alignItemsCenter])}>
                        <div className={bulletPoint} />
                        <div className={bulletPointConnector} />
                        {index == props.experienceItems.length - 1 && <div className={bulletPointEnd} />}
                    </div>
                    <div className={classNameJoin([flexColumn, resumeItem])}>
                        <div className={classNameJoin([inlineFlexRow, resumeItemTitle])} onClick={() => handleClick(index)}>
                            <div>
                                <p><span className={mainText}>{experienceItem.mainText},</span> <span>{experienceItem.subText}</span></p>
                                <p>{experienceItem.position && <span>{experienceItem.position}<span className={divider}> | </span></span>}{renderPartialDate(new Date(experienceItem.start))} - {experienceItem.end ? renderPartialDate(new Date(experienceItem.end)) : "Present"}</p>
                            </div>
                            <img src={arrowIcon} className={classNameJoin([expander, expanded[index] ? rotateExpanded : rotateCollapsed])} />
                        </div>
                        {expanded[index] && (
                            <RevealComponent noReveal={firstRender}>
                                {experienceItem.description.map((descriptionItem, index) => (
                                    <p key={index} className={classNameJoin([description])}>
                                        {descriptionItem}
                                    </p>
                                ))}
                            </RevealComponent>
                        )}
                    </div>
                </div>
            ))}
        </>
    )
}