import { useMemo } from "react";
import { desktopResumeContainer, mobileResumeContainer, sectionTitle, technicalSectionMargin } from "./Resume.module.css"
import { alignItemsCenter, flexGap, flexRow, flexWrap, justifyContentCenter } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import RevealComponent from "../../components/RevealComponent/RevealComponent";
import { useFetch } from "../../hooks/useFetch";
import { ResumeService } from "../../services/ResumeService";
import { LoadingState } from "../../models/enums/LoadingState";
import Loading from "../Loading/Loading";
import Failed from "../Failed/Failed";
import { useIsMobile } from "../../hooks/useIsMobile";
import { encodePdf } from "../../utilities/helpers/Encoding";
import ResumeItemComponent from "./ResumeItemComponent/ResumeItemComponent";
import TechnicalSkillComponent from "./TechnicalSkillComponent/TechnicalSkillComponent";

export default function Resume() {
    const isMobile = useIsMobile();
    const serviceCall = useMemo(() => ResumeService.GetResume(), []);
    const fetch = useFetch(serviceCall);

    if(fetch.loadingState == LoadingState.loading) {
        return <Loading/>
    }

    if(fetch.loadingState == LoadingState.failed) {
        return <Failed/>
    }

    const response = fetch.response

    return (
        <div className={isMobile ? mobileResumeContainer : desktopResumeContainer}>
            <RevealComponent>
                <p className={sectionTitle}>Work Experience</p>
                {response?.workExperiences.map((workExperienceItem, index) =>
                    <ResumeItemComponent
                        key={index}
                        experienceItem={workExperienceItem}
                        lastItem={index == response.workExperiences.length - 1}
                    />
                )}
                <p className={sectionTitle}>Education</p>
                {response?.educationExperiences.map((educationExperinceItem, index) =>
                    <ResumeItemComponent
                        key={index}
                        experienceItem={educationExperinceItem}
                        lastItem={index == response.educationExperiences.length - 1}
                    />
                )}
                <p className={sectionTitle}>Technical Skills</p>
                <div className={classNameJoin([flexRow, alignItemsCenter, flexGap, flexWrap, technicalSectionMargin])}>
                    {response?.technicalSkills.map((skillItem, index) =>
                        <TechnicalSkillComponent
                            key={index}
                            icon={skillItem.icon}
                            name={skillItem.name}
                        />
                    )}
                </div>
                <div className={classNameJoin([flexRow, justifyContentCenter])}>
                    {response?.resumeDocument && <ButtonComponent 
                        buttonElement={<p>View as PDF</p>}
                        href={encodePdf(response.resumeDocument.data)}
                        openInNewTab={true}
                    />}
                </div>
            </RevealComponent>
        </div>
    )
}