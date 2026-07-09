import { Connection, Types } from "mongoose";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
    ExperienceItemDataInterface,
    ResumeDocumentDataInterface,
    ResumeRequest,
    TechnicalSkillDataInterface,
} from "../../models/data/ResumeModels";
import { CreateResumeRepository } from "./ResumeRepository";

const createExperience = (mainText: string): ExperienceItemDataInterface => ({
    mainText,
    subText: `${mainText} sub`,
    position: `${mainText} position`,
    start: new Date("2022-01-01T00:00:00.000Z"),
    end: new Date("2023-01-01T00:00:00.000Z"),
    description: [`${mainText} desc`],
});

const createTechnicalSkill = (name: string): TechnicalSkillDataInterface => ({
    name,
    icon: `${name.toLowerCase()}.svg`,
});

const createResumeDocument = (): ResumeDocumentDataInterface => ({
    data: "base64-pdf-data",
});

const createRequest = (): ResumeRequest => ({
    workExperiences: [createExperience("Work A"), createExperience("Work B")],
    educationExperiences: [createExperience("Education A")],
    technicalSkills: [createTechnicalSkill("TypeScript")],
    resumeDocument: createResumeDocument(),
});

const createStored = <T>(data: T) => ({
    ...data,
    _id: new Types.ObjectId(),
    __v: 0,
});

const createMongooseInsertDoc = <T>(value: T) => ({
    toJSON: vi.fn().mockReturnValue(value),
});

const createMockModel = () => ({
    find: vi.fn(),
    findOne: vi.fn(),
    deleteMany: vi.fn(),
    insertMany: vi.fn(),
    create: vi.fn(),
});

describe("CreateResumeRepository", () => {
    let workExperienceModel: ReturnType<typeof createMockModel>;
    let educationExperienceModel: ReturnType<typeof createMockModel>;
    let technicalSkillModel: ReturnType<typeof createMockModel>;
    let resumeDocumentModel: ReturnType<typeof createMockModel>;
    let connection: Connection;
    let modelSpy: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        vi.clearAllMocks();

        workExperienceModel = createMockModel();
        educationExperienceModel = createMockModel();
        technicalSkillModel = createMockModel();
        resumeDocumentModel = createMockModel();

        modelSpy = vi
            .fn()
            .mockReturnValueOnce(workExperienceModel)
            .mockReturnValueOnce(educationExperienceModel)
            .mockReturnValueOnce(technicalSkillModel)
            .mockReturnValueOnce(resumeDocumentModel);

        connection = {
            model: modelSpy,
        } as unknown as Connection;
    });

    it("registers all resume-related models with expected collection names", () => {
        CreateResumeRepository(connection);

        expect(modelSpy).toHaveBeenNthCalledWith(1, "WorkExperiencesModel", expect.anything(), "WorkExperiences");
        expect(modelSpy).toHaveBeenNthCalledWith(2, "EducationExperiencesModel", expect.anything(), "EducationExperiences");
        expect(modelSpy).toHaveBeenNthCalledWith(3, "TechnicalSkillsModel", expect.anything(), "TechnicalSkills");
        expect(modelSpy).toHaveBeenNthCalledWith(4, "ResumeDocumentModel", expect.anything(), "ResumeDocument");
    });

    it("GetResume returns all four collections", async () => {
        const workExperiences = [createStored(createExperience("Work A"))];
        const educationExperiences = [createStored(createExperience("Education A"))];
        const technicalSkills = [createStored(createTechnicalSkill("TypeScript"))];
        const resumeDocument = createStored(createResumeDocument());

        workExperienceModel.find.mockReturnValue({ lean: vi.fn().mockResolvedValue(workExperiences) });
        educationExperienceModel.find.mockReturnValue({ lean: vi.fn().mockResolvedValue(educationExperiences) });
        technicalSkillModel.find.mockReturnValue({ lean: vi.fn().mockResolvedValue(technicalSkills) });
        resumeDocumentModel.findOne.mockReturnValue({ lean: vi.fn().mockResolvedValue(resumeDocument) });

        const repository = CreateResumeRepository(connection);
        const result = await repository.GetResume();

        expect(workExperienceModel.find).toHaveBeenCalledTimes(1);
        expect(educationExperienceModel.find).toHaveBeenCalledTimes(1);
        expect(technicalSkillModel.find).toHaveBeenCalledTimes(1);
        expect(resumeDocumentModel.findOne).toHaveBeenCalledTimes(1);

        expect(result).toEqual({
            workExperiences,
            educationExperiences,
            technicalSkills,
            resumeDocument,
        });
    });

    it("GetResume returns null resumeDocument when none exists", async () => {
        workExperienceModel.find.mockReturnValue({ lean: vi.fn().mockResolvedValue([]) });
        educationExperienceModel.find.mockReturnValue({ lean: vi.fn().mockResolvedValue([]) });
        technicalSkillModel.find.mockReturnValue({ lean: vi.fn().mockResolvedValue([]) });
        resumeDocumentModel.findOne.mockReturnValue({ lean: vi.fn().mockResolvedValue(null) });

        const repository = CreateResumeRepository(connection);
        const result = await repository.GetResume();

        expect(result.resumeDocument).toBeNull();
    });

    it("ReplaceResume clears collections, inserts new data, and returns sanitized result", async () => {
        const request = createRequest();

        const insertedWork = request.workExperiences.map((x) =>
            createStored(x)
        );
        const insertedEducation = request.educationExperiences.map((x) =>
            createStored(x)
        );
        const insertedTechnicalSkills = request.technicalSkills.map((x) =>
            createStored(x)
        );
        const insertedResumeDocument = createStored(request.resumeDocument);

        workExperienceModel.deleteMany.mockResolvedValue({});
        workExperienceModel.insertMany.mockResolvedValue(
            insertedWork.map((x) => createMongooseInsertDoc(x))
        );

        educationExperienceModel.deleteMany.mockResolvedValue({});
        educationExperienceModel.insertMany.mockResolvedValue(
            insertedEducation.map((x) => createMongooseInsertDoc(x))
        );

        technicalSkillModel.deleteMany.mockResolvedValue({});
        technicalSkillModel.insertMany.mockResolvedValue(
            insertedTechnicalSkills.map((x) => createMongooseInsertDoc(x))
        );

        resumeDocumentModel.deleteMany.mockResolvedValue({});
        resumeDocumentModel.create.mockResolvedValue(
            createMongooseInsertDoc(insertedResumeDocument)
        );

        const repository = CreateResumeRepository(connection);
        const result = await repository.ReplaceResume(request);

        expect(workExperienceModel.deleteMany).toHaveBeenCalledWith({});
        expect(workExperienceModel.insertMany).toHaveBeenCalledWith(request.workExperiences);

        expect(educationExperienceModel.deleteMany).toHaveBeenCalledWith({});
        expect(educationExperienceModel.insertMany).toHaveBeenCalledWith(request.educationExperiences);

        expect(technicalSkillModel.deleteMany).toHaveBeenCalledWith({});
        expect(technicalSkillModel.insertMany).toHaveBeenCalledWith(request.technicalSkills);

        expect(resumeDocumentModel.deleteMany).toHaveBeenCalledWith({});
        expect(resumeDocumentModel.create).toHaveBeenCalledWith(request.resumeDocument);

        expect(result).toEqual({
            workExperiences: insertedWork,
            educationExperiences: insertedEducation,
            technicalSkills: insertedTechnicalSkills,
            resumeDocument: insertedResumeDocument,
        });
    });
});
