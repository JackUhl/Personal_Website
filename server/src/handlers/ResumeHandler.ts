import { Request } from "express";
import { SetCacheKey } from "../helpers/CacheHelper";
import { GetResumeClient } from "../services/MongoService";
import { EducationExperiencesCollection, ResumeDocumentCollection, TechnicalSkillsCollection, WorkExperiencesCollection } from "../models/constants/MongoConstants";

export const HandleGetResume = async (req: Request) => {
    try {
        const resumeClient = await GetResumeClient();

        const workExperiences = await resumeClient.collection(WorkExperiencesCollection).find().toArray();
        const educationExperiences = await resumeClient.collection(EducationExperiencesCollection).find().toArray();
        const technicalSkills = await resumeClient.collection(TechnicalSkillsCollection).find().toArray();
        const resumeDocument = await resumeClient.collection(ResumeDocumentCollection).findOne();

        const resumeItems = {
            workExperiences: workExperiences,
            educationExperiences: educationExperiences,
            technicalSkills: technicalSkills,
            resumeDocument: resumeDocument
        };

        SetCacheKey(req.originalUrl, resumeItems);
        return resumeItems;
    } catch (error) {
        throw error;
    }
}