import { Request, Response } from "express";
import { GetCacheKey, SetCacheKey } from "../services/CacheService";
import { EducationExperiencesCollection, TechnicalSkillsCollection, WorkExperiencesCollection } from "../constants/MongoConstants";
import { GetResumeClient } from "../services/MongoService";

export const GetResume = async (req: Request, res: Response) => {
    try {
        let cacheKey = req.originalUrl;
        let cachedValue = GetCacheKey(cacheKey);

        if(cachedValue) {
            console.log("Successfully fetched resume data from cached value");
            res.json(cachedValue);
            return;
        }

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

        const resumeItems = {
            workExperiences: workExperiences,
            educationExperiences: educationExperiences,
            technicalSkills: technicalSkills
        }

        SetCacheKey(cacheKey, resumeItems);
        console.log("Successfully fetched resume data from MongoDB");
        res.json(resumeItems);
    } catch(error) {
        console.log(error);
        res.status(500).send();
    }
}