import { Types } from "mongoose";
import { describe, expect, it, vi } from "vitest";

import { ResumeRequest } from "../../models/data/ResumeModels";
import { ResumeData } from "../../repositories/ResumeRepository/ResumeRepository";
import { CreateResumeHandler } from "./ResumeHandler";

const createResumeData = (): ResumeData => {
    return {
        workExperiences: [
            {
                _id: new Types.ObjectId(),
                __v: 0,
                mainText: "Older Work",
                subText: "Company A",
                position: "Engineer",
                start: new Date("2021-01-01T00:00:00.000Z"),
                end: new Date("2021-12-31T00:00:00.000Z"),
                description: ["Did things"],
            },
            {
                _id: new Types.ObjectId(),
                __v: 0,
                mainText: "Newer Work",
                subText: "Company B",
                position: "Senior Engineer",
                start: new Date("2023-01-01T00:00:00.000Z"),
                end: new Date("2024-01-01T00:00:00.000Z"),
                description: ["Did more things"],
            },
        ],
        educationExperiences: [
            {
                _id: new Types.ObjectId(),
                __v: 0,
                mainText: "Older School",
                subText: "University A",
                start: new Date("2017-09-01T00:00:00.000Z"),
                end: new Date("2021-05-31T00:00:00.000Z"),
                description: ["Major A"],
            },
            {
                _id: new Types.ObjectId(),
                __v: 0,
                mainText: "Newer School",
                subText: "University B",
                start: new Date("2019-09-01T00:00:00.000Z"),
                end: new Date("2023-05-31T00:00:00.000Z"),
                description: ["Major B"],
            },
        ],
        technicalSkills: [
            {
                _id: new Types.ObjectId(),
                __v: 0,
                name: "TypeScript",
                icon: "typescript",
            },
        ],
        resumeDocument: {
            _id: new Types.ObjectId(),
            __v: 0,
            data: "resume-data",
        },
    };
};

describe("CreateResumeHandler", () => {
    it("HandleGetResume returns sanitized and sorted resume data", async () => {
        const dependencies = {
            GetResume: vi.fn().mockResolvedValue(createResumeData()),
            ReplaceResume: vi.fn(),
        };

        const handler = CreateResumeHandler(dependencies);

        const result = await handler.HandleGetResume();

        expect(dependencies.GetResume).toHaveBeenCalledTimes(1);

        expect(result.workExperiences[0].mainText).toBe("Newer Work");
        expect(result.workExperiences[1].mainText).toBe("Older Work");
        expect(result.educationExperiences[0].mainText).toBe("Newer School");
        expect(result.educationExperiences[1].mainText).toBe("Older School");

        expect(result.workExperiences[0]).not.toHaveProperty("_id");
        expect(result.workExperiences[0]).not.toHaveProperty("__v");
        expect(result.technicalSkills[0]).not.toHaveProperty("_id");
        expect(result.technicalSkills[0]).not.toHaveProperty("__v");
        
        expect(result.resumeDocument).toEqual({ data: "resume-data" });
    });

    it("HandlePutResume calls ReplaceResume and returns sanitized result", async () => {
        const request: ResumeRequest = {
            workExperiences: [
                {
                    mainText: "Work",
                    subText: "Company",
                    position: "Developer",
                    start: new Date("2024-01-01T00:00:00.000Z"),
                    end: new Date("2024-12-31T00:00:00.000Z"),
                    description: ["Built features"],
                },
            ],
            educationExperiences: [
                {
                    mainText: "School",
                    subText: "University",
                    start: new Date("2020-01-01T00:00:00.000Z"),
                    end: new Date("2023-01-01T00:00:00.000Z"),
                    description: ["Studied CS"],
                },
            ],
            technicalSkills: [
                {
                    name: "Node.js",
                    icon: "node",
                },
            ],
            resumeDocument: {
                data: "new-resume",
            },
        };

        const dependencies = {
            GetResume: vi.fn(),
            ReplaceResume: vi.fn().mockResolvedValue(createResumeData()),
        };

        const handler = CreateResumeHandler(dependencies);

        const result = await handler.HandlePutResume(request);

        expect(dependencies.ReplaceResume).toHaveBeenCalledWith(request);
        expect(result.resumeDocument).toEqual({ data: "resume-data" });
        expect(result.workExperiences[0]).not.toHaveProperty("_id");
        expect(result.workExperiences[0]).not.toHaveProperty("__v");
    });
});
