import { useEffect, useMemo, useState } from "react";
import { button, desktopResumeContainer, mobileResumeContainer, sectionTitle, technicalSectionMargin } from "./Resume.module.css"
import { alignItemsCenter, columnGap, flexGap, flexRow, flexWrap, justifyContentCenter, justifyContentEnd } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
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
import cancelSvg from "../../assets/svg/close.svg";
import saveSvg from "../../assets/svg/save.svg";
import { useAuthentication } from "../../contexts/AuthenticationContext";
import HrefButtonComponent from "../../components/HrefButtonComponent/HrefButtonComponent";
import OnClickButtonComponent from "../../components/OnClickButtonComponent/OnButtonButtonComponent";
import { ResumeItems } from "../../models/objects/ResumeItems";

export default function Resume() {
    const [editMode, setEditMode] = useState(false);
    const [resumeItems, setResumeItems] = useState<ResumeItems | undefined>(undefined);

    const isMobile = useIsMobile();
    const serviceCall = useMemo(() => ResumeService.GetResume(), []);
    const fetch = useFetch(serviceCall);
    const isAdmin = useAuthentication();

    useEffect(() => {
        setResumeItems(fetch.response);
    }, [fetch.response])

    const handleEditClick = () => {
        setEditMode(true);
    }

    const handleCancelClick = () => {
        setEditMode(false);
    }

    const handleSaveClick = () => {
        console.log(resumeItems);
    }

    if (fetch.loadingState == LoadingState.loading) {
        return <Loading />
    }

    if (fetch.loadingState == LoadingState.failed) {
        return <Failed />
    }

    return (
        <div className={isMobile ? mobileResumeContainer : desktopResumeContainer}>
            <RevealComponent>
                {isAdmin && !editMode &&
                    <div className={classNameJoin([flexRow, justifyContentEnd])}>
                        <OnClickButtonComponent
                            buttonElement={
                                <div className={classNameJoin([flexRow, alignItemsCenter])}>
                                    <img src={editSvg} className={button} />
                                    <span>Edit Resume</span>
                                </div>
                            }
                            onClick={handleEditClick}
                        />
                    </div>
                }
                <p className={sectionTitle}>Work Experience</p>
                {resumeItems && resumeItems.workExperiences.map((workExperienceItem, index) =>
                    <ResumeItemComponent
                        key={index}
                        editMode={editMode}
                        experienceItem={workExperienceItem}
                        lastItem={index == resumeItems.workExperiences.length - 1}
                        setResumeItems={(updatedExperienceItem) => {
                            const newWorkExperiences = [...resumeItems.workExperiences];
                            newWorkExperiences[index] = updatedExperienceItem;
                            setResumeItems({
                                ...resumeItems,
                                workExperiences: newWorkExperiences
                            });
                        }}
                    />
                )}
                <p className={sectionTitle}>Education</p>
                {resumeItems && resumeItems.educationExperiences.map((educationExperinceItem, index) =>
                    <ResumeItemComponent
                        key={index}
                        editMode={editMode}
                        experienceItem={educationExperinceItem}
                        lastItem={index == resumeItems.educationExperiences.length - 1}
                        setResumeItems={(updatedExperienceItem) => {
                            const newEducationExperiences = [...resumeItems.educationExperiences];
                            newEducationExperiences[index] = updatedExperienceItem;
                            setResumeItems({
                                ...resumeItems,
                                educationExperiences: newEducationExperiences
                            });
                        }}
                    />
                )}
                <p className={sectionTitle}>Technical Skills</p>
                <div className={classNameJoin([flexRow, alignItemsCenter, flexGap, flexWrap, technicalSectionMargin])}>
                    {resumeItems && resumeItems.technicalSkills.map((skillItem, index) =>
                        <TechnicalSkillComponent
                            key={index}
                            icon={skillItem.icon}
                            name={skillItem.name}
                        />
                    )}
                </div>
                <div className={classNameJoin([flexRow, justifyContentCenter])}>
                    {resumeItems && resumeItems.resumeDocument &&
                        <HrefButtonComponent
                            buttonElement={<p>View as PDF</p>}
                            href={encodePdf(resumeItems.resumeDocument.data)}
                            openInNewTab={true}
                        />
                    }
                </div>
                {editMode &&
                    <div className={classNameJoin([flexRow, justifyContentEnd, columnGap])}>
                        <OnClickButtonComponent
                            buttonElement={
                                <div className={classNameJoin([flexRow, alignItemsCenter])}>
                                    <img src={cancelSvg} className={button} />
                                    <span>Cancel</span>
                                </div>
                            }
                            onClick={handleCancelClick}
                        />
                        <OnClickButtonComponent
                            buttonElement={
                                <div className={classNameJoin([flexRow, alignItemsCenter])}>
                                    <img src={saveSvg} className={button} />
                                    <span>Save</span>
                                </div>
                            }
                            onClick={handleSaveClick}
                        />
                    </div>
                }
            </RevealComponent>
        </div>
    )
}