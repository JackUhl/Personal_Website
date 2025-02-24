import { useContext } from "react";
import { buttonText, desktopContainer, mobileContainer, sectionTitle, skillItemIcon, skillItemName, technicalMargin } from "./Resume.module.css"
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

export default function Resume() {
    const fetch = useFetch(PersonalSiteService.GetResume());
    const isMobile = useContext(IsMobileContext);

    if(fetch.loadingState == LoadingState.loading) {
        return <Loading/>
    }

    const response = fetch.response;

    return (
        <>
            <div className={isMobile ? mobileContainer : desktopContainer}>
                <p className={sectionTitle}>Work Experience</p>
                {response?.workExperiences.map((workExperienceItem, index) =>
                    <ResumeItemComponent
                        key={index}
                        resumeItem={workExperienceItem}
                        lastItem={index == response.workExperiences.length - 1}
                    />
                )}
                <p className={sectionTitle}>Education</p>
                {response?.educationExperiences.map((educationExperinceItem, index) =>
                    <ResumeItemComponent
                        key={index}
                        resumeItem={educationExperinceItem}
                        lastItem={index == response.educationExperiences.length - 1}
                    />
                )}
                <p className={sectionTitle}>Technical Skills</p>
                <div className={ClassnameJoiner.join([flexRow, alignItemsCenter, flexGap, flexWrap, technicalMargin])}>
                    {response?.technicalSkills.map((skillItem, index) =>
                        <div className={ClassnameJoiner.join([flexRow, alignItemsCenter])} key={index}>
                            <img src={skillItem.icon} className={skillItemIcon} />
                            <p className={skillItemName}>{skillItem.name}</p>
                        </div>
                    )}
                </div>
                <div className={ClassnameJoiner.join([flexRow, justifyContentCenter])}>
                    <ButtonComponent 
                        buttonElement={<p className={buttonText}>View as PDF</p>}
                        href={resume}
                        openInNewTab={true}
                    />
                </div>
            </div>
        </>
    )
}