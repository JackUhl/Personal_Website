import { Request, Response } from "express";
import { SetCacheKey } from "../services/CacheService";
import { EducationExperiencesCollection, ResumeDocumentCollection, TechnicalSkillsCollection, WorkExperiencesCollection } from "../constants/MongoConstants";
import { GetResumeClient } from "../services/MongoService";

export const GetResume = async (req: Request, res: Response) => {
    try {
        const resumeClient = await GetResumeClient();

        const workExperiences = await resumeClient.collection(WorkExperiencesCollection).aggregate([
            {
                $project: {
                    _id: 0, // Exclude the '_id' field
                }
            }
        ]).toArray();

        const educationExperiences = await resumeClient.collection(EducationExperiencesCollection).aggregate([
            {
                $project: {
                    _id: 0, // Exclude the '_id' field
                }
            }
        ]).toArray();

        const technicalSkills = await resumeClient.collection(TechnicalSkillsCollection).aggregate([
            {
                $project: {
                    _id: 0, // Exclude the '_id' field
                }
            }
        ]).toArray();

        const resumeDocument = await resumeClient.collection(ResumeDocumentCollection).findOne({}, {
            projection: { _id: 0 } // Exclude the '_id' field
        });

        const resumeItems = {
            workExperiences: workExperiences,
            educationExperiences: educationExperiences,
            technicalSkills: technicalSkills,
            resumeDocument: resumeDocument
        }

        SetCacheKey(req.originalUrl, resumeItems);
        res.json(resumeItems);
    } catch(error) {
        console.log(error);
        res.status(500).send();
    }
}