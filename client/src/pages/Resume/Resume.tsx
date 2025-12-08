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
import ExperienceItemComponent from "./ExperienceItemComponent/ExperienceItemComponent";
import TechnicalSkillComponent from "./TechnicalSkillComponent/TechnicalSkillComponent";
import editSvg from "../../assets/svg/edit.svg";
import cancelSvg from "../../assets/svg/close.svg";
import saveSvg from "../../assets/svg/save.svg";
import { useAuthentication } from "../../contexts/AuthenticationContext";
import OnClickButtonComponent from "../../components/OnClickButtonComponent/OnButtonButtonComponent";
import { ResumeDocument, ResumeItems } from "../../models/objects/ResumeItems";
import ResumeDocumentComponent from "./ResumeDocumentComponent/ResumeDocumentComponent";

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
        setResumeItems(fetch.response)
        setEditMode(false);
    }

    const handleSaveClick = () => {
        setEditMode(false);
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
                {resumeItems && resumeItems.workExperiences.map((workExperience, index) =>
                    <ExperienceItemComponent
                        key={index}
                        editMode={editMode}
                        experienceItem={workExperience}
                        lastItem={index == resumeItems.workExperiences.length - 1}
                        updateExperienceItem={(updatedExperienceItem) => {
                            const newWorkExperiences = [...resumeItems.workExperiences];
                            newWorkExperiences[index] = updatedExperienceItem;
                            setResumeItems({
                                ...resumeItems,
                                workExperiences: newWorkExperiences
                            });
                        }}
                        addExperienceItem={() => {
                            const newWorkExperiences = [...resumeItems.workExperiences];
                            newWorkExperiences.push({
                                mainText: "",
                                subText: "",
                                start: "",
                                description: []
                            })
                            setResumeItems({
                                ...resumeItems,
                                workExperiences: newWorkExperiences
                            });
                        }}
                        removeExperienceItem={() => {
                            const newWorkExperiences = [...resumeItems.workExperiences];
                            newWorkExperiences.splice(index, 1);
                            setResumeItems({
                                ...resumeItems,
                                workExperiences: newWorkExperiences
                            });
                        }}
                    />
                )}
                <p className={sectionTitle}>Education</p>
                {resumeItems && resumeItems.educationExperiences.map((educationExperince, index) =>
                    <ExperienceItemComponent
                        key={index}
                        editMode={editMode}
                        experienceItem={educationExperince}
                        lastItem={index == resumeItems.educationExperiences.length - 1}
                        updateExperienceItem={(updatedExperienceItem) => {
                            const newEducationExperiences = [...resumeItems.educationExperiences];
                            newEducationExperiences[index] = updatedExperienceItem;
                            setResumeItems({
                                ...resumeItems,
                                educationExperiences: newEducationExperiences
                            });
                        }}
                        addExperienceItem={() => {
                            const newEducationExperiences = [...resumeItems.educationExperiences];
                            newEducationExperiences.push({
                                mainText: "",
                                subText: "",
                                start: "",
                                description: []
                            })
                            setResumeItems({
                                ...resumeItems,
                                educationExperiences: newEducationExperiences
                            });
                        }}
                        removeExperienceItem={() => {
                            const newEducationExperiences = [...resumeItems.educationExperiences];
                            newEducationExperiences.splice(index, 1);
                            setResumeItems({
                                ...resumeItems,
                                educationExperiences: newEducationExperiences
                            });
                        }}
                    />
                )}
                <p className={sectionTitle}>Technical Skills</p>
                <div className={classNameJoin([flexRow, alignItemsCenter, flexGap, flexWrap, technicalSectionMargin])}>
                    {resumeItems && resumeItems.technicalSkills.map((technicalSkill, index) =>
                        <TechnicalSkillComponent
                            key={index}
                            editMode={editMode}
                            technicalSkill={technicalSkill}
                            setResumeItems={(updatedTechnicalSkillItem) => {
                                const newTechnicalSkills = [...resumeItems.technicalSkills];
                                newTechnicalSkills[index] = updatedTechnicalSkillItem;
                                setResumeItems({
                                    ...resumeItems,
                                    technicalSkills: newTechnicalSkills
                                });
                            }}
                        />
                    )}
                </div>
                <div className={classNameJoin([flexRow, justifyContentCenter])}>
                    {resumeItems && resumeItems.resumeDocument &&
                        <ResumeDocumentComponent
                            editMode={editMode}
                            resumeDocument={resumeItems.resumeDocument}
                            updateResumeDocument={(updatedResumeDocument: ResumeDocument) => {
                                setResumeItems({
                                    ...resumeItems,
                                    resumeDocument: updatedResumeDocument
                                });
                            }}
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