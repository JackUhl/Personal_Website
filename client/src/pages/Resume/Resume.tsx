import { useContext, useEffect, useMemo, useState } from "react";
import { desktopResumeContainer, mobileResumeContainer, sectionTitle } from "./Resume.module.css"
import { alignItemsCenter, columnGap, flexRow, icon, justifyContentEnd } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import RevealComponent from "../../components/RevealComponent/RevealComponent";
import { useFetch } from "../../hooks/useFetch";
import { ResumeService } from "../../services/ResumeService";
import { LoadingState } from "../../models/enums/LoadingState";
import Loading from "../Loading/Loading";
import Failed from "../Failed/Failed";
import { useIsMobile } from "../../hooks/useIsMobile";
import editSvg from "../../assets/svg/edit.svg";
import cancelSvg from "../../assets/svg/close.svg";
import saveSvg from "../../assets/svg/save.svg";
import OnClickButtonComponent from "../../components/OnClickButtonComponent/OnButtonButtonComponent";
import { ResumeDocument, ResumeItems } from "../../models/objects/ResumeItems";
import { deepCopy } from "../../utilities/helpers/Cloning";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import DisplayExperienceItemsComponent from "./ExperienceItemsComponent/DisplayExperienceItemsComponent/DisplayExperienceItemsComponent";
import EditExperienceItemsComponent from "./ExperienceItemsComponent/EditExperienceItemsComponent/EditExperienceItemsComponent";
import EditTechnicalSkillsComponent from "./TechnicalSkillComponent/EditTechnicalSkillsComponent/EditTechnicalSkillsComponent";
import DisplayTechnicalSkillsComponent from "./TechnicalSkillComponent/DisplayTechnicalSkillsComponent/DisplayTechnicalSkillsComponent";
import EditResumeDocumentComponent from "./ResumeDocumentComponent/EditResumeDocumentComponent/EditResumeDocumentComponent";
import DisplayResumeDocumentComponent from "./ResumeDocumentComponent/DisplayResumeDocumentComponent/DisplayResumeDocumentComponent";

export default function Resume() {
    const [editMode, setEditMode] = useState(false);
    const [resumeItems, setResumeItems] = useState<ResumeItems | undefined>(undefined);

    const isMobile = useIsMobile();
    const serviceCall = useMemo(() => ResumeService.GetResume(), []);
    const { response, loadingState } = useFetch(serviceCall);
    const isAdmin = useContext(AuthenticationContext);

    useEffect(() => {
        if (loadingState == LoadingState.success && response) {
            setResumeItems(deepCopy(response));
        }
    }, [loadingState, response]);

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
                            onClick={handleEditClick}
                        >
                            <div className={classNameJoin([flexRow, alignItemsCenter])}>
                                <img src={editSvg} className={icon} />
                                <span>Edit Resume</span>
                            </div>
                        </OnClickButtonComponent>
                    </div>
                }
                <p className={sectionTitle}>Work Experience</p>
                {resumeItems && resumeItems.workExperiences &&
                    <>
                        {editMode ?
                            <EditExperienceItemsComponent
                                experienceItems={resumeItems.workExperiences}
                                updateExperienceItems={(updatedWorkExperienceItems) => {
                                    setResumeItems({
                                        ...resumeItems,
                                        workExperiences: updatedWorkExperienceItems
                                    })
                                }}
                            />
                            :
                            <DisplayExperienceItemsComponent
                                experienceItems={resumeItems.workExperiences}
                            />
                        }
                    </>
                }
                <p className={sectionTitle}>Education</p>
                {resumeItems && resumeItems.educationExperiences &&
                    <>
                        {editMode ?
                            <EditExperienceItemsComponent
                                experienceItems={resumeItems.educationExperiences}
                                updateExperienceItems={(updatedEducationExperienceItems) => {
                                    setResumeItems({
                                        ...resumeItems,
                                        educationExperiences: updatedEducationExperienceItems
                                    })
                                }}
                            />
                            :
                            <DisplayExperienceItemsComponent
                                experienceItems={resumeItems.educationExperiences}
                            />
                        }
                    </>
                }
                <p className={sectionTitle}>Technical Skills</p>
                {resumeItems && resumeItems.technicalSkills &&
                    <>
                        {editMode ?
                            <EditTechnicalSkillsComponent
                                technicalSkills={resumeItems.technicalSkills}
                                updateTechnicalSkills={(updatedTechnicalExperienceItems) => {
                                    setResumeItems({
                                        ...resumeItems,
                                        technicalSkills: updatedTechnicalExperienceItems
                                    })
                                }}
                            />
                            :
                            <DisplayTechnicalSkillsComponent
                                technicalSkills={resumeItems.technicalSkills}
                            />
                        }
                    </>
                }
                {resumeItems && resumeItems.resumeDocument &&
                    <>
                        {editMode ?
                            <EditResumeDocumentComponent
                                resumeDocument={resumeItems.resumeDocument}
                                updateResumeDocument={(updatedResumeDocument: ResumeDocument) => {
                                    setResumeItems({
                                        ...resumeItems,
                                        resumeDocument: updatedResumeDocument
                                    });
                                }}
                            />
                            :
                            <DisplayResumeDocumentComponent
                                resumeDocument={resumeItems.resumeDocument}
                            />
                        }
                    </>
                }
                {isAdmin && editMode &&
                    <div className={classNameJoin([flexRow, justifyContentEnd, columnGap])}>
                        <OnClickButtonComponent
                            onClick={handleCancelClick}
                        >
                            <div className={classNameJoin([flexRow, alignItemsCenter])}>
                                <img src={cancelSvg} className={icon} />
                                <span>Cancel</span>
                            </div>
                        </OnClickButtonComponent>
                        <OnClickButtonComponent
                            onClick={handleSaveClick}
                        >
                            <div className={classNameJoin([flexRow, alignItemsCenter])}>
                                <img src={saveSvg} className={icon} />
                                <span>Save</span>
                            </div>
                        </OnClickButtonComponent>
                    </div>
                }
            </RevealComponent>
        </div>
    )
}