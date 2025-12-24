import { Request, Response } from "express";
import { SetCacheKey } from "../services/CacheService";
import { EducationExperiencesCollection, ResumeDocumentCollection, TechnicalSkillsCollection, WorkExperiencesCollection } from "../models/constants/MongoConstants";
import { GetResumeClient } from "../services/MongoService";

export const GetResume = async (req: Request, res: Response) => {
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
        }

        SetCacheKey(req.originalUrl, resumeItems);
        res.json(resumeItems);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}