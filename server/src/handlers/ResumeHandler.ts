import { ResumeRequest } from "../models/data/ResumeModels";
import { GetResume, ReplaceResume } from "../repositories/ResumeRepository";

const omitId = <T>(object: any): T => {
    const { _id, ...rest } = object;
    return rest as T;
};

const omitIdFromArray = <T>(itemArray: any[]): T[] => itemArray.map(item => omitId(item));

export const HandleGetResume = async () => {
    const result = await GetResume();

    result.workExperiences = omitIdFromArray(result.workExperiences);
    result.educationExperiences = omitIdFromArray(result.educationExperiences);
    result.technicalSkills = omitIdFromArray(result.technicalSkills);
    result.resumeDocument = omitId(result.resumeDocument);

    result.workExperiences.sort((a, b) => b.start.getTime() - a.start.getTime());
    result.educationExperiences.sort((a, b) => b.start.getTime() - a.start.getTime());

    return result;
}

export const HandlePutResume = async (request: ResumeRequest) => {
    const result = await ReplaceResume(request);

    result.workExperiences = omitIdFromArray(result.workExperiences);
    result.educationExperiences = omitIdFromArray(result.educationExperiences);
    result.technicalSkills = omitIdFromArray(result.technicalSkills);
    result.resumeDocument = omitId(result.resumeDocument);

    result.workExperiences.sort((a, b) => b.start.getTime() - a.start.getTime());
    result.educationExperiences.sort((a, b) => b.start.getTime() - a.start.getTime());

    return result;
}