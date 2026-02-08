import { Model } from "mongoose";
import { EducationExperiencesCollection, ResumeDatabase, ResumeDocumentCollection, TechnicalSkillsCollection, WorkExperiencesCollection } from "../models/constants/MongoConstants";
import { ExperienceItemSchema, ResumeDocumentSchema, TechnicalSkillSchema } from "./schemas/ResumeSchemas";
import { CreateMongooseClient } from "../helpers/MongoHelper";
import { ExperienceItemDataInterface, ResumeDocumentDataInterface, TechnicalSkillDataInterface } from "../models/data/ResumeModels";
import { PutResumeHandlerRequest } from "../handlers/models/ResumeHandlerModels";

type ResumeModels = {
    workExperienceModel: Model<ExperienceItemDataInterface>;
    educationExperienceModel: Model<ExperienceItemDataInterface>;
    technicalSkillModel: Model<TechnicalSkillDataInterface>;
    resumeDocumentModel: Model<ResumeDocumentDataInterface>;
};

let models: ResumeModels;

const GetResumeModels = async (): Promise<ResumeModels> => {
    try {
        const resumeClient = await CreateMongooseClient(ResumeDatabase);

        const workExperienceModel = resumeClient.model("WorkExperiencesModel", ExperienceItemSchema, WorkExperiencesCollection);
        const educationExperienceModel = resumeClient.model("EducationExperiencesModel", ExperienceItemSchema, EducationExperiencesCollection);
        const technicalSkillModel = resumeClient.model("TechnicalSkillsModel", TechnicalSkillSchema, TechnicalSkillsCollection);
        const resumeDocumentModel = resumeClient.model("ResumeDocumentModel", ResumeDocumentSchema, ResumeDocumentCollection);

        return { workExperienceModel, educationExperienceModel, technicalSkillModel, resumeDocumentModel };
    } catch (error) {
        throw error;
    }
}

export const GetResume = async () => {
    try {
        if (!models) {
            models = await GetResumeModels();
        }

        const workExperiences = await models.workExperienceModel.find().lean();
        const educationExperiences = await models.educationExperienceModel.find().lean();
        const technicalSkills = await models.technicalSkillModel.find().lean();
        const resumeDocument = await models.resumeDocumentModel.findOne().lean();

        return {
            workExperiences,
            educationExperiences,
            technicalSkills,
            resumeDocument
        }
    } catch (error) {
        throw error;
    }
}

export const ReplaceResume = async (request: PutResumeHandlerRequest) => {
    try {
        if (!models) {
            models = await GetResumeModels();
        }

        await models.workExperienceModel.deleteMany({});
        const insertedWorkExperiences = await models.workExperienceModel.insertMany(request.workExperiences);
        const sanitizedWorkExpereinces = insertedWorkExperiences.map(x => x.toJSON());

        await models.educationExperienceModel.deleteMany({});
        const insertedEducationExperiences = await models.educationExperienceModel.insertMany(request.educationExperiences);
        const sanitizedEducationExpereinces = insertedEducationExperiences.map(x => x.toJSON());

        await models.technicalSkillModel.deleteMany({});
        const insertedTechnicalSkills = await models.technicalSkillModel.insertMany(request.technicalSkills);
        const sanitizedTechnicalSkills = insertedTechnicalSkills.map(x => x.toJSON());

        await models.resumeDocumentModel.deleteMany({});
        const insertedResumeDocument = await models.resumeDocumentModel.insertOne(request.resumeDocument);
        const sanitizedResumeDocument = insertedResumeDocument.toJSON();

        const result = {
            workExperiences: sanitizedWorkExpereinces,
            educationExperiences: sanitizedEducationExpereinces,
            technicalSkills: sanitizedTechnicalSkills,
            resumeDocument: sanitizedResumeDocument
        };

        return result;
    } catch (error) {
        throw error;
    }
}
