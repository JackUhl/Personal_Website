import { useContext } from "react";
import { ResumeItem } from "../../models/objects/ResumeItem"
import { desktopContainer, mobileContainer, resumeStyling, sectionTitle, skillItemIcon, skillItemName } from "./Resume.module.css"
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
import awsIcon from "../../assets/svg/aws.svg";
import azureIcon from "../../assets/svg/azure.svg";
import unityIcon from "../../assets/svg/unity.svg";
import ResumeItemComponent from "../../components/ResumeItemComponent/ResumeItemComponent";

export default function Resume() {
    const workExperienceItems: ResumeItem[] = [
        {
            mainText: "Total Quality Logistics",
            subText: "Cincinnati, OH",
            start: new Date(2023, 5, 1),
            position: "Software Developer",
            description: "Began as an intern and transitioned to a full-time software developer. I am responsible for developing and maintaining both internal and external applications as a full-stack developer. Notable projects include a financial system provider swap, the redesign of an outdated user management system, and a comprehensive company-wide modernization initiative."
        },
        {
            mainText: "Bowling Green State University",
            subText: "Bowling Green, OH",
            start: new Date(2022, 7, 1),
            end: new Date(2022, 11, 1),
            position: "Learning Assistant",
            description: "Responsible for supporting both students and the instructor in the programming fundamentals class, assisting with weekly study sessions to review material and provide guidance on programming assignments."
        },
    ]

    const educationItems: ResumeItem[] = [
        {
            mainText: "Bachelor of Science in Computer Science",
            subText: "Bowling Green State University",
            start: new Date(2020, 7, 1),
            end: new Date(2023, 11, 1),
            description: "Completed a range of technical courses in IT, including C++ development, computer networking, and database management, while maintaining a 4.0 GPA and being inducted into the Phi Beta Kappa academic honors society."
        },
        {
            mainText: "Application Development and Programming",
            subText: "Delaware Area Career Center",
            start: new Date(2018, 7, 1),
            end: new Date(2020, 4, 1),
            description: "Completed courses on web design and game development with Unity, while gaining proficiency in programming fundamentals using JavaScript and C#."
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
            name: "C# / .NET"
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
        {
            icon: awsIcon,
            name: "Amazon Web Services"
        },
        {
            icon: azureIcon,
            name: "Microsoft Azure"
        },
        {
            icon: unityIcon,
            name: "Unity"
        }
    ]

    const isMobile = useContext(IsMobileContext);

    return (
        <div className={resumeStyling}>
            <div className={isMobile ? mobileContainer : desktopContainer}>
                <p className={sectionTitle}>Work Experience</p>
                {workExperienceItems.map((workExperienceItem, index) =>
                    <ResumeItemComponent
                        key={index}
                        resumeItem={workExperienceItem}
                        lastItem={index == workExperienceItems.length - 1}
                    />
                )}
                <p className={sectionTitle}>Education</p>
                {educationItems.map((educationItem, index) =>
                    <ResumeItemComponent
                        key={index}
                        resumeItem={educationItem}
                        lastItem={index == workExperienceItems.length - 1}
                    />
                )}
                <p className={sectionTitle}>Technical Skills</p>
                <div className={ClassnameJoiner.join([flexRow, alignItemsCenter, flexGap, flexWrap])}>
                    {technicalSkillItems.map((skillItem, index) =>
                        <div className={ClassnameJoiner.join([flexRow, alignItemsCenter])} key={index}>
                            <img src={skillItem.icon} className={skillItemIcon} />
                            <p className={skillItemName}>{skillItem.name}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}