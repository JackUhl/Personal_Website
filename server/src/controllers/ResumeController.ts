import { Request, Response } from "express";
import { cache } from "../services/CacheService";
import { Db } from "mongodb";
import { ConnectMongoDb } from "../services/MongoService";
import { EducationExperiencesCollection, ResumeDatabase, TechnicalSkillsCollection, WorkExperiencesCollection } from "../models/constants/MongoConstants";

var mongoBlogClient: Db;

ConnectMongoDb(ResumeDatabase).then((client) => {
    mongoBlogClient = client;
}).catch((error) => {
    console.log(error);
})

export const GetResume = async (req: Request, res: Response) => {
    let cacheKey = req.originalUrl;
    let cachedValue = cache.get(cacheKey);

    if(cachedValue) {
        res.json(cachedValue);
        return;
    }

    const workExperiences = await mongoBlogClient.collection(WorkExperiencesCollection).aggregate([
        {
            $project: {
                _id: 0, // Exclude the '_id' field
            }
        }
    ]).toArray();

    const educationExperiences = await mongoBlogClient.collection(EducationExperiencesCollection).aggregate([
        {
            $project: {
                _id: 0, // Exclude the '_id' field
            }
        }
    ]).toArray();

    const technicalSkills = await mongoBlogClient.collection(TechnicalSkillsCollection).aggregate([
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

    cache.set(cacheKey, resumeItems);
    res.json(resumeItems);
}