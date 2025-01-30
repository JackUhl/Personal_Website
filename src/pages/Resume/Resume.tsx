import { useContext } from "react";
import { Months } from "../../models/enums/Months"
import { ResumeItem } from "../../models/objects/ResumeItem"
import { bulletPoint, bulletPointConnector, desktopContainer, divider, mainText, mobileContainer, resumeStyling, section, sectionTitle, skillItemIcon, skillItemName } from "./Resume.module.css"
import { IsMobileContext } from "../../contexts/IsMobileContext";
import { alignItemsCenter, flexGap, flexRow, flexWrap } from "../../styling/shared.module.css";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import { TechnicalSkillItems } from "../../models/objects/TechnicalSkillItem";
import html5Icon from "../../assets/svg/html5.svg";
import css3Icon from "../../assets/svg/css3.svg";
import javaScriptIcon from "../../assets/svg/javaScript.svg";
import typeScriptIcon from "../../assets/svg/typeScript.svg";
import angularIcon from "../../assets/svg/angular.svg";
import reactIcon from "../../assets/svg/react.svg";
import cSharpIcon from "../../assets/svg/cSharp.svg";
import cPlusPlusIcon from "../../assets/svg/cPlusPlus.svg";
import sqlIcon from "../../assets/svg/sql.svg";
import gitIcon from "../../assets/svg/git.svg";
import launchDarklyIcon from "../../assets/svg/launchDarkly.svg";

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
        },
        {
            mainText: "Application Development and Programming",
            subText: "Delaware Area Career Center",
            start: new Date(2018, 7, 1),
            end: new Date(2020, 4, 1),
        },
    ]

    const technicalSkillItems: TechnicalSkillItems[] = [
        {
            icon: html5Icon,
            name: "HTML 5"
        },
        {
            icon: css3Icon,
            name: "CSS 3"
        },
        {
            icon: javaScriptIcon,
            name: "JavaScript"
        },
        {
            icon: typeScriptIcon,
            name: "TypeScript"
        },
        {
            icon: angularIcon,
            name: "Angular"
        },
        {
            icon: reactIcon,
            name: "React"
        },
        {
            icon: cSharpIcon,
            name: "C#"
        },
        {
            icon: cPlusPlusIcon,
            name: "C++"
        },
        {
            icon: sqlIcon,
            name: "SQL"
        },
        {
            icon: gitIcon,
            name: "Git"
        },
        {
            icon: launchDarklyIcon,
            name: "Launch Darkly"
        },
    ]
    
    const isMobile = useContext(IsMobileContext);

    const renderDate = (date?: Date) => {
        return (date ? Months[date.getMonth()] + " " + date.getFullYear() : "Present")
    }

    const renderResumeItem = (resumeItem: ResumeItem, index: number) => {
        return (
            <div>
                <div key={index} className={ClassnameJoiner.join([flexRow, alignItemsCenter])}>
                    <div className={bulletPoint}/>
                    <div>
                        <p><span className={mainText}>{resumeItem.mainText},</span> <span>{resumeItem.subText}</span></p>
                        <p>{renderDate(resumeItem.start)} - {renderDate(resumeItem.end)}{resumeItem.position && <span><span className={divider}> | </span>{resumeItem.position}</span>}</p>
                    </div>
                </div>
                {index != workExperienceItems.length - 1 && <div className={bulletPointConnector}/>}
            </div>
        )
    }

    return (
        <div className={resumeStyling}>
            <div className={isMobile ? mobileContainer : desktopContainer}>
                <div className={section}>
                    <p className={sectionTitle}>Work Experience</p>
                    {workExperienceItems.map((workExperienceItem, index) => 
                        renderResumeItem(workExperienceItem, index)
                    )}
                </div>
                <div className={section}>
                <p className={sectionTitle}>Education</p>
                {educationItems.map((educationItem, index) => 
                    renderResumeItem(educationItem, index)
                )}
                </div>
                <div className={section}>
                    <p className={sectionTitle}>Technical Skills</p>
                    <div className={ClassnameJoiner.join([flexRow, alignItemsCenter, flexGap, flexWrap])}>
                        {technicalSkillItems.map((skillItem) => 
                            <div className={ClassnameJoiner.join([flexRow, alignItemsCenter])}>
                                <img src={skillItem.icon} className={skillItemIcon}/>
                                <p className={skillItemName}>{skillItem.name}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}