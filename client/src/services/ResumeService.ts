import { ResumeItems } from "../models/objects/ResumeItems";
import html5Icon from "../assets/svg/html5.svg";
import css3Icon from "../assets/svg/css3.svg";
import javaScriptIcon from "../assets/svg/javaScript.svg";
import typeScriptIcon from "../assets/svg/typeScript.svg";
import angularIcon from "../assets/svg/angular.svg";
import reactIcon from "../assets/svg/react.svg";
import cSharpIcon from "../assets/svg/cSharp.svg";
import cPlusPlusIcon from "../assets/svg/cPlusPlus.svg";
import sqlIcon from "../assets/svg/sql.svg";
import gitIcon from "../assets/svg/git.svg";
import launchDarklyIcon from "../assets/svg/launchDarkly.svg";
import awsIcon from "../assets/svg/aws.svg";
import azureIcon from "../assets/svg/azure.svg";
import unityIcon from "../assets/svg/unity.svg";

export const resumeItems: ResumeItems = {
    workExperiences: [
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
    ],
    educationExperiences: [
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
    ],
    technicalSkills: [
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
}

export class ResumeService {
    public static GetResume() {
        return new Promise<ResumeItems>((resolve) => {
            setTimeout(() => {
                resolve(resumeItems);
            }, 2000)
        })
    }
}