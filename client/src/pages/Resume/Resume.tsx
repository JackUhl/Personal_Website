import { useMemo, useState } from "react";
import { desktopResumeContainer, editButton, mobileResumeContainer, sectionTitle, technicalSectionMargin } from "./Resume.module.css"
import { alignItemsCenter, flexGap, flexRow, flexWrap, justifyContentCenter, justifyContentEnd } from "../../styling/shared.module.css";
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
import editSvg from "../../assets/svg/edit.svg";
import { useAuthentication } from "../../contexts/AuthenticationContext";

export default function Resume() {
    const [editMode, setEditMode] = useState(false);

    const isMobile = useIsMobile();
    const serviceCall = useMemo(() => ResumeService.GetResume(), []);
    const fetch = useFetch(serviceCall);
    const isAdmin = useAuthentication()

    if(fetch.loadingState == LoadingState.loading) {
        return <Loading/>
    }

    if(fetch.loadingState == LoadingState.failed) {
        return <Failed/>
    }

    const handleEditClick = () => {
        setEditMode(true);
    }

    const response = fetch.response

    return (
        <div className={isMobile ? mobileResumeContainer : desktopResumeContainer}>
            <RevealComponent>
                {isAdmin && <div className={classNameJoin([flexRow, justifyContentEnd])}>
                    <ButtonComponent 
                        buttonElement={
                            <div className={classNameJoin([flexRow, alignItemsCenter])}>
                                <img src={editSvg} className={editButton} />
                                <span>Edit Resume</span>
                            </div>
                        }
                        onClick={handleEditClick}
                    />
                </div>}
                <p className={sectionTitle}>Work Experience</p>
                {response?.workExperiences.map((workExperienceItem, index) =>
                    <ResumeItemComponent
                        key={index}
                        editMode={editMode}
                        experienceItem={workExperienceItem}
                        lastItem={index == response.workExperiences.length - 1}
                    />
                )}
                <p className={sectionTitle}>Education</p>
                {response?.educationExperiences.map((educationExperinceItem, index) =>
                    <ResumeItemComponent
                        key={index}
                        editMode={editMode}
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