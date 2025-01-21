import { useContext } from "react";
import { Months } from "../../models/enums/months"
import { ResumeItem } from "../../models/objects/ResumeItem"
import { bulletPoint, bulletPointConnector, companyName, desktopContainer, divider, mobileContainer, resumeStyling, sectionTitle } from "./Resume.module.css"
import { IsMobileContext } from "../../contexts/IsMobileContext";
import { alignItemsCenter, flexRow } from "../../styling/shared.module.css";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";

export default function Resume() {
    const workExperienceItems: ResumeItem[] = [
        {
            mainText: "Total Quality Logistics",
            subText: "Cincinnati, OH",
            start: new Date(2023, 5, 1),
            position: "Software Developer",
        },
        {
            mainText: "Bowling Green State University",
            subText: "Bowling Green, OH",
            start: new Date(2022, 7, 1),
            end: new Date(2022, 11, 1),
            position: "Learning Assistant"
        },
    ]

    const educationItems: ResumeItem[] = [
        {
            mainText: "Bachelor of Science in Computer Science",
            subText: "Bowling Green State University",
            start: new Date(2020, 7, 1),
            end: new Date(2023, 11, 1),
            position: "Student"
        },
        {
            mainText: "Application Development and Programming",
            subText: "Delaware Area Career Center",
            start: new Date(2018, 7, 1),
            end: new Date(2020, 4, 1),
            position: "Student"
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
                {workExperienceItems.map((workExperienceItem, index) => 
                    <div>
                        <div key={index} className={ClassnameJoiner.join([flexRow, alignItemsCenter])}>
                            <div className={bulletPoint}/>
                            <div>
                                <p><span className={companyName}>{workExperienceItem.mainText},</span> <span>{workExperienceItem.subText}</span></p>
                                <p>{renderDate(workExperienceItem.start)} - {renderDate(workExperienceItem.end)} <span className={divider}>|</span> {workExperienceItem.position}</p>
                            </div>
                        </div>
                        {index != workExperienceItems.length - 1 && <div className={bulletPointConnector}/>}
                    </div>
                )}
                <p className={sectionTitle}>Education</p>
                {educationItems.map((educationItem, index) => 
                    <div>
                        <div key={index} className={ClassnameJoiner.join([flexRow, alignItemsCenter])}>
                            <div className={bulletPoint}/>
                            <div>
                                <p><span className={companyName}>{educationItem.mainText},</span> <span>{educationItem.subText}</span></p>
                                <p>{renderDate(educationItem.start)} - {renderDate(educationItem.end)} <span className={divider}>|</span> {educationItem.position}</p>
                            </div>
                        </div>
                        {index != workExperienceItems.length - 1 && <div className={bulletPointConnector}/>}
                    </div>
                )}
            </div>
        </div>
    )
}