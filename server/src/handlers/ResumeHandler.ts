import { GetResume, ReplaceEducationExperiences, ReplaceResumeDocument, ReplaceTechnicalSkills, ReplaceWorkExperiences } from "../repositories/ResumeRepository";
import { PutResumeHandlerRequest } from "./models/ResumeHandlerModels";

export const HandleGetResume = async () => {
    try {
        const result = await GetResume();
        return result;
    } catch (error) {
        throw error;
    }
}

export const HandlePutResume = async (request: PutResumeHandlerRequest) => {
    try {
        const workExperiences = await ReplaceWorkExperiences(request.workExperiences);
        const educationExperiences = await ReplaceEducationExperiences(request.educationExperiences);
        const technicalSkills = await ReplaceTechnicalSkills(request.technicalSkills);
        const resumeDocument = await ReplaceResumeDocument(request.resumeDocument);

        return {
            workExperiences,
            educationExperiences,
            technicalSkills,
            resumeDocument
        };
    } catch (error) {
        throw error;
    }
}