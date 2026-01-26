import { Model } from "mongoose";
import { EducationExperiencesCollection, ResumeDatabase, ResumeDocumentCollection, TechnicalSkillsCollection, WorkExperiencesCollection } from "../models/constants/MongoConstants";
import { ExperienceItemSchema, ResumeDocumentSchema, TechnicalSkillSchema } from "./schemas/ResumeSchemas";
import { CreateMongooseClient } from "../helpers/MongoHelper";
import { ExperienceItemDataInterface, ResumeDocumentDataInterface, TechnicalSkillDataInterface } from "../models/data/ResumeModels";

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

export const ReplaceWorkExperiences = async (items: ExperienceItemDataInterface[]) => {
    try {
        if (!models) {
            models = await GetResumeModels();
        }

        await models.workExperienceModel.deleteMany({});
        const insertedWorkExperiences = await models.workExperienceModel.insertMany(items);

        const sanatizedWorkExpereinces = insertedWorkExperiences.map(x => x.toJSON());

        return sanatizedWorkExpereinces;
    } catch (error) {
        throw error;
    }
}

export const ReplaceEducationExperiences = async (items: ExperienceItemDataInterface[]) => {
    try {
        if (!models) {
            models = await GetResumeModels();
        }

        await models.educationExperienceModel.deleteMany({});
        const insertedEducationExperiences = await models.educationExperienceModel.insertMany(items);

        const sanatizedEducationExpereinces = insertedEducationExperiences.map(x => x.toJSON());

        return sanatizedEducationExpereinces;
    } catch (error) {
        throw error;
    }
}

export const ReplaceTechnicalSkills = async (items: TechnicalSkillDataInterface[]) => {
    try {
        if (!models) {
            models = await GetResumeModels();
        }

        await models.technicalSkillModel.deleteMany({});
        const insertedTechnicalSkills = await models.technicalSkillModel.insertMany(items);

        const sanatizedTechnicalSkills = insertedTechnicalSkills.map(x => x.toJSON());

        return sanatizedTechnicalSkills;
    } catch (error) {
        throw error;
    }
}

export const ReplaceResumeDocument = async (item: ResumeDocumentDataInterface) => {
    try {
        if (!models) {
            models = await GetResumeModels();
        }

        await models.resumeDocumentModel.deleteMany({});
        const insertedResumeDocument = await models.resumeDocumentModel.insertOne(item);

        const sanatizedResumeDocument = insertedResumeDocument.toJSON();

        return sanatizedResumeDocument;
    } catch (error) {
        throw error;
    }
}
