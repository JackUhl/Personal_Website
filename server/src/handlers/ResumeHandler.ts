import { GetResume, ReplaceResume } from "../repositories/ResumeRepository";
import { PutResumeHandlerRequest } from "./models/ResumeHandlerModels";

const omitId = <T>(object: any): T => {
    const { _id, ...rest } = object;
    return rest as T;
};

const omitIdFromArray = <T>(itemArray: any[]): T[] => itemArray.map(item => omitId(item));

export const HandleGetResume = async () => {
    try {
        const result = await GetResume();

        result.workExperiences = omitIdFromArray(result.workExperiences);
        result.educationExperiences = omitIdFromArray(result.educationExperiences);
        result.technicalSkills = omitIdFromArray(result.technicalSkills);
        result.resumeDocument = omitId(result.resumeDocument);

        result.workExperiences.sort((a, b) => b.start.getTime() - a.start.getTime());
        result.educationExperiences.sort((a, b) => b.start.getTime() - a.start.getTime());

        return result;
    } catch (error) {
        throw error;
    }
}

export const HandlePutResume = async (request: PutResumeHandlerRequest) => {
    try {
        const result = await ReplaceResume(request);

        result.workExperiences = omitIdFromArray(result.workExperiences);
        result.educationExperiences = omitIdFromArray(result.educationExperiences);
        result.technicalSkills = omitIdFromArray(result.technicalSkills);
        result.resumeDocument = omitId(result.resumeDocument);

        result.workExperiences.sort((a, b) => b.start.getTime() - a.start.getTime());
        result.educationExperiences.sort((a, b) => b.start.getTime() - a.start.getTime());

        return result;
    } catch (error) {
        throw error;
    }
}