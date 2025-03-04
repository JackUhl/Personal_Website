import { useCallback, useContext, useEffect, useState } from "react";
import { desktopContainer, mobileContainer, resumeButton, resumeButtonHidden, sectionTitle, skillItemIcon, technicalSectionMargin, technicalSkill, technicalSkillHidden } from "./Resume.module.css"
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
import { ResumeItems } from "../../models/objects/ResumeItems";
import DelayHelper from "../../utilities/helpers/DelayHelper";

export default function Resume() {
    const [shownItems, setShownItems] = useState<{ 
        workExperience: boolean[]; 
        educationExperience: boolean[]; 
        technicalSkills: boolean[];
        resumeButton: boolean;
      }>({
        workExperience: [],
        educationExperience: [],
        technicalSkills: [],
        resumeButton: false
    });

    const fetch = useFetch(PersonalSiteService.GetResume());
    const isMobile = useContext(IsMobileContext);

    const expandItemsSequentially = useCallback(async (response: ResumeItems) => {
        const workExperienceExpanded = Array(response.workExperiences.length).fill(false);
        const educationExperienceExpanded = Array(response.educationExperiences.length).fill(false);
        const technicalSkillsExpanded = Array(response.technicalSkills.length).fill(false);
        const experienceDelay = 250;
        const technicalDelay = 100;

        setShownItems(() => ({
            workExperience: workExperienceExpanded,
            educationExperience: educationExperienceExpanded,
            technicalSkills: technicalSkillsExpanded,
            resumeButton: false
        }));

        await DelayHelper.delay(experienceDelay);

        for(let i = 0; i < response.workExperiences.length; i++) {
            workExperienceExpanded[i] = true;
            setShownItems(prevState => ({
                ...prevState,
                workExperience: [...workExperienceExpanded]
            }));
            await DelayHelper.delay(experienceDelay);
        }

        for(let i = 0; i < response.educationExperiences.length; i++) {
            educationExperienceExpanded[i] = true;
            setShownItems(prevState => ({
                ...prevState,
                educationExperience: [...educationExperienceExpanded]
            }));
            await DelayHelper.delay(experienceDelay);
        }

        for(let i = 0; i < response.technicalSkills.length; i++) {
            technicalSkillsExpanded[i] = true;
            setShownItems(prevState => ({
                ...prevState,
                technicalSkills: [...technicalSkillsExpanded]
            }));
            await DelayHelper.delay(technicalDelay);
        }

        setShownItems((prevState) => ({
            ...prevState,
            resumeButton: true
        }))
    }, []);

    const toggleWorkExperience = useCallback((index: number) => {
        setShownItems(prevState => {
            const newArray = [...prevState.workExperience];
            newArray[index] = !newArray[index]
            
            return {
                ...prevState,
                workExperience: newArray
            }
        })
    }, [])

    const toggleEducationExperience = useCallback((index: number) => {
        setShownItems(prevState => {
            const newArray = [...prevState.educationExperience];
            newArray[index] = !newArray[index]
            
            return {
                ...prevState,
                educationExperience: newArray
            }
        })
    }, [])

    useEffect(() => {
        if(fetch.response) {
            expandItemsSequentially(fetch.response);
        }
    }, [fetch.response]);

    if(fetch.loadingState == LoadingState.loading) {
        return <Loading/>
    }

    const response = fetch.response;

    return (
        <div className={isMobile ? mobileContainer : desktopContainer}>
            <p className={sectionTitle}>Work Experience</p>
            {response?.workExperiences.map((workExperienceItem, index) =>
                <ResumeItemComponent
                    key={index}
                    experienceItem={workExperienceItem}
                    lastItem={index == response.workExperiences.length - 1}
                    expanded={shownItems.workExperience[index]}
                    toggleExpand={() => toggleWorkExperience(index)}
                />
            )}
            <p className={sectionTitle}>Education</p>
            {response?.educationExperiences.map((educationExperinceItem, index) =>
                <ResumeItemComponent
                    key={index}
                    experienceItem={educationExperinceItem}
                    lastItem={index == response.educationExperiences.length - 1}
                    expanded={shownItems.educationExperience[index]}
                    toggleExpand={() => {toggleEducationExperience(index)}}
                />
            )}
            <p className={sectionTitle}>Technical Skills</p>
            <div className={ClassnameJoiner.join([flexRow, alignItemsCenter, flexGap, flexWrap, technicalSectionMargin])}>
                {response?.technicalSkills.map((skillItem, index) =>
                    <div className={ClassnameJoiner.join([flexRow, alignItemsCenter, technicalSkill, !shownItems.technicalSkills[index] ? technicalSkillHidden : ""])} key={index}>
                        <img src={skillItem.icon} className={skillItemIcon} />
                        <p>{skillItem.name}</p>
                    </div>
                )}
            </div>
            <div className={ClassnameJoiner.join([flexRow, justifyContentCenter, resumeButton, !shownItems.resumeButton ? resumeButtonHidden : ""])}>
                <ButtonComponent 
                    buttonElement={<p>View as PDF</p>}
                    href={resume}
                    openInNewTab={true}
                />
            </div>
        </div>
    )
}