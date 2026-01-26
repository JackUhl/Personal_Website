import { Request } from "express";
import { SetCacheKey } from "../helpers/CacheHelper";
import { GetResume, ReplaceEducationExperiences, ReplaceResumeDocument, ReplaceTechnicalSkills, ReplaceWorkExperiences } from "../repositories/ResumeRepository";
import { PutResumeHandlerRequest } from "./models/ResumeHandlerModels";

export const HandleGetResume = async (req: Request) => {
    try {
        const result = await GetResume();
        SetCacheKey(req.originalUrl, result);
        return result;
    } catch (error) {
        throw error;
    }
}

export const HandlePutResume = async (req: Request) => {
    try {
        const request = req.body as PutResumeHandlerRequest;
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