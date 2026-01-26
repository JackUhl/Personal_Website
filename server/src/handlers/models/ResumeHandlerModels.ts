import { ExperienceItemDataInterface, ResumeDocumentDataInterface, TechnicalSkillDataInterface } from "../../models/data/ResumeModels";

export interface PutResumeHandlerRequest {
    workExperiences: ExperienceItemDataInterface[],
    educationExperiences: ExperienceItemDataInterface[],
    technicalSkills: TechnicalSkillDataInterface[],
    resumeDocument: ResumeDocumentDataInterface
}