import { ResumeRequest } from "../../models/data/ResumeModels";
import {
    ResumeData,
    ResumeRepository,
} from "../../repositories/ResumeRepository";

type WithMongoMetadata = {
    _id?: unknown;
    __v?: number;
}

const omitMongoMetadata = <T extends WithMongoMetadata>(object: T): Omit<T, "_id" | "__v"> => {
    const { _id, __v, ...rest } = object;
    return rest;
};

const omitMongoMetadataFromArray = <T extends WithMongoMetadata>(itemArray: T[]): Omit<T, "_id" | "__v">[] =>
    itemArray.map(item => omitMongoMetadata(item));

const sanitizeResume = (result: ResumeData) => {
    const workExperiences = omitMongoMetadataFromArray(result.workExperiences);
    const educationExperiences = omitMongoMetadataFromArray(result.educationExperiences);
    const technicalSkills = omitMongoMetadataFromArray(result.technicalSkills);
    const resumeDocument = result.resumeDocument ? omitMongoMetadata(result.resumeDocument) : null;

    workExperiences.sort((a: { start: Date }, b: { start: Date }) => b.start.getTime() - a.start.getTime());
    educationExperiences.sort((a: { start: Date }, b: { start: Date }) => b.start.getTime() - a.start.getTime());

    return {
        workExperiences,
        educationExperiences,
        technicalSkills,
        resumeDocument,
    };
}

export type ResumeResponse = ReturnType<typeof sanitizeResume>;

type ResumeHandlerDependencies = Pick<ResumeRepository, "GetResume" | "ReplaceResume">;

export type ResumeHandler = {
    HandleGetResume: () => Promise<ResumeResponse>;
    HandlePutResume: (request: ResumeRequest) => Promise<ResumeResponse>;
}

export const CreateResumeHandler = (dependencies: ResumeHandlerDependencies): ResumeHandler => {
    const HandleGetResume = async () => {
        const result = await dependencies.GetResume();

        return sanitizeResume(result);
    }

    const HandlePutResume = async (request: ResumeRequest) => {
        const result = await dependencies.ReplaceResume(request);

        return sanitizeResume(result);
    }

    return {
        HandleGetResume,
        HandlePutResume,
    };
}