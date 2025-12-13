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
import TechnicalSkillComponent from "./TechnicalSkillComponent/TechnicalSkillComponent";
import editSvg from "../../assets/svg/edit.svg";
import cancelSvg from "../../assets/svg/close.svg";
import saveSvg from "../../assets/svg/save.svg";
import OnClickButtonComponent from "../../components/OnClickButtonComponent/OnButtonButtonComponent";
import { ResumeDocument, ResumeItems } from "../../models/objects/ResumeItems";
import ResumeDocumentComponent from "./ResumeDocumentComponent/ResumeDocumentComponent";
import { deepCopy } from "../../utilities/helpers/Cloning";
import { useAuthentication } from "../../hooks/useAuthentication";
import ExperienceItemsComponent from "./ExperienceItemsComponent/ExperienceItemsComponent";

export default function Resume() {
    const [editMode, setEditMode] = useState(false);
    const [resumeItems, setResumeItems] = useState<ResumeItems | undefined>(undefined);

    const isMobile = useIsMobile();
    const serviceCall = useMemo(() => ResumeService.GetResume(), []);
    const { response, loadingState } = useFetch(serviceCall);
    const isAdmin = useAuthentication();

    useEffect(() => {
        if (loadingState == LoadingState.success && response) {
            setResumeItems(deepCopy(response));
        }
    }, [loadingState, response])

    const handleEditClick = () => {
        setEditMode(true);
    }

    const handleCancelClick = () => {
        setResumeItems(deepCopy(response));
        setEditMode(false);
    }

    const handleSaveClick = () => {
        setEditMode(false);
        console.log(resumeItems);
    }

    if (loadingState == LoadingState.loading) {
        return <Loading />
    }

    if (loadingState == LoadingState.failed) {
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
                {resumeItems && resumeItems.workExperiences &&
                    <ExperienceItemsComponent
                        editMode={editMode}
                        experienceItems={resumeItems.workExperiences}
                        updateExperienceItems={(updatedWorkExperienceItems) => {
                            setResumeItems({
                                ...resumeItems,
                                workExperiences: updatedWorkExperienceItems
                            })
                        }}
                    />
                }
                <p className={sectionTitle}>Education</p>
                {resumeItems && resumeItems.educationExperiences &&
                    <ExperienceItemsComponent
                        editMode={editMode}
                        experienceItems={resumeItems.educationExperiences}
                        updateExperienceItems={(updatedEducationExperienceItems) => {
                            setResumeItems({
                                ...resumeItems,
                                educationExperiences: updatedEducationExperienceItems
                            })
                        }}
                    />
                }
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