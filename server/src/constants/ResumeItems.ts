import fs from 'fs'
import path from 'path'

const readSvg = (fileName: string): string => {
    return fs.readFileSync(path.posix.join(__dirname, "..", "src", "assets", "svg", fileName), 'utf8')
}

export const resumeItems = {
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
            icon: readSvg('html5.svg'),
            name: "HTML 5"
        },
        {
            icon: readSvg('css3.svg'),
            name: "CSS 3"
        },
        {
            icon: readSvg('javaScript.svg'),
            name: "JavaScript"
        },
        {
            icon: readSvg('typeScript.svg'),
            name: "TypeScript"
        },
        {
            icon: readSvg('angular.svg'),
            name: "Angular"
        },
        {
            icon: readSvg('react.svg'),
            name: "React"
        },
        {
            icon: readSvg('cSharp.svg'),
            name: "C# / .NET"
        },
        {
            icon: readSvg('cPlusPlus.svg'),
            name: "C++"
        },
        {
            icon: readSvg('sql.svg'),
            name: "SQL"
        },
        {
            icon: readSvg('git.svg'),
            name: "Git"
        },
        {
            icon: readSvg('launchDarkly.svg'),
            name: "Launch Darkly"
        },
        {
            icon: readSvg('aws.svg'),
            name: "Amazon Web Services"
        },
        {
            icon: readSvg('azure.svg'),
            name: "Microsoft Azure"
        },
        {
            icon: readSvg('unity.svg'),
            name: "Unity"
        }
    ]
}