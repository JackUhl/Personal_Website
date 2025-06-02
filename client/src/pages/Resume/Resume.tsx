import { useContext, useMemo } from "react";
import { desktopResumeContainer, mobileResumeContainer, sectionTitle, skillItemIcon, technicalSectionMargin } from "./Resume.module.css"
import { IsMobileContext } from "../../contexts/IsMobileContext";
import { alignItemsCenter, flexGap, flexRow, flexWrap, justifyContentCenter } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import ResumeItemComponent from "../../components/ResumeItemComponent/ResumeItemComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import resume from "../../assets/docs/Resume.pdf"
import RevealComponent from "../../components/RevealComponent/RevealComponent";
import { useFetch } from "../../hooks/useFetch";
import { ResumeService } from "../../services/ResumeService";
import { LoadingState } from "../../models/enums/LoadingState";
import Loading from "../Loading/Loading";
import Failed from "../Failed/Failed";
import { RevealTimeoutInMs } from "../../models/constants/ConfigurationConstants";

export default function Resume() {
    const isMobile = useContext(IsMobileContext);
    const serviceCall = useMemo(() => ResumeService.GetResume(), []);
    const fetch = useFetch(serviceCall);

    const encodeSvg = (icon: string) => {
        return 'data:image/svg+xml;base64,' + btoa(icon);
    }

    if(fetch.loadingState == LoadingState.loading) {
        return <Loading/>
    }

    if(fetch.loadingState == LoadingState.failed) {
        return <Failed/>
    }

    const response = fetch.response

    return (
        <div className={isMobile ? mobileResumeContainer : desktopResumeContainer}>
            <RevealComponent timeoutInterval={RevealTimeoutInMs}>
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
                            <img src={encodeSvg(skillItem.icon)} className={skillItemIcon} />
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