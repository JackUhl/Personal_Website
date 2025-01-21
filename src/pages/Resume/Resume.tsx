import { useContext } from "react";
import { Months } from "../../models/enums/months"
import { ResumeItem } from "../../models/objects/ResumeItem"
import { bulletPoint, bulletPointConnector, companyName, desktopContainer, divider, mobileContainer, resumeStyling, sectionTitle } from "./Resume.module.css"
import { IsMobileContext } from "../../contexts/IsMobileContext";
import { alignItemsCenter, flexRow } from "../../styling/shared.module.css";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";

export default function Resume() {
    const resumeItems: ResumeItem[] = [
        {
            company: "Total Quality Logistics",
            start: new Date(2023, 5, 1),
            position: "Software Developer",
            location: "Cincinnati, OH"
        },
        {
            company: "Bowling Green State University",
            start: new Date(2022, 7, 1),
            end: new Date(2022, 11, 1),
            position: "Learning Assistant",
            location: "Bowling Green, OH"
        },
    ]
    
    const isMobile = useContext(IsMobileContext);

    const renderDate = (date?: Date) => {
        return (date ? Months[date.getMonth()] + " " + date.getFullYear() : "Present")
    }

    return (
        <div className={resumeStyling}>
            <div className={isMobile ? mobileContainer : desktopContainer}>
                <p className={sectionTitle}>Work Experience</p>
                {resumeItems.map((resumeItem, index) => 
                    <div>
                        <div key={index} className={ClassnameJoiner.join([flexRow, alignItemsCenter])}>
                            <div className={bulletPoint}/>
                            <div>
                                <p><span className={companyName}>{resumeItem.company},</span> <span>{resumeItem.location}</span></p>
                                <p>{renderDate(resumeItem.start)} - {renderDate(resumeItem.end)} <span className={divider}>|</span> {resumeItem.position}</p>
                            </div>
                        </div>
                        {index != resumeItems.length - 1 && <div className={bulletPointConnector}/>}
                    </div>
                )}
            </div>
        </div>
    )
}