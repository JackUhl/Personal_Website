import { useContext } from "react";
import { desktopResumeContainer, mobileResumeContainer, sectionTitle, skillItemIcon, technicalSectionMargin } from "./Resume.module.css"
import { IsMobileContext } from "../../contexts/IsMobileContext";
import { alignItemsCenter, flexGap, flexRow, flexWrap, justifyContentCenter } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import ResumeItemComponent from "../../components/ResumeItemComponent/ResumeItemComponent";
import { resumeItems } from "../../services/ResumeService";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import resume from "../../assets/docs/ResumePage.pdf"
import RevealComponent from "../../components/RevealComponent/RevealComponent";

export default function Resume() {
    const isMobile = useContext(IsMobileContext);

    const response = resumeItems;

    return (
        <div className={isMobile ? mobileResumeContainer : desktopResumeContainer}>
            <RevealComponent timeoutInterval={100}>
                <p className={sectionTitle}>Work Experience</p>
                {response?.workExperiences.map((workExperienceItem, index) =>
                    <ResumeItemComponent
                        key={index}
                        experienceItem={workExperienceItem}
                        lastItem={index == response.workExperiences.length - 1}
                        expanded={true}
                    />
                )}
                <p className={sectionTitle}>Education</p>
                {response?.educationExperiences.map((educationExperinceItem, index) =>
                    <ResumeItemComponent
                        key={index}
                        experienceItem={educationExperinceItem}
                        lastItem={index == response.educationExperiences.length - 1}
                        expanded={true}
                    />
                )}
                <p className={sectionTitle}>Technical Skills</p>
                <div className={classNameJoin([flexRow, alignItemsCenter, flexGap, flexWrap, technicalSectionMargin])}>
                    {response?.technicalSkills.map((skillItem, index) =>
                        <div className={classNameJoin([flexRow, alignItemsCenter])} key={index}>
                            <img src={skillItem.icon} className={skillItemIcon} />
                            <p>{skillItem.name}</p>
                        </div>
                    )}
                </div>
                <div className={classNameJoin([flexRow, justifyContentCenter])}>
                    <ButtonComponent 
                        buttonElement={<p>View as PDF</p>}
                        href={resume}
                        openInNewTab={true}
                    />
                </div>
            </RevealComponent>
        </div>
    )
}