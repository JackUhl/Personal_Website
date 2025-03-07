import { useContext } from "react";
import { desktopResumeContainer, mobileResumeContainer, sectionTitle, skillItemIcon, technicalSectionMargin } from "./Resume.module.css"
import { IsMobileContext } from "../../contexts/IsMobileContext";
import { alignItemsCenter, flexGap, flexRow, flexWrap, justifyContentCenter } from "../../styling/shared.module.css";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import ResumeItemComponent from "../../components/ResumeItemComponent/ResumeItemComponent";
import { PersonalSiteService } from "../../services/PersonalSiteService";
import { useFetch } from "../../hooks/useFetch";
import { LoadingState } from "../../models/enums/LoadingState";
import { Loading } from "../Loading/Loading";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import resume from "../../assets/docs/ResumePage.pdf"
import RevealComponent from "../../components/RevealComponent/RevealComponent";

export default function Resume() {
    const fetch = useFetch(PersonalSiteService.GetResume());
    const isMobile = useContext(IsMobileContext);

    if(fetch.loadingState == LoadingState.loading) {
        return <Loading/>
    }

    const response = fetch.response;

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
                <div className={ClassnameJoiner.join([flexRow, alignItemsCenter, flexGap, flexWrap, technicalSectionMargin])}>
                    {response?.technicalSkills.map((skillItem, index) =>
                        <div className={ClassnameJoiner.join([flexRow, alignItemsCenter])} key={index}>
                            <img src={skillItem.icon} className={skillItemIcon} />
                            <p>{skillItem.name}</p>
                        </div>
                    )}
                </div>
                <div className={ClassnameJoiner.join([flexRow, justifyContentCenter])}>
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