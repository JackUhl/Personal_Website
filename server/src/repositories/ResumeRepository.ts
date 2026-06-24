import { Connection, Model, Types } from "mongoose";
import { EducationExperiencesCollection, ResumeDocumentCollection, TechnicalSkillsCollection, WorkExperiencesCollection } from "../models/constants/MongoConstants";
import { ExperienceItemSchema, ResumeDocumentSchema, TechnicalSkillSchema } from "./schemas/ResumeSchemas";
import { ExperienceItemDataInterface, ResumeDocumentDataInterface, ResumeRequest, TechnicalSkillDataInterface } from "../models/data/ResumeModels";

type ResumeModels = {
    workExperienceModel: Model<ExperienceItemDataInterface>;
    educationExperienceModel: Model<ExperienceItemDataInterface>;
    technicalSkillModel: Model<TechnicalSkillDataInterface>;
    resumeDocumentModel: Model<ResumeDocumentDataInterface>;
};

export type ResumeExperienceItem = ExperienceItemDataInterface & {
    _id: Types.ObjectId;
    __v: number;
}

export type ResumeTechnicalSkill = TechnicalSkillDataInterface & {
    _id: Types.ObjectId;
    __v: number;
}

export type ResumeDocumentData = ResumeDocumentDataInterface & {
    _id: Types.ObjectId;
    __v: number;
}

export type ResumeData = {
    workExperiences: ResumeExperienceItem[];
    educationExperiences: ResumeExperienceItem[];
    technicalSkills: ResumeTechnicalSkill[];
    resumeDocument: ResumeDocumentData | null;
}

export type ResumeRepository = {
    GetResume: () => Promise<ResumeData>;
    ReplaceResume: (request: ResumeRequest) => Promise<ResumeData>;
};

export const CreateResumeRepository = (client: Connection): ResumeRepository => {
    const models: ResumeModels = {
        workExperienceModel: client.model("WorkExperiencesModel", ExperienceItemSchema, WorkExperiencesCollection),
        educationExperienceModel: client.model("EducationExperiencesModel", ExperienceItemSchema, EducationExperiencesCollection),
        technicalSkillModel: client.model("TechnicalSkillsModel", TechnicalSkillSchema, TechnicalSkillsCollection),
        resumeDocumentModel: client.model("ResumeDocumentModel", ResumeDocumentSchema, ResumeDocumentCollection),
    };

    const GetResume = async () => {
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
    }

    const ReplaceResume = async (request: ResumeRequest) => {
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
        const insertedResumeDocument = await models.resumeDocumentModel.create(request.resumeDocument);
        const sanitizedResumeDocument = insertedResumeDocument.toJSON();

        const result = {
            workExperiences: sanitizedWorkExpereinces,
            educationExperiences: sanitizedEducationExpereinces,
            technicalSkills: sanitizedTechnicalSkills,
            resumeDocument: sanitizedResumeDocument
        };

        return result;
    }

    return {
        GetResume,
        ReplaceResume,
    };
}
